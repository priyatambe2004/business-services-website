// Veda Technology concept website — interactive features
"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const programs = [
  {icon:"⌘",title:"Web Development",description:"Practice HTML, CSS, JavaScript, and responsive front-end website development.",category:"Development",level:"Web"},
  {icon:"☕",title:"Java Programming",description:"Explore Core Java, object-oriented programming, collections, exception handling, and problem-solving.",category:"Development",level:"Java"},
  {icon:"🐍",title:"Python Programming",description:"Build foundations in Python and practise through scripts and small application projects.",category:"Development",level:"Python"},
  {icon:"▥",title:"Data Science",description:"Explore Python, Pandas, data visualisation, and case studies using datasets.",category:"Data",level:"Data"},
  {icon:"◈",title:"Data Analytics",description:"Explore data handling and analysis with tools such as SQL, Excel, Power BI, and Python.",category:"Data",level:"Analytics"},
  {icon:"☁",title:"Cloud Computing",description:"Learn cloud infrastructure concepts including virtual machines, storage, networking, and security.",category:"Infrastructure",level:"Cloud"},
  {icon:"▣",title:"Android Development",description:"Explore the fundamentals of creating mobile applications for Android.",category:"Development",level:"Mobile"},
  {icon:"✳",title:"Graphic Design & UI/UX",description:"Practise visual design, user interface concepts, and digital creative work.",category:"Design",level:"Design"},
  {icon:"↗",title:"Digital Marketing",description:"Explore SEO, content marketing, social media, and digital campaign fundamentals.",category:"Marketing",level:"Digital"}
];
const services = [
  {icon:"⌘",title:"Web Design & Development",description:"Responsive marketing websites and web applications built around business needs."},
  {icon:"☁",title:"Cloud Solutions",description:"Cloud deployment, hosting, and infrastructure solutions."},
  {icon:"▣",title:"App Development",description:"Mobile and cross-platform app development from design to release."},
  {icon:"↗",title:"Digital Marketing",description:"SEO, content, and campaign support to help businesses improve their digital presence."},
  {icon:"✦",title:"IT Training & Internships",description:"Technology training and internship programs across listed learning domains."},
  {icon:"◎",title:"Placement Support",description:"The website lists resume reviews, mock interviews, and referrals for top-performing interns."}
];
const faqs = [
  {q:"Is the internship free?",a:"Veda Technology’s official website says the internship program is offered without an application fee. Always review the current official application instructions."},
  {q:"Is the internship virtual or offline?",a:"The official website describes the internship as 100% virtual, so participants can work remotely using their own device and internet connection."},
  {q:"How long does the internship last?",a:"The official FAQ says programs generally run for 4–6 weeks. The exact duration and start date are stated in the offer letter."},
  {q:"Which internship domains are listed?",a:"The official website lists Web Development, Data Science, Python Programming, Data Analytics, Cloud Computing, Java Programming, Graphic Design, Digital Marketing, and also references Android and UI/UX."},
  {q:"Will I receive an internship certificate?",a:"The website says interns who successfully complete the required activities and program requirements are eligible for an internship certificate. A certificate is not guaranteed simply by applying."},
  {q:"How are tasks and attendance handled?",a:"The official FAQ says attendance is marked based on daily task submission and missed deadlines may affect completion and certificate eligibility. Follow the schedule in your offer letter."},
  {q:"How do I apply or access the dashboard?",a:"Use the official website to complete the application process. The website says dashboard access is for candidates who have completed the process and received an offer or confirmation letter."},
  {q:"Does an internship guarantee a job?",a:"An internship should not be treated as a guarantee of employment. Review the official terms and program details for the current conditions and expectations."}
];

// Build program cards and filters.
function renderPrograms(filter = "all") {
  const visible = programs.filter(item => filter === "all" || item.category === filter);
  $("#programGrid").innerHTML = visible.map((item, i) => `
    <article class="program-card" data-cat="${item.category}" style="--i:${i}">
      <div class="card-top"><span class="card-icon" aria-hidden="true">${item.icon}</span><span class="category">${item.category}</span></div>
      <h3>${item.title}</h3><p>${item.description}</p>
      <div class="card-footer"><span class="level">${item.level}</span><span class="arrow" aria-hidden="true">↗</span></div>
    </article>`).join("");
}
renderPrograms();
$$(".filter").forEach(button => button.addEventListener("click", () => {
  $$(".filter").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderPrograms(button.dataset.filter);
}));

// Build service cards.
$("#serviceGrid").innerHTML = services.map(item => `
  <article class="service-card"><span class="card-icon" aria-hidden="true">${item.icon}</span>
  <h3>${item.title}</h3><p>${item.description}</p></article>`).join("");

