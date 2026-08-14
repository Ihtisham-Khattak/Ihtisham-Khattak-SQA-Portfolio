import { portfolioData } from "./data/portfolioData";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Expertise from "./components/Expertise";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function isHomePath() {
  if (typeof window === "undefined") return true;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/" || path === "/index.html";
}

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const isNotFound = !isHomePath();

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <a href={isNotFound ? "/" : "#main-content"} className="skip-link">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isNotFound={isNotFound}
      />
      <main id="main-content">
        {isNotFound ? (
          <NotFound />
        ) : (
          <>
            <Hero
              data={portfolioData.hero}
              personal={portfolioData.personal}
              metrics={portfolioData.metrics}
            />
            <Projects data={portfolioData.projects} />
            <Expertise
              data={portfolioData.expertise}
              tools={portfolioData.tools}
              projects={portfolioData.projects}
            />
            <Experience data={portfolioData.experience} />
            <About
              data={portfolioData.about}
              quotes={portfolioData.testimonials}
            />
            <Contact contactInfo={portfolioData.personal} />
          </>
        )}
      </main>
      <Footer personal={portfolioData.personal} isNotFound={isNotFound} />
    </div>
  );
}

export default App;
