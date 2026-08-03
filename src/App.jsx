import { portfolioData } from "./data/portfolioData";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import WorkSamples from "./components/WorkSamples";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero
          data={portfolioData.hero}
          personal={portfolioData.personal}
          metrics={portfolioData.metrics}
        />
        <Services data={portfolioData.services} />
        <Skills data={portfolioData.skills} />
        <Experience data={portfolioData.experience} />
        <Projects data={portfolioData.projects} />
        <WorkSamples data={portfolioData.workSamples} />
        <Testimonials data={portfolioData.testimonials} />
        <Contact contactInfo={portfolioData.personal} />
      </main>
      <Footer personal={portfolioData.personal} />
    </div>
  );
}

export default App;
