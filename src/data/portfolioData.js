// Single source of truth for all site content.
// Skill `icon` values are keys into src/components/skillIcons.jsx.

export const portfolioData = {
  personal: {
    name: "Ihtisham Khattak",
    title: "Senior QA Engineer",
    location: "Islamabad, Pakistan",
    phone: "+92-331-9038578",
    email: "ihtishamkhattak9504@gmail.com",
    social: {
      linkedin: "https://www.linkedin.com/in/ihtisham-khattak-6661641a5/",
      github: "https://github.com/Ihtisham-Khattak",
    },
  },

  hero: {
    status: "Available for opportunities",
    name: "Ihtisham Khattak",
    subheadline: [
      "Senior QA Engineer crafting ",
      { strong: "reliable software" },
      " through test automation, API testing, and ",
      { strong: "AI/LLM quality assurance" },
      ".",
    ],
    experience: "3+ years experience",
  },

  stats: [
    { value: "3+", label: "Years in QA" },
    { value: "95%+", label: "Test coverage achieved" },
    { value: "60%", label: "Less manual testing effort" },
    { value: "2", label: "Companies · multiple client projects" },
  ],

  about: {
    title: "I find the bugs before your users do.",
    body:
      "Results-driven QA Engineer with 3+ years of experience in manual and automation testing across Agile/Scrum teams. I design comprehensive test strategies, build automation that scales, and catch defects early — so teams can ship with confidence. Lately, I've been focused on AI chatbot and LLM testing: hallucination detection, context-retention validation, prompt engineering, and AI-assisted test generation.",
    values: [
      {
        icon: "target",
        title: "Test Strategy",
        text: "Plans that map risk to coverage before a line of test code is written.",
      },
      {
        icon: "workflow",
        title: "Automation First",
        text: "Suites that run on every commit and that the team actually trusts.",
      },
      {
        icon: "brain",
        title: "AI Quality",
        text: "Validating chatbots and LLMs for grounding, memory and edge cases.",
      },
    ],
  },

  skills: {
    title: "Toolkit & expertise",
    groups: [
      {
        id: "testing-ai",
        title: "Testing & AI",
        size: "wide",
        items: [
          { label: "Manual Testing", icon: "manual" },
          { label: "Automation Testing", icon: "automation" },
          { label: "AI Chatbot Testing", icon: "chatbot" },
          { label: "LLM Testing", icon: "llm" },
          { label: "Hallucination Testing", icon: "hallucination" },
          { label: "Context Retention Testing", icon: "context" },
          { label: "Prompt Engineering", icon: "prompt" },
          { label: "AI-Assisted Test Generation", icon: "aigen" },
          { label: "Regression Testing", icon: "regression" },
          { label: "Integration Testing", icon: "integration" },
          { label: "Exploratory Testing", icon: "exploratory" },
          { label: "Performance Testing", icon: "performance" },
        ],
      },
      {
        id: "automation-api",
        title: "Test Automation & API",
        items: [
          { label: "Playwright", icon: "playwright" },
          { label: "Cypress", icon: "cypress" },
          { label: "Postman", icon: "postman" },
          { label: "API Automation", icon: "api" },
        ],
      },
      {
        id: "ai-dev",
        title: "AI-Assisted Development",
        items: [
          { label: "ChatGPT", icon: "chatgpt" },
          { label: "Claude", icon: "claude" },
          { label: "Cursor", icon: "cursor" },
        ],
      },
      {
        id: "cicd",
        title: "CI/CD & DevOps",
        items: [
          { label: "Git", icon: "git" },
          { label: "GitHub", icon: "github" },
          { label: "GitHub Actions", icon: "githubactions" },
          { label: "Docker", icon: "docker" },
        ],
      },
      {
        id: "project-management",
        title: "Project Management",
        items: [
          { label: "Jira", icon: "jira" },
          { label: "Trello", icon: "trello" },
          { label: "Linear", icon: "linear" },
          { label: "Miro", icon: "miro" },
        ],
      },
      {
        id: "methodologies",
        title: "Methodologies",
        size: "full",
        items: [
          { label: "Agile", icon: "agile" },
          { label: "Scrum", icon: "scrum" },
          { label: "Kanban", icon: "kanban" },
          { label: "Sprint Planning", icon: "sprint" },
          { label: "TDD", icon: "tdd" },
        ],
      },
    ],
    // Tool logos shown in the marquee above the grid
    marquee: [
      "playwright",
      "cypress",
      "postman",
      "git",
      "github",
      "githubactions",
      "docker",
      "jira",
      "trello",
      "linear",
      "miro",
      "chatgpt",
      "claude",
      "cursor",
    ],
  },

  experience: [
    {
      role: "Senior Software Quality Assurance Engineer",
      company: "Nextpak Agile Solutions",
      location: "Rawalpindi",
      duration: "Dec 2022 – Present",
      current: true,
      highlights: [
        "Led QA activities across multiple client projects by implementing structured test strategies and automation frameworks to improve product quality and reduce production defects.",
        "Designed and executed test plans, test cases, and automation scripts for web applications, achieving 95%+ test coverage.",
        "Implemented Cypress-based end-to-end automation, reducing manual testing effort by 60% and improving regression testing efficiency.",
        "Conducted API and integration testing to verify backend functionality, data integrity, and reliable communication between services.",
        "Conducted functional, hallucination, and context-retention testing for AI chatbots across conversational scenarios and edge cases.",
        "Collaborated with cross-functional Agile teams throughout sprint planning, daily standups, and retrospectives.",
        "Mentored junior QA engineers on testing practices, automation, and Agile methodologies.",
      ],
      tags: ["Cypress", "Playwright", "Postman", "AI/LLM Testing", "Agile"],
    },
    {
      role: "Software Quality Assurance Engineer",
      company: "Xtreme Software Services Pvt Ltd",
      location: "Peshawar",
      duration: "Dec 2020 – Jun 2022",
      current: false,
      highlights: [
        "Executed comprehensive manual testing for enterprise applications, identifying critical defects before production release.",
        "Performed thorough API testing to validate backend functionality, data integrity, and system integrations.",
        "Participated actively in Agile ceremonies — sprint planning, daily standups, and retrospectives.",
        "Created detailed test documentation including test plans, test cases, and defect reports.",
        "Collaborated with developers to reproduce, debug, and resolve complex software issues.",
        "Performed regression, smoke, and sanity testing for each release cycle, ensuring stable deployments.",
      ],
      tags: ["Manual Testing", "API Testing", "Regression", "Jira"],
    },
  ],

  aiTesting: {
    title: "Testing the systems that talk back.",
    intro:
      "Chatbots and LLMs fail differently from deterministic software. These are the four areas I test them on.",
    cards: [
      {
        icon: "hallucination",
        title: "Hallucination Testing",
        text: "Verifying chatbot answers stay grounded in real data, not invented facts.",
      },
      {
        icon: "context",
        title: "Context Retention",
        text: "Validating that conversations stay coherent across many turns and topic shifts.",
      },
      {
        icon: "prompt",
        title: "Prompt Engineering",
        text: "Crafting adversarial and edge-case prompts to stress-test model behavior.",
      },
      {
        icon: "aigen",
        title: "AI-Assisted Test Generation",
        text: "Using ChatGPT, Claude and Cursor to accelerate test case design without losing rigor.",
      },
    ],
  },

  process: {
    title: "Quality built into every sprint",
    steps: [
      {
        id: "01",
        title: "Plan",
        text: "Test strategy agreed during sprint planning, before work starts.",
      },
      {
        id: "02",
        title: "Automate",
        text: "Playwright and Cypress suites for the critical paths.",
      },
      {
        id: "03",
        title: "Integrate",
        text: "GitHub Actions and Docker run the same checks in CI.",
      },
      {
        id: "04",
        title: "Verify",
        text: "Regression, exploratory and performance testing before release.",
      },
    ],
  },

  credentials: [
    {
      icon: "education",
      title: "BS Computer Science",
      text: "City University of Science and Information Technology, Peshawar",
      meta: "2018 – 2022",
    },
    {
      icon: "certification",
      title: "Certifications",
      text: "Certified Git · Agile Project Management (HP Life)",
      meta: "",
    },
  ],
};
