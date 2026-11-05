// Real checks, run in the visitor's browser against the live DOM of one
// chapter. Every result is measured, never assumed. A check that does not
// apply to a chapter (no images, no links) is simply not listed.

const TEXT_SELECTOR =
  "h1,h2,h3,p,li,dt,dd,a,button,span,figcaption,small,blockquote,cite,label,td,th";

function parseColor(value) {
  if (!value) return null;
  let m = value.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  }
  m = value.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/);
  if (m) {
    return {
      r: Number(m[1]) * 255,
      g: Number(m[2]) * 255,
      b: Number(m[3]) * 255,
      a: m[4] === undefined ? 1 : Number(m[4]),
    };
  }
  return null;
}

const over = (top, bottom) => {
  const a = top.a + bottom.a * (1 - top.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const mix = (t, b) => (t * top.a + b * bottom.a * (1 - top.a)) / a;
  return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a };
};

function luminance({ r, g, b }) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// Effective opaque background behind an element, or null when it is an image
// or gradient (contrast cannot be measured honestly there, so we skip it).
// Each node's style is read once per run: results are cached in `cache`.
function backgroundOf(el, cache) {
  if (!el || el.nodeType !== 1) return { r: 255, g: 255, b: 255, a: 1 };
  if (cache.has(el)) return cache.get(el);
  const cs = getComputedStyle(el);
  let result;
  if (cs.backgroundImage && cs.backgroundImage !== "none") {
    result = null;
  } else {
    const own = parseColor(cs.backgroundColor);
    if (own && own.a >= 0.999) {
      result = own;
    } else {
      const below = backgroundOf(el.parentElement, cache);
      result = below === null ? null : own && own.a > 0 ? over(own, below) : below;
    }
  }
  cache.set(el, result);
  return result;
}

// Let the browser paint and handle input between slices of work.
const yieldToMain = () =>
  new Promise((resolve) => {
    if (typeof window.scheduler?.yield === "function") window.scheduler.yield().then(resolve);
    else setTimeout(resolve, 0);
  });

const isHidden = (el) =>
  el.closest('[aria-hidden="true"], [hidden]') ||
  el.classList.contains("sr-only") ||
  el.closest(".sr-only");

const visible = (el) => {
  const r = el.getBoundingClientRect();
  return r.width > 1 && r.height > 1;
};

const ownText = (el) =>
  [...el.childNodes]
    .filter((n) => n.nodeType === 3)
    .map((n) => n.textContent.trim())
    .join("");

async function checkContrast(root) {
  const nodes = [...root.querySelectorAll(TEXT_SELECTOR)]
    .filter((el) => ownText(el) && !isHidden(el))
    .slice(0, 160);
  const cache = new Map();
  let worst = Infinity;
  let measured = 0;
  const failing = [];
  const SLICE = 25;
  for (let i = 0; i < nodes.length; i += SLICE) {
    nodes.slice(i, i + SLICE).forEach((el) => {
      if (!visible(el)) return;
      const cs = getComputedStyle(el);
      const bg = backgroundOf(el, cache);
      const fgRaw = parseColor(cs.color);
      if (!bg || !fgRaw) return;
      const fg = fgRaw.a < 1 ? over(fgRaw, bg) : fgRaw;
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const need = large ? 3 : 4.5;
      const r = ratio(fg, bg);
      measured += 1;
      if (r < worst) worst = r;
      if (r < need) failing.push(`"${ownText(el).slice(0, 24)}" ${r.toFixed(2)}:1`);
    });
    await yieldToMain();
  }
  if (!measured) return null;
  return {
    id: "contrast",
    label: "Text contrast (WCAG AA)",
    pass: failing.length === 0,
    detail: failing.length
      ? `${failing.length} below AA: ${failing.slice(0, 2).join(", ")}`
      : `${measured} text runs, lowest ${worst.toFixed(1)}:1`,
  };
}

function checkTargets(root) {
  const els = [...root.querySelectorAll("button, a[href]")].filter((el) => {
    if (isHidden(el) || !visible(el)) return false;
    // inline links inside running text are exempt (WCAG 2.5.8)
    return !(el.tagName === "A" && el.closest("p, li") && el.parentElement.matches("p, li") && ownText(el.parentElement));
  });
  if (!els.length) return null;
  let min = Infinity;
  let minLabel = "";
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    const s = Math.min(r.width, r.height);
    if (s < min) {
      min = s;
      minLabel = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 20);
    }
  });
  return {
    id: "targets",
    label: "Tap targets at least 24px (WCAG 2.2)",
    pass: min >= 24,
    detail: `${els.length} controls, smallest ${Math.round(min)}px${minLabel ? ` ("${minLabel}")` : ""}`,
  };
}

