export const portfolioData = {
  personal: {
    name: "Ihtisham Khattak",
    title:
      "Experienced SQA Engineer | Manual & Automation Testing | Agile & Scrum Practitioner",
    tagline: "Ensuring Quality. Automating Confidence",
    summary:
      "A results-driven SQA Engineer with 3+ years of experience in manual and automated testing, building reliable systems through automation, CI/CD, and cloud-ready QA practices.",
    email: "ihtishamkhattak9504@gmail.com", // Placeholder
    social: {
      linkedin: "https://www.linkedin.com/in/ihtisham-khattak-6661641a5/",
      github: "https://github.com/Ihtisham-Khattak",
    },
  },
  hero: {
    headline: "Ensuring Quality. Automating Confidence. Scaling with Cloud.",
    subheadline:
      "A results-driven SQA Engineer with 3+ years of experience in manual and automated testing, building reliable systems through automation, CI/CD, and cloud-ready QA practices.",
  },
  about: {
    title: "About Me",
    narrative:
      "Results-driven QA Engineer with 3+ years of experience in manual and automation testing, specializing in Agile/Scrum methodologies. Proven track record of implementing comprehensive testing strategies, establishing CI/CD pipelines, and ensuring software quality across diverse projects. Expert in test automation using Cypress and proficient in API testing with strong focus on defect prevention and quality assurance. Collaborative team player skilled in driving continuous improvement and maintaining high-quality standards in fast-paced Agile development environments.",
  },
  experience: [
    {
      role: "Senior Software Quality Assurance Engineer",
      company: "Nextpak Agile Solutions, Rawalpindi, Pakistan", // Placeholder
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
      description:
        "A robust E2E testing framework built to ensure UI reliability and speed.",
      techStack: ["Cypress", "JavaScript", "Mocha", "GitHub Actions"],
      details: {
        problem:
          "Manual regression testing was taking 3 days per release cycle.",
        solution:
          "Designed and implemented a modular Cypress framework with custom commands and reporting.",
        outcome:
          "Reduced regression time to 4 hours and increased test coverage by 60%.",
      },
      link: "#",
    },
    {
      title: "Cypress: E-Commerce Test Automation Framework",
      category: "Automation",
      description:
        "Automated end-to-end testing framework for an e-commerce platform using Cypress with structured reporting and scalable test design.",
      techStack: [
        "Cypress",
        "JavaScript",
        "Page Object Model (POM)",
        "Allure Report",
      ],
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
      description:
        "Comprehensive API performance validation using k6 to ensure reliability and prevent potential exploits or loopholes.",
      techStack: [
        "K6",
        "JavaScript (ES6)",
        "Performance Testing(k6)",
        "Load Testing(k6)",
      ],
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
    qa: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "API Testing",
      "Exploratory Testing",
    ],
    automation: ["Cypress", "Postman", "JavaScript", "Playwright", "k6"],
    devops: ["CI/CD", "Jenkins", "GitHub Actions", "Docker", "Git"],
    methodologies: [
      "Agile",
      "Scrum",
      "Kanban",
      "Sprint Planning",
      "Test-Driven Development (TDD)",
    ],
    projectManagement: ["Jira", "Trello", "Linear", "Miro"],
  },
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
    // {
    //   name: "Mike Ross",
    //   role: "Engineering Lead",
    //   feedback:
    //     "His shift towards DevOps and Cloud has been invaluable. He understands the entire delivery pipeline, not just testing.",
    // },
  ],
};
