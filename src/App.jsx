import { useEffect, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import { useTheme } from "./hooks/useTheme";
import AuditProvider from "./audit/AuditProvider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import AITesting from "./components/AITesting";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Credentials from "./components/Credentials";
import Result from "./components/Result";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function isHomePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index.html";
}

function App() {
  const { theme, setTheme, isDark } = useTheme();
  const [isNotFound, setIsNotFound] = useState(
    () => typeof window !== "undefined" && !isHomePath()
  );

  useEffect(() => {
    const sync = () => setIsNotFound(!isHomePath());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const {
    personal,
    hero,
    stats,
    about,
    skills,
    experience,
    projects,
    aiTesting,
    process,
    testimonials,
    credentials,
    initiative,
  } = portfolioData;

  return (
    <AuditProvider enabled={!isNotFound}>
      <div className={`app ${isDark ? "dark" : ""} ${isNotFound ? "is-not-found" : ""}`}>
        <a href={isNotFound ? "#not-found-title" : "#main-content"} className="skip-link">
          Skip to content
        </a>
        <Navbar isNotFound={isNotFound} />
        <main id="main-content">
          {isNotFound ? (
            <NotFound />
          ) : (
            <>
              <Hero data={hero} personal={personal} portraitAlt={about.portraitAlt} />
              <Stats data={stats} />
              <About data={about} />
              <Skills data={skills} experience={experience} />
              <Experience data={experience} />
              <Projects data={projects} />
              <AITesting data={aiTesting} />
              <Process data={process} />
              <Testimonials data={testimonials} />
              <Credentials data={credentials} initiative={initiative} />
              <Result personal={personal} />
              <Contact contactInfo={personal} />
            </>
          )}
        </main>
        <Footer personal={personal} theme={theme} onSetTheme={setTheme} isNotFound={isNotFound} />
      </div>
    </AuditProvider>
  );
}

export default App;
