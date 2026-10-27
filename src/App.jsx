import { useEffect, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import AITesting from "./components/AITesting";
import Process from "./components/Process";
import Credentials from "./components/Credentials";
import Initiative from "./components/Initiative";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function isHomePath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index.html";
}

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isNotFound, setIsNotFound] = useState(
    () => typeof window !== "undefined" && !isHomePath()
  );

  useEffect(() => {
    const sync = () => setIsNotFound(!isHomePath());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const { personal, hero, stats, about, skills, experience, aiTesting, process, credentials, initiative } =
    portfolioData;

  return (
    <div className={`app ${isDark ? "dark" : ""} ${isNotFound ? "is-not-found" : ""}`}>
      <a href={isNotFound ? "#not-found-title" : "#main-content"} className="skip-link">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} isNotFound={isNotFound} />
      <main id="main-content">
        {isNotFound ? (
          <NotFound />
        ) : (
          <>
            <Hero data={hero} personal={personal} />
            <Stats data={stats} />
            <About data={about} />
            <Skills data={skills} />
            <Experience data={experience} />
            <AITesting data={aiTesting} />
            <Process data={process} />
            <Credentials data={credentials} />
            <Initiative data={initiative} />
            <Contact contactInfo={personal} />
          </>
        )}
      </main>
      <Footer personal={personal} isNotFound={isNotFound} />
    </div>
  );
}

export default App;
