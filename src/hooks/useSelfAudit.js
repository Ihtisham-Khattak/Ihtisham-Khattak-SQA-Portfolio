import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chapterIds } from "../audit/chapters";
import { runChecks } from "../audit/checks";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Chapters are verified as they cross the "run line" (38% down the viewport).
// Scrolling past several at once, or jumping to an anchor, catches the earlier
// ones up so the report is never left half run. Reduced motion skips the sweep
// and shows every stamp in its final measured state.

const RUN_LINE = 0.38;
const RUN_MS = 700;
const STAGGER_MS = 90;

const blank = () =>
  Object.fromEntries(chapterIds.map((id) => [id, { status: "unverified", results: [] }]));

export function useSelfAudit(enabled) {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState(blank);
  const [perf, setPerf] = useState({ lcp: null, cls: null });
  const [errors, setErrors] = useState(0);
  const started = useRef(new Set());
  const timers = useRef(new Set());
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Chapters are checked one at a time, so a catch-up never piles work onto one frame.
  const chain = useRef(Promise.resolve());
  const finish = useCallback((id) => {
    chain.current = chain.current.then(async () => {
      const results = await runChecks(id);
      const failed = results.some((r) => !r.pass);
      setState((prev) => ({ ...prev, [id]: { status: failed ? "failed" : "passed", results } }));
    });
  }, []);

  const start = useCallback(
    (id, delay = 0) => {
      if (started.current.has(id)) return;
      started.current.add(id);
      const t1 = window.setTimeout(() => {
        timers.current.delete(t1);
        setState((prev) => ({ ...prev, [id]: { ...prev[id], status: "running" } }));
        const t2 = window.setTimeout(() => {
          timers.current.delete(t2);
          finish(id);
        }, RUN_MS);
        timers.current.add(t2);
      }, delay);
      timers.current.add(t1);
    },
    [finish]
  );

  useEffect(() => {
    if (!enabled) return undefined;
    const timerSet = timers.current;
    const startedSet = started.current;
    let cancelled = false;
    let io;
    let io2;

    const arm = () => {
      if (cancelled) return;
      if (reduced) {
        chapterIds.forEach((id) => {
          startedSet.add(id);
          finish(id);
        });
        return;
      }
      const heads = chapterIds
        .map((id) => document.querySelector(`[data-chapter-head="${id}"]`))
        .filter(Boolean);
      const sections = chapterIds.map((id) => document.getElementById(id)).filter(Boolean);

      // A chapter has "crossed" when its header is at or above the run line.
      const sweep = () => {
        let deepest = -1;
        chapterIds.forEach((id, i) => {
          const head = document.querySelector(`[data-chapter-head="${id}"]`);
          if (!head) return;
          if (head.getBoundingClientRect().top > window.innerHeight * RUN_LINE) return;
          // Reaching the Result seals the report: every chapter is run first.
          deepest = Math.max(deepest, id === "result" ? chapterIds.length - 1 : i);
        });
        if (deepest < 0) return;
        let queued = 0;
        for (let i = 0; i <= deepest; i += 1) {
          if (!started.current.has(chapterIds[i])) {
            start(chapterIds[i], queued * STAGGER_MS);
            queued += 1;
          }
        }
      };

      // Fires exactly when a chapter header enters the band above the run line...
      io = new IntersectionObserver(sweep, {
        rootMargin: `0px 0px -${Math.round((1 - RUN_LINE) * 100)}% 0px`,
        threshold: [0, 1],
      });
      heads.forEach((h) => io.observe(h));
      // ...and this one catches jumps (anchors, scrollbar drags) that skip a header entirely.
      io2 = new IntersectionObserver(sweep, { threshold: [0] });
      sections.forEach((sec) => io2.observe(sec));
      sweep();
    };

    // Measure only once web fonts have settled, so layout-dependent checks are honest.
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => requestAnimationFrame(() => requestAnimationFrame(arm)));

    return () => {
      cancelled = true;
      io?.disconnect();
      io2?.disconnect();
      timerSet.forEach((t) => window.clearTimeout(t));
      timerSet.clear();
      // anything cut off mid-run is allowed to start again
      chapterIds.forEach((id) => {
        const s = stateRef.current[id]?.status;
        if (s === "unverified" || s === "running") startedSet.delete(id);
      });
    };
  }, [enabled, reduced, start, finish]);

  // Real performance measurements, when the browser reports them.
  useEffect(() => {
    if (!enabled || typeof PerformanceObserver === "undefined") return undefined;
    const observers = [];
    const watch = (type, onEntries) => {
      try {
        const po = new PerformanceObserver((list) => onEntries(list.getEntries()));
        po.observe({ type, buffered: true });
        observers.push(po);
      } catch {
        /* entry type not supported in this browser: leave the value null */
      }
    };
    let cls = 0;
    // LCP is defined as final at the first user input; later paints must not move it.
    let lcpFrozen = false;
    const freeze = () => {
      lcpFrozen = true;
    };
    // Chrome also ends LCP at the first scroll, so a scrollbar drag counts too.
    const inputs = ["keydown", "pointerdown", "wheel", "touchstart", "scroll"];
    inputs.forEach((t) => window.addEventListener(t, freeze, { once: true, passive: true }));
    watch("largest-contentful-paint", (entries) => {
      if (lcpFrozen) return;
      const last = entries[entries.length - 1];
      if (last) setPerf((p) => ({ ...p, lcp: last.startTime }));
    });
    watch("layout-shift", (entries) => {
      entries.forEach((e) => {
        if (!e.hadRecentInput) cls += e.value;
      });
      setPerf((p) => ({ ...p, cls }));
    });
    return () => {
      observers.forEach((o) => o.disconnect());
      inputs.forEach((t) => window.removeEventListener(t, freeze));
    };
  }, [enabled]);

  // Uncaught errors since the page loaded.
  useEffect(() => {
    if (!enabled) return undefined;
    const bump = () => setErrors((n) => n + 1);
    window.addEventListener("error", bump);
    window.addEventListener("unhandledrejection", bump);
    return () => {
      window.removeEventListener("error", bump);
      window.removeEventListener("unhandledrejection", bump);
    };
  }, [enabled]);

  const summary = useMemo(() => {
    let total = 0;
    let passed = 0;
    let failed = 0;
    let done = 0;
    chapterIds.forEach((id) => {
      const s = state[id];
      if (s.status === "passed" || s.status === "failed") done += 1;
      s.results.forEach((r) => {
        total += 1;
        if (r.pass) passed += 1;
        else failed += 1;
      });
    });
    return {
      total,
      passed,
      failed,
      chapters: chapterIds.length,
      done,
      complete: done === chapterIds.length,
    };
  }, [state]);

  return { state, summary, perf, errors };
}
