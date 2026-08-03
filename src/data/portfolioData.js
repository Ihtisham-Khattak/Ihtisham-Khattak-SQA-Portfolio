export const portfolioData = {
  personal: {
    tagline: "Fewer production escapes. Faster safe releases.",
    summary:
      "SQA engineer with 3+ years across manual testing, Cypress automation, API validation, and CI/CD — plus hands-on project management experience delivering features with Agile teams and stakeholders.",
    email: "ihtishamkhattak9504@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/ihtisham-khattak-6661641a5/",
      github: "https://github.com/Ihtisham-Khattak",
    },
  },
  hero: {
    subheadline:
      "I build the quality layer teams need to ship with confidence — Cypress automation, API and performance checks, CI quality gates, and clear test strategy that cuts regression risk without slowing delivery.",
    highlights: [
      "Cypress Automation",
      "API & Regression Testing",
      "CI/CD Pipelines",
      "Agile / Scrum",
      "Project Delivery",
    ],
  },
  metrics: [
    {
      value: "60%",
      label: "Less manual regression time with Cypress",
    },
    {
      value: "3+",
      label: "Years in SQA and delivery",
    },
    {
      value: "95%+",
      label: "Planned coverage on web apps",
    },
    {
      value: "15+",
      label: "Features/quarter UAT ownership",
    },
  ],
  services: [
    {
      title: "Test strategy & documentation",
      description:
        "Design test plans, cases, and strategies that map requirements to risk — so teams know what to test, why, and when to release.",
    },
    {
      title: "Cypress / E2E automation",
      description:
        "Build maintainable UI automation with Page Object Model, custom commands, and reporting so regression runs are fast and trustworthy.",
    },
    {
      title: "API & performance testing",
      description:
        "Validate APIs with Postman and stress critical paths with k6 — smoke, load, and thresholds that catch bottlenecks before users do.",
    },
    {
      title: "Agile delivery & quality gates",
      description:
        "Embed QA in sprints and CI/CD with Jira workflows, GitHub Actions, and release readiness checks that keep quality in the pipeline.",
    },
  ],
  experience: [
    {
      role: "Senior Software Quality Assurance Engineer",
      company: "Nextpak Agile Solutions, Rawalpindi, Pakistan",
      duration: "December 2022 - Present",
      responsibilities: [
        "Lead quality assurance efforts across multiple client projects, reducing production bugs by implementing comprehensive test strategies and automation frameworks",
        "Architect and maintain CI/CD pipelines for automated testing, achieving faster deployment cycles and improved code quality",
        "Design and execute detailed test plans, test cases, and test scripts for web applications, ensuring 95%+ test coverage",
        "Implement Cypress automation framework for end-to-end testing, reducing manual testing time by 60% and improving regression test efficiency",
        "Collaborate closely with cross-functional Agile teams in sprint planning, daily standups, and retrospectives to ensure quality is built into every development phase",
        "Manage project workflows using Jira, Trello, and Linear improving team coordination and delivery timelines",
        "Mentor junior QA engineers on testing best practices, automation techniques, and Agile methodologies",
        "Conduct thorough API testing and integration testing to validate system behavior and data integrity",
        "Maintain comprehensive documentation including test strategies, and bug reports, for stakeholder visibility",
      ],
    },
    {
      role: "Project Manager",
      company: "Metodo Vicon",
      duration: "December 2020 – January 2022",
      responsibilities: [
        "Owned end-to-end delivery for product features, aligning scope, timelines, and acceptance criteria with stakeholders",
        "Led functional, regression, exploratory, and UAT testing for 15+ platform features and enhancements per quarter",
        "Gathered and refined requirements with clients, translating business needs into actionable sprint backlogs",
        "Facilitated sprint planning, standups, reviews, and retrospectives to keep teams focused and delivery predictable",
        "Coordinated developers, designers, and QA to remove blockers and ship high-quality releases on schedule",
        "Managed Jira workflows including user stories, bugs, tasks, and sprint tracking for 25+ cards per sprint",
        "Tracked risks, dependencies, and release readiness; communicated status and trade-offs to clients and leadership",
        "Drove continuous improvement by documenting processes, clarifying DoD, and reducing rework across releases",
      ],
    },
    {
      role: "Junior QA Engineer",
      company: "Xtreme Software Services Pvt Ltd, Peshawar, Pakistan",
      duration: "December 2020 – June 2022",
      responsibilities: [
        "Executed comprehensive manual testing for enterprise applications, identifying critical defects before production release",
        "Performed thorough API testing to validate backend functionality, data integrity, and system integrations",
        "Participated actively in Agile ceremonies, contributing to sprint planning, daily standups, and retrospectives",
        "Created detailed test documentation including test plans, test cases, and defect reports for cross-team collaboration",
        "Collaborated with developers to reproduce, debug, and resolve complex software issues",
        "Performed regression, smoke, and sanity testing for each release cycle, ensuring stable deployments",
      ],
    },
  ],
  projects: [
    {
      title: "Automation Testing Framework",
      category: "Automation",
      role: "Framework author",
      description:
        "Modular Cypress E2E framework built to replace multi-day manual regression with CI-ready automated suites.",
      techStack: ["Cypress", "JavaScript", "Mocha", "GitHub Actions"],
      impact: "3 days → 4 hours regression",
      highlights: [
        "Custom commands and modular specs",
        "CI-ready GitHub Actions wiring",
        "Coverage lift of ~60%",
      ],
      lookFor: "Modular suite structure, custom commands, and CI-oriented reporting.",
      details: {
        problem:
          "Manual regression testing was taking 3 days per release cycle.",
        solution:
          "Designed and implemented a modular Cypress framework with custom commands and reporting.",
        outcome:
          "Reduced regression time to 4 hours and increased test coverage by 60%.",
      },
      link: "",
      private: true,
    },
    {
      title: "Cypress: E-Commerce Test Automation Framework",
      category: "Automation",
      role: "Automation engineer",
      description:
        "End-to-end Cypress suite for critical e-commerce flows with Page Object Model and Allure reporting.",
      techStack: [
        "Cypress",
        "JavaScript",
        "Page Object Model (POM)",
        "Allure Report",
      ],
      impact: "Reliable e-commerce regression",
      highlights: [
        "POM for maintainable selectors",
        "Allure for execution visibility",
        "Critical path coverage (cart, checkout)",
      ],
      lookFor: "Page Object Model layout, Allure reporting, and readable flow specs.",
      details: {
        problem:
          "Manual testing of critical e-commerce workflows caused regression risks and inconsistent validation.",
        solution:
          "Built a Cypress automation framework using the Page Object Model (POM) to cover end-to-end user flows, integrated with Allure for detailed test reporting and execution insights.",
        outcome:
          "Improved regression reliability, reduced manual effort, and provided clear test visibility through structured reporting.",
      },
      link: "https://github.com/Ihtisham-Khattak/cypress_commerce",
    },
    {
      title: "K6 API Testing",
      category: "API Testing",
      role: "Performance tester",
      description:
        "k6 smoke, load, and stress suites that expose API bottlenecks and weak failure modes under traffic.",
      techStack: ["K6", "JavaScript (ES6)", "Load Testing", "Smoke Testing"],
      impact: "Stable APIs under load",
      highlights: [
        "Smoke / load / stress scenarios",
        "Threshold-based pass/fail gates",
        "ES6 scripts ready for CI reuse",
      ],
      lookFor: "Scenario scripts, thresholds as quality gates, and clear load profiles.",
      details: {
        problem:
          "APIs were vulnerable to performance bottlenecks and potential security loopholes under varying load conditions.",
        solution:
          "Implemented k6-based performance, load, and smoke testing to simulate real-world traffic and identify weaknesses.",
        outcome:
          "Improved API stability, reduced risk of exploitation, and ensured consistent performance under stress.",
      },
      link: "https://github.com/Ihtisham-Khattak/k6_testing",
    },
  ],
  skills: {
    automation: ["Cypress", "Playwright", "JavaScript", "Page Object Model"],
    apiPerformance: ["Postman", "k6", "API Testing", "Load Testing"],
    cicdDevops: ["CI/CD", "GitHub Actions", "Jenkins", "Docker", "Git"],
    qualityPractice: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Exploratory Testing",
      "TDD",
    ],
    collaboration: [
      "Agile",
      "Scrum",
      "Kanban",
      "Jira",
      "Trello",
      "Linear",
      "Miro",
    ],
  },
  workSamples: [
    {
      title: "Cypress e-commerce automation repo",
      type: "GitHub",
      description:
        "Public Cypress framework with POM and Allure — review structure, specs, and reporting setup.",
      link: "https://github.com/Ihtisham-Khattak/cypress_commerce",
    },
    {
      title: "k6 API performance suite",
      type: "GitHub",
      description:
        "Smoke, load, and stress scripts for API reliability under traffic.",
      link: "https://github.com/Ihtisham-Khattak/k6_testing",
    },
    {
      title: "GitHub profile & automation work",
      type: "GitHub",
      description:
        "Additional repositories and ongoing automation experiments.",
      link: "https://github.com/Ihtisham-Khattak",
    },
    {
      title: "Test plan / bug report samples",
      type: "Document",
      description:
        "Sanitized test-plan and bug-report samples — add PDFs or Markdown under public/samples/ when ready.",
      link: "",
      comingSoon: true,
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