// Searchable, accessible FAQ accordion.
function renderFaqs(query = "") {
  const q = query.trim().toLowerCase();
  const matches = faqs.filter(item => `${item.q} ${item.a}`.toLowerCase().includes(q));
  $("#faqList").innerHTML = matches.map(item => `<details class="faq-item"><summary>${item.q}</summary><p>${item.a}</p></details>`).join("");
  $("#faqEmpty").hidden = matches.length > 0;
}
renderFaqs();
$("#faqSearch").addEventListener("input", event => renderFaqs(event.target.value));

// Mobile menu.
const nav = $("#nav");
const menuBtn = $("#menuBtn");
function closeMenu() {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation");
}
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
$$(".nav a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
document.addEventListener("click", event => {
  if (!nav.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
});

// Light/dark mode; remember the choice where localStorage is available.
const themeBtn = $("#themeBtn");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☾" : "☼";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#101326" : "#f7f8fc";
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("veda-theme"); } catch (_) {}
setTheme(savedTheme ? savedTheme : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  try { localStorage.setItem("veda-theme", next); } catch (_) {}
});

// Highlight the active nav item as sections enter the viewport.
const navLinks = $$(".nav a[href^='#']");
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  }), {rootMargin:"-35% 0px -55% 0px"});
  $$("main section[id]").forEach(section => navObserver.observe(section));
}

// Reveal animations, with a reduced-motion fallback.
const revealItems = $$(".reveal");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), {threshold:.12});
  revealItems.forEach(item => revealObserver.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));

// Back-to-top control.
const scrollTop = $("#scrollTop");
function updateScrollTop() { scrollTop.classList.toggle("visible", window.scrollY > 500); }
window.addEventListener("scroll", updateScrollTop, {passive:true});
updateScrollTop();
scrollTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

// Client-side validation. This demo does not send messages unless you configure an email/backend.
const form = $("#contactForm");
const status = $("#formStatus");
const rules = {
  name: value => value.trim() ? "" : "Please enter your name.",
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
  message: value => value.trim().length >= 10 ? "" : "Please write at least 10 characters."
};
function validateField(key) {
  const field = $(`#${key}`);
  const error = $(`[data-error="${key}"]`);
  const message = rules[key](field.value);
  error.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}
Object.keys(rules).forEach(key => {
  const field = $(`#${key}`);
  field.addEventListener("blur", () => validateField(key));
  field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") validateField(key); });
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const valid = Object.keys(rules).map(validateField).every(Boolean);
  if (!valid) {
    status.textContent = "Please review the highlighted fields and try again.";
    status.classList.add("status-error");
    $('[aria-invalid="true"]', form)?.focus();
    return;
  }
  const recipient = "support@vedatechnology.in";
  if (recipient === "replace-with-official-email@example.com") {
    status.textContent = "The form is valid.";
    status.classList.remove("status-error");
    return;
  }
  const subject = encodeURIComponent(`Website enquiry: ${$("#topic").value}`);
  const body = encodeURIComponent(`Name: ${$("#name").value.trim()}\nEmail: ${$("#email").value.trim()}\nTopic: ${$("#topic").value}\n\nMessage:\n${$("#message").value.trim()}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  status.textContent = "Your email app should open with a message prepared for Veda Technology. Review it before sending.";
  status.classList.remove("status-error");
});

$("#year").textContent = new Date().getFullYear();

// ---- Visual enhancements ----
const progress = $("#progress");
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
}
addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

// Pointer spotlight and gentle tilt on cards; hero glow follows the cursor.
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches;
if (!calm) {
  document.addEventListener("pointermove", event => {
    const card = event.target.closest?.(".program-card, .service-card, .value-card");
    if (card) {
      const r = card.getBoundingClientRect();
      const x = event.clientX - r.left, y = event.clientY - r.top;
      card.style.setProperty("--px", `${x}px`);
      card.style.setProperty("--py", `${y}px`);
      if (!card.classList.contains("value-card")) {
        card.style.setProperty("--ry", `${((x / r.width) - .5) * 6}deg`);
        card.style.setProperty("--rx", `${(.5 - (y / r.height)) * 6}deg`);
      }
    }
    const hero = $(".hero");
    const h = hero.getBoundingClientRect();
    if (event.clientY >= h.top && event.clientY <= h.bottom) {
      hero.style.setProperty("--mx", `${event.clientX}px`);
      hero.style.setProperty("--my", `${event.clientY - h.top}px`);
    }
  }, {passive:true});
  document.addEventListener("pointerout", event => {
    const card = event.target.closest?.(".program-card, .service-card");
    if (card && !card.contains(event.relatedTarget)) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
  });
}
