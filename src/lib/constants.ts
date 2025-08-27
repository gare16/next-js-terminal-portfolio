const TERMINAL_CONFIG = {
  cursorBlink: true,
  cursorStyle: "bar",
  fontSize: 15,
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  cursor: "#ff2056",
  scrollback: 2000,
} as const;

const PROMPT = "\x1b[32mλ\x1b[32m \x1b[36m ~ \x1b[0m ";
const INTRO_TEXT = [
  // "✨  Welcome to the matrix of Garee's digital world!",
  // "",
  // "🚀  Loading awesome developer skills...",
  // "",
  // "💡  Tip: Type 'help' to uncover hidden commands",
  // "",
  // "🌈  Ready to explore? The terminal is all yours!",
  "",
];

const COMMANDS = {
  help: `Available commands:
[Profile]
about       - About me
skills      - My technical skills
experience  - Work experience
education   - Education background
resume      - View my resume

[Contact]
contact     - Contact information
social      - Social media links

[Fun]
banner      - Show GAREE banner
matrix      - Matrix rain effect
joke        - Programming joke
quote       - Inspirational quote
ping [url]  - Simulate ping

[Utilities]
clear       - Clear terminal
date        - Current date and time
echo [txt]  - Echo text back
calc [expr] - Simple calculator
theme [name]- Change theme (light | dark | neon)
uptime      - Show how long terminal has been running
reboot      - Restart terminal`,

  banner: `
\x1b[38;5;45m
   ██████╗  █████╗ ██████╗ ███████╗███████╗
   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
   ██████╔╝███████║██████╔╝█████╗  ███████╗
   ██╔═══╝ ██╔══██║██╔═══╝ ██╔══╝  ╚════██║
   ██║     ██║  ██║██║     ███████╗███████║
   ╚═╝     ╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝
\x1b[0m
`,

  uptime: (() => {
    const startTime = Date.now();
    return () => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      return `Uptime: ${hrs}h ${mins}m ${secs}s`;
    };
  })(),
  about: `\x1b[1;36mAbout Me\x1b[0m
I'm Garee, a passionate full-stack developer with expertise in modern web technologies. 
I love creating efficient, scalable solutions and learning new technologies. 
With over 3 years of experience, I've worked on various projects from small websites 
to complex web applications.`,

  skills: `Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS 
Backend: Node.js, Express, Python, Django, REST APIs, GraphQL
Database: MongoDB, PostgreSQL, MySQL, Firebase
Tools: Git, Docker, AWS, Vercel, Figma, Webpack
Languages: JavaScript, TypeScript, Python, Java, SQL`,

  projects: `🎯 Project Portfolio - Personal portfolio website built with Next.js and Tailwind CSS
🚀 E-commerce Platform - Full-stack e-commerce solution with React and Node.js
🤖 AI Chatbot - Intelligent chatbot using Python and machine learning
📊 Analytics Dashboard - Real-time data visualization dashboard
📱 Task Management App - Productivity app with drag-and-drop functionality
🌐 API Integration Service - Middleware for multiple API integrations`,

  experience: `Senior Developer @ TechCorp (2022-Present)
- Led development of customer-facing web applications
- Implemented CI/CD pipelines reducing deployment time by 40%
- Mentored junior developers and conducted code reviews

Web Developer @ StartupXYZ (2020-2022)
- Developed responsive web applications using React and Node.js
- Collaborated with design team to implement UI/UX improvements
- Optimized application performance resulting in 30% faster load times

Frontend Intern @ DigitalAgency (2019-2020)
- Built reusable React components and implemented responsive designs
- Assisted in migration from legacy JavaScript to TypeScript
- Participated in agile development processes`,

  education: `Bachelor of Computer Science - University of Technology (2016-2020)
- Specialized in Software Engineering
- GPA: 3.8/4.0
- Relevant coursework: Algorithms, Data Structures, Web Development, Database Systems

Certifications:
- AWS Certified Developer Associate
- React Developer Certification
- MongoDB University Certification`,

  contact: `Email: me@garee.pro
Phone: +62 878 4872 3491
Location: Bandung, West Java

Available for:
- Freelance projects
- Full-time opportunities
- Technical consulting
- Open source collaborations`,

  social: () => {
    return `Follow me:
\x1b[38;5;33m\x1b]8;;https://github.com/username\x07GitHub\x1b]8;;\x07\x1b[24m\x1b[0m

\x1b[38;5;27m\x1b]8;;https://linkedin.com/in/username\x07LinkedIn\x1b]8;;\x07\x1b[24m\x1b[0m

\x1b[38;5;45m\x1b]8;;https://twitter.com/username\x07Twitter\x1b]8;;\x07\x1b[24m\x1b[0m
`;
  },

  resume: `Garee - Full Stack Developer
─────────────────────────────
\x1b[36mEXPERIENCE:\x1b[0m
Full Stack Web Developer Internship @ Satu Data Indonesia Bappenas (Oct 2023 - Des 2023)
• Built responsive UIs with Next.js and Tailwind CSS, improving mobile Lighthouse scores from 65 to 92 and reducing page load times to <1.5s.
• Developed secure RESTful APIs with Express.js, handling 1,000+ requests/day with < 200ms average response time.
• Implemented JWT auth and role-based access, securing 100% of protected routes and preventing unauthorized access.

\x1b[36mSKILLS:\x1b[0m
• Frontend: React, Next.js, TypeScript,
• Backend: Node.js, Express
• Database: MongoDB, PostgreSQL, MySQL
• DevOps: Docker, AWS,

\x1b[36mEDUCATION:\x1b[0m
Bachelor of Computer Engineering - Universitas Komputer Indonesia

Download full resume: \x1b[38;5;45m\x1b]8;;http://localhost:3000/api/download\x07Here\x1b]8;;\x07\x1b[0m`,

  date: `Current date: ${new Date().toLocaleDateString()}
Current time: ${new Date().toLocaleTimeString()}
Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,

  quote: `"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie

"First, solve the problem. Then, write the code." - John Johnson

"Code is like humor. When you have to explain it, it's bad." - Cory House`,

  joke: `Why do programmers prefer dark mode?
Because light attracts bugs!

How many programmers does it take to change a light bulb?
None. It's a hardware problem.

Why do Java developers wear glasses?
Because they can't C#!

What's the object-oriented way to become wealthy?
Inheritance!

A SQL query goes into a bar, walks up to two tables and asks:
"Can I join you?"`,

  echo: (text: string) => text || "Usage: echo [text]",

  calc: (expression: string) => {
    try {
      // Remove non-math characters for security
      const cleanExpr = expression.replace(/[^0-9+\-*/().]/g, "");
      return String(eval(cleanExpr));
    } catch {
      return "Error: Invalid expression. Usage: calc [expression]";
    }
  },

  reboot: "Rebooting terminal...",
} as const;

export { TERMINAL_CONFIG, PROMPT, INTRO_TEXT, COMMANDS };
