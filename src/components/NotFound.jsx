import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import "./NotFound.css";

const NotFound = () => {
  const reducedMotion = usePrefersReducedMotion();
  const path =
    typeof window === "undefined" ? "/" : window.location.pathname || "/";

  useEffect(() => {
    document.title = "Page not found | Ihtisham Khattak";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, follow");
    return () => {
      document.title = "Ihtisham Khattak | Software Quality Engineer";
      robots?.remove();
    };
  }, []);

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found-layout">
        <div className="not-found-copy">
          <p className="not-found-kicker">
            <ScrambleText text="Assertion failed" />
          </p>
          <p className="not-found-code" aria-hidden="true">
            404
          </p>
          <h1 id="not-found-title">This path is not in the suite.</h1>
          <p className="not-found-body">
            No page matches this URL. Selected work, expertise, and contact live
            on the home path.
          </p>
          <div className="not-found-cta">
            <Magnetic href="/" className="btn btn-primary">
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              Home
            </Magnetic>
            <Magnetic href="/#work" className="btn btn-outline">
              View work
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Magnetic>
          </div>
        </div>

        <aside className="not-found-report" aria-label="Request details">
          <p className="not-found-report-head">
            <span className={reducedMotion ? "" : "is-live"} />
            Fail
          </p>
          <dl>
            <div>
              <dt>expected</dt>
              <dd>/</dd>
            </div>
            <div>
              <dt>received</dt>
              <dd title={path}>{path}</dd>
            </div>
            <div>
              <dt>status</dt>
              <dd>404</dd>
            </div>
            <div>
              <dt>result</dt>
              <dd>path does not exist</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
};

export default NotFound;
