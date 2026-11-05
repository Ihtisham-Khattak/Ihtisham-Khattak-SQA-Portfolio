// The report's chapters, in order. Drives the margin rail, the stamps, the
// self-audit and the scroll-spy. `id` is the section id in the document.
export const chapters = [
  { id: "top", tc: "00", label: "Title page" },
  { id: "highlights", tc: "01", label: "Highlights" },
  { id: "about", tc: "02", label: "About" },
  { id: "skills", tc: "03", label: "Skills" },
  { id: "experience", tc: "04", label: "Experience" },
  { id: "projects", tc: "05", label: "Projects" },
  { id: "ai-testing", tc: "06", label: "AI Testing" },
  { id: "process", tc: "07", label: "Process" },
  { id: "testimonials", tc: "08", label: "Testimonials" },
  { id: "credentials", tc: "09", label: "Credentials" },
  { id: "result", tc: "10", label: "Result" },
  { id: "contact", tc: "11", label: "Contact" },
];

export const chapterIds = chapters.map((c) => c.id);