function checkImages(root) {
  const imgs = [...root.querySelectorAll("img")];
  // Decorative icons are marked aria-hidden and need no alternative text.
  const svgs = [...root.querySelectorAll('svg[role="img"]')].filter(
    (s) => !s.closest('[aria-hidden="true"]') && s.getAttribute("aria-hidden") !== "true"
  );
  if (!imgs.length && !svgs.length) return null;
  const bad = [
    ...imgs.filter((i) => i.getAttribute("alt") === null),
    ...svgs.filter((s) => !s.getAttribute("aria-label") && !s.querySelector("title")),
  ];
  return {
    id: "images",
    label: "Images have text alternatives",
    pass: bad.length === 0,
    detail: bad.length ? `${bad.length} missing` : `${imgs.length + svgs.length} checked`,
  };
}

function checkLinks(root) {
  const links = [...root.querySelectorAll("a[href]")].filter((a) => !a.closest('[aria-hidden="true"]'));
  if (!links.length) return null;
  const unnamed = links.filter(
    (a) => !(a.getAttribute("aria-label") || a.textContent.trim() || a.querySelector("img[alt]"))
  );
  const unsafe = links.filter(
    (a) => a.target === "_blank" && !/noopener/.test(a.rel)
  );
  const bad = unnamed.length + unsafe.length;
  return {
    id: "links",
    label: "Links are named and safe",
    pass: bad === 0,
    detail: bad
      ? `${unnamed.length} unnamed, ${unsafe.length} without rel=noopener`
      : `${links.length} links, all named`,
  };
}

function checkHeading(root) {
  const labelledBy = root.getAttribute("aria-labelledby");
  const target = labelledBy ? document.getElementById(labelledBy) : null;
  const heads = [...root.querySelectorAll("h1,h2,h3,h4")];
  const levels = heads.map((h) => Number(h.tagName[1]));
  let skip = false;
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) skip = true;
  }
  const named = Boolean(target) || Boolean(root.getAttribute("aria-label"));
  const ok = named && !skip && (!labelledBy || (target && root.contains(target)));
  return {
    id: "heading",
    label: "Landmark is named, headings do not skip levels",
    pass: ok,
    detail: ok ? `${heads.length} heading${heads.length === 1 ? "" : "s"}` : skip ? "heading level skipped" : "section not labelled",
  };
}

function checkOverflow(root) {
  const over = root.scrollWidth - root.clientWidth;
  return {
    id: "overflow",
    label: "No horizontal overflow",
    pass: over <= 1,
    detail: over <= 1 ? `${Math.round(root.clientWidth)}px wide` : `${over}px too wide`,
  };
}

function checkDocument() {
  const lang = document.documentElement.getAttribute("lang");
  const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute("content") || "";
  const zoomLocked = /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?(?![\d])/.test(viewport);
  const h1s = document.querySelectorAll("h1").length;
  return [
    { id: "lang", label: "Document language is set", pass: Boolean(lang), detail: lang || "missing" },
    { id: "title", label: "Page has a title", pass: document.title.trim().length > 0, detail: document.title.trim().slice(0, 40) },
    { id: "zoom", label: "Pinch zoom is not disabled", pass: !zoomLocked, detail: zoomLocked ? "zoom locked" : "zoom allowed" },
    { id: "h1", label: "Exactly one h1", pass: h1s === 1, detail: `${h1s} found` },
    { id: "main", label: "Main landmark and skip link exist", pass: Boolean(document.querySelector("main")) && Boolean(document.querySelector(".skip-link")), detail: "main, skip link" },
  ];
}

export async function runChecks(id) {
  const root = document.getElementById(id);
  if (!root) return [];
  const steps = [
    () => checkHeading(root),
    () => checkImages(root),
    () => checkLinks(root),
    () => checkContrast(root),
    () => checkTargets(root),
    () => checkOverflow(root),
  ];
  const list = [];
  for (const step of steps) {
    const result = await step();
    if (result) list.push(result);
    await yieldToMain();
  }
  if (id === "top") list.push(...checkDocument());
  return list;
}
