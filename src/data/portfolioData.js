export const portfolioData = {
  personal: {
    name: "Ihtisham Khattak",
    title: "Software Quality Engineer",
    tagline: "Fewer production escapes. Faster safe releases.",
    email: "ihtishamkhattak9504@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/ihtisham-khattak-6661641a5/",
      github: "https://github.com/Ihtisham-Khattak",
    },
  },
  hero: {
    eyebrow: "Software Quality Engineer",
    headline: "Fewer production escapes.\nFaster safe releases.",
    subheadline:
      "Cypress and Playwright automation, API and performance checks, and CI gates that cut regression risk without slowing delivery.",
  },
  about: {
    lead: "Quality is engineered into the release.",
    body: "I work the highest-risk paths: critical flows, APIs under load, and pipelines that need a trustworthy signal before production. Automation only ships if it is fast, maintainable, and believed.",
  },
  expertise: [
    {
      id: "01",
      title: "Test strategy",
      value: "Plans that map requirements to risk — what to test, why, and when to ship.",
      solves: "Decide what is worth testing before a suite or a sprint starts.",
      tools: ["Test plans", "Risk", "UAT"],
      methods: ["Risk mapping", "Coverage planning", "Acceptance criteria"],
      related: ["automation-testing-framework", "cypress-ecommerce-suite"],
    },
    {
      id: "02",
      title: "E2E automation",
      value: "Maintainable Cypress and Playwright suites. Regression in hours, not days.",
      solves: "Replace multi-day manual regression with suites the team actually runs.",
      tools: ["Cypress", "Playwright", "POM"],
      methods: ["Page Object Model", "Critical-path coverage", "CI execution"],
      related: ["automation-testing-framework", "cypress-ecommerce-suite"],
    },
    {
      id: "03",
      title: "API & performance",
      value: "Contracts first. Then k6 smoke, load, and thresholds that fail the build.",
      solves: "Catch contract breaks and latency before production traffic does.",
      tools: ["Postman", "k6", "REST"],
      methods: ["Contract checks", "Smoke / load / stress", "Pass-fail thresholds"],
      related: ["k6-api-testing"],
    },
    {
      id: "04",
      title: "CI quality gates",
      value: "The same bar on every commit. Releases wait on evidence.",
      solves: "Stop releases that fail the suite instead of hoping someone notices.",
      tools: ["GitHub Actions", "Jenkins", "Docker"],
      methods: ["Pipeline gates", "Same checks locally and in CI", "Release evidence"],
      related: ["automation-testing-framework", "k6-api-testing"],
    },
  ],
  tools: [
    "Cypress",
    "Playwright",
    "k6",
    "Postman",
    "GitHub Actions",
    "Jenkins",
    "Docker",
    "Jira",
    "REST",
  ],
  metrics: [
    { value: "60%", label: "Less manual regression time" },
    { value: "3+", label: "Years in SQA and delivery" },
    { value: "95%+", label: "Planned coverage on web apps" },
    { value: "15+", label: "Features / quarter in UAT" },
  ],
  experience: [
    {
      role: "Senior SQA Engineer",
      company: "Nextpak Agile Solutions",
      location: "Rawalpindi",
      duration: "Dec 2022 — Present",
      year: "2022",
      contribution:
        "Lead quality across client programs: Cypress automation, CI pipelines, API validation, mentoring.",
      tech: ["Cypress", "CI", "API"],
      highlights: [
        "Cut manual regression time by 60% with a Cypress E2E framework",
        "Wired automated suites into CI so releases wait on evidence",
        "Mentored junior QA on automation and Agile quality practice",
      ],
    },
    {
      role: "Project Manager",
      company: "Metodo Vicon",
      location: null,
      duration: "Dec 2020 — Jan 2022",
      year: "2020",
      contribution:
        "Owned feature delivery and UAT for 15+ platform enhancements per quarter.",
      tech: ["Jira", "UAT"],
      highlights: [
        "Led functional, regression, exploratory, and UAT for 15+ features / quarter",
        "Translated client needs into sprint backlogs and acceptance criteria",
        "Ran Jira as the system of record for delivery and release readiness",
      ],
    },
    {
      role: "Junior QA Engineer",
      company: "Xtreme Software Services",
      location: "Peshawar",
      duration: "Dec 2020 — Jun 2022",
      year: "2020",
      contribution:
        "Manual, API, and regression testing for enterprise releases.",
      tech: ["API", "Regression"],
      highlights: [
        "Caught critical defects in enterprise apps before production",
        "Validated APIs for data integrity and integrations",
        "Ran regression, smoke, and sanity on every release cycle",
      ],
    },
  ],
  projects: [
    {
      id: "automation-testing-framework",
      title: "Automation Testing Framework",
      category: "Automation",
      domain: "Release regression",
      role: "Senior SQA Engineer",
      impact: "3 days → 4 hours",
      description:
        "Modular Cypress E2E framework that replaced multi-day manual regression.",
      techStack: ["Cypress", "JavaScript", "GitHub Actions"],
      diagram: "framework",
      details: {
        problem: "Manual regression took 3 days per release.",
        approach: "Modular Cypress suite, page objects, and a CI job the release waits on.",
        outcome: "Runtime dropped to 4 hours. Coverage rose ~60%.",
      },
      link: "",
      private: true,
    },
    {
      id: "cypress-ecommerce-suite",
      title: "Cypress E-Commerce Suite",
      category: "Automation",
      domain: "Commerce",
      role: "Author",
      impact: "Cart & checkout covered",
      description:
        "POM-based Cypress suite for critical commerce flows, with Allure reporting.",
      techStack: ["Cypress", "POM", "Allure"],
      diagram: "commerce",
      details: {
        problem: "Manual e-commerce checks were inconsistent and slow.",
        approach: "Page objects around cart and checkout, with Allure for failure evidence.",
        outcome: "Reliable regression on cart and checkout, with visible failure reports.",
      },
      link: "https://github.com/Ihtisham-Khattak/cypress_commerce",
    },
    {
      id: "k6-api-testing",
      title: "k6 API Testing",
      category: "Performance",
      domain: "API load",
      role: "Author",
      impact: "Thresholds as gates",
      description:
        "Smoke, load, and stress suites that fail the build when latency or errors break.",
      techStack: ["k6", "JavaScript"],
      diagram: "k6",
      details: {
        problem: "APIs hid bottlenecks until production traffic arrived.",
        approach: "k6 profiles for smoke, load, and stress, with thresholds that fail CI.",
        outcome: "Load profiles with pass/fail thresholds, ready for CI reuse.",
      },
      link: "https://github.com/Ihtisham-Khattak/k6_testing",
    },
  ],
  testimonials: [
    {
      name: "Tahir Nazir",
      role: "Senior Fullstack Developer",
      feedback:
        "Ihtisham doesn't just find bugs; he helps us understand the root cause. His automation scripts saved us countless hours.",
    },
    {
      name: "Cristina",
      role: "Product Manager",
      feedback:
        "Reliable, thorough, and communicative. Ihtisham ensures that what we ship meets the highest quality standards.",
    },
  ],
};
