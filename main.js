/**
 * Shared site behavior: navigation, case-study rendering from
 * data/case-studies.js, and the contact form.
 *
 * Contact form delivery uses FormSubmit (no server required, works on
 * GitHub Pages). The first submission from the live domain triggers a
 * one-time confirmation email that must be accepted once.
 */
const FORM_ENDPOINT = "https://formsubmit.co/ajax/9c1201f03ad5f01f0ecf4f3a5ddee253";

const BOOKING_URL = "https://calendar.app.google/BGmovsgcMaz1fGqo7";
const SCHEDULE_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1r9nxnonI38A5s_VSo5L21rGRehDw9G-FXbGdfSQlb_CsxBMugM85rSLGMb-PRbzdTZ35k0plq?gv=true";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhaval-kothari/" },
  { label: "Medium", href: "https://medium.com/@dhaval_kothari" },
  { label: "GitHub", href: "https://github.com/dhavalkothari" },
];

const NAV_ITEMS = [
  { label: "Home", href: "index.html" },
  { label: "Work", href: "work.html" },
  { label: "Services", href: "services.html" },
  { label: "Blogs", href: "blogs.html" },
  { label: "About", href: "about.html" },
  { label: "Resume", href: "resume.html" },
  { label: "Contact", href: "contact.html" },
];

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  setupNav();
  renderSelectedWork();
  renderWorkIndex();
  renderCaseStudy();
  setupContactForm();
  setupScheduler();
});

/**
 * Renders the shared header and footer into their mount points so
 * navigation and footer markup live in one place (this file) instead
 * of being duplicated across every page.
 */
function renderChrome() {
  const headerMount = document.querySelector("[data-site-header]");
  if (headerMount) {
    headerMount.innerHTML = `
      <div class="container nav">
        <a href="index.html" class="brand" aria-label="Dhaval Kothari home">Dhaval Kothari</a>
        <nav class="nav-links" aria-label="Main navigation">
          ${NAV_ITEMS.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
        </nav>
        <div class="nav-actions">
          <a class="nav-cta" href="https://calendar.app.google/BGmovsgcMaz1fGqo7" data-schedule-call>Schedule a call</a>
          <button class="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
            <span></span>
          </button>
        </div>
      </div>
    `;
  }

  const footerMount = document.querySelector("[data-site-footer]");
  if (footerMount) {
    footerMount.innerHTML = `
      <div class="container footer-row">
        <span>© 2026 Dhaval Kothari</span>
        <div class="footer-links">
          <a href="work.html">Work</a>
          <a href="services.html">Services</a>
          <a href="blogs.html">Blogs</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          ${SOCIAL_LINKS.map(
            (link) =>
              `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
          ).join("")}
        </div>
      </div>
    `;
  }
}

function setupNav() {
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".mobile-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const current = window.location.pathname.split("/").pop() || "index.html";
  const activeFile = current.startsWith("blog-") ? "blogs.html" : current;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const match = href.split("/").pop();
    if (match === activeFile || (activeFile === "" && match === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function caseCardMarkup(cs) {
  const previewInner = cs.demoUrl
    ? `<iframe src="${cs.demoUrl}" title="${cs.title} interactive preview" loading="lazy"></iframe>`
    : `<img src="${cs.heroImage}" alt="${cs.heroImageAlt}" loading="lazy" />`;

  return `
    <article class="case-card">
      <div class="case-preview">${previewInner}</div>
      <div class="case-body">
        <span class="case-label">${cs.category}</span>
        <h3>${cs.title}</h3>
        <p>${cs.summary}</p>
        <div class="case-meta">${cs.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <p class="case-disclosure">${cs.disclosure}</p>
        <a href="case-study.html?slug=${cs.slug}" class="case-link">View case study <span>→</span></a>
      </div>
    </article>
  `;
}

function renderSelectedWork() {
  const mount = document.querySelector("[data-selected-work]");
  if (!mount || !window.CASE_STUDIES) return;

  const order = [
    "enterprise-infrastructure-intelligence",
    "snowflake-finops-command-center",
    "freemium-learning-analytics",
  ];
  const bySlug = Object.fromEntries(window.CASE_STUDIES.map((c) => [c.slug, c]));
  mount.innerHTML = order
    .map((slug) => bySlug[slug])
    .filter(Boolean)
    .map(caseCardMarkup)
    .join("");
}

function renderWorkIndex() {
  const mount = document.querySelector("[data-work-index]");
  if (!mount || !window.CASE_STUDIES) return;
  mount.innerHTML = window.CASE_STUDIES.map(caseCardMarkup).join("");
}

function renderCaseStudy() {
  const mount = document.querySelector("[data-case-study]");
  if (!mount || !window.CASE_STUDIES) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const cs = window.CASE_STUDIES.find((c) => c.slug === slug);

  if (!cs) {
    mount.innerHTML = `
      <section class="section not-found">
        <div class="container title-block" style="margin: 0 auto; text-align: center;">
          <span class="eyebrow">Case study not found</span>
          <h1>We couldn't find that case study.</h1>
          <p style="margin: 0 auto;">The link may be out of date. Browse all current work below.</p>
          <div class="hero-actions" style="justify-content: center; margin-top: 24px;">
            <a class="btn btn-primary" href="work.html">View all work</a>
            <a class="btn btn-secondary" href="contact.html">Discuss a project</a>
          </div>
        </div>
      </section>
    `;
    document.title = "Case study not found | Dhaval Kothari";
    return;
  }

  document.title = `${cs.title} | Dhaval Kothari`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", cs.summary);

  const proofBlock = cs.demoUrl
    ? `
      <div class="case-demo-embed">
        <iframe src="${cs.demoUrl}" title="${cs.title} interactive demonstrator" loading="lazy"></iframe>
      </div>
      <p style="margin-top: 14px;"><a class="btn btn-secondary" href="${cs.demoUrl}" target="_blank" rel="noopener">Open full-screen demonstrator ↗</a></p>
    `
    : `
      <div class="case-gallery${cs.gallery.length === 1 ? " single" : ""}">
        ${cs.gallery
          .map(
            (g) => `
          <figure>
            <img src="${g.src}" alt="${g.alt}" loading="lazy" />
            <figcaption>${g.caption}</figcaption>
          </figure>
        `
          )
          .join("")}
      </div>
    `;

  const solutionParas = cs.solution
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  const solutionDiagram = cs.solutionDiagram
    ? `<div class="case-gallery single"><figure><img src="${cs.solutionDiagram.src}" alt="${cs.solutionDiagram.alt}" loading="lazy" /></figure></div>`
    : "";

  const related = window.CASE_STUDIES.filter((c) => c.slug !== cs.slug).slice(0, 2);

  mount.innerHTML = `
    <section class="case-hero">
      <div class="container">
        <span class="eyebrow">${cs.category}</span>
        <h1>${cs.title}</h1>
        <p class="outcome">${cs.oneLine}</p>
        <div class="case-hero-meta">
          <div><span>Tools</span><strong>${cs.tools.join(" · ")}</strong></div>
        </div>
        <div class="disclosure-banner"><span aria-hidden="true">＊</span><span>${cs.disclosure}</span></div>
        <div class="case-hero-actions">
          <a class="btn btn-primary" href="${cs.ctaPrimary.href}"${cs.ctaPrimary.href.startsWith("assets/") ? ' target="_blank" rel="noopener"' : ""}>${cs.ctaPrimary.label}</a>
          <a class="btn btn-secondary" href="${cs.ctaSecondary.href}">${cs.ctaSecondary.label}</a>
        </div>
      </div>
    </section>

    <section class="case-section">
      <div class="container">
        <h2>The operating problem</h2>
        <p>${cs.problem}</p>
      </div>
    </section>

    <section class="case-section">
      <div class="container">
        <h2>The solution</h2>
        ${solutionParas}
        ${solutionDiagram}
      </div>
    </section>

    <section class="case-section" id="proof">
      <div class="container">
        <h2>Product proof</h2>
        ${proofBlock}
      </div>
    </section>

    <section class="case-section">
      <div class="container">
        <h2>What it enables</h2>
        <ul>${cs.enables.map((e) => `<li>${e}</li>`).join("")}</ul>
      </div>
    </section>

    <section class="case-section">
      <div class="container">
        <h2>What it demonstrates</h2>
        <ul>${cs.demonstrates.map((d) => `<li>${d}</li>`).join("")}</ul>
      </div>
    </section>

    <section class="case-section">
      <div class="container">
        <h2>Related work</h2>
        <div class="related-work">
          ${related
            .map(
              (r) => `
            <div class="related-card">
              <span>${r.category}</span>
              <h3>${r.title}</h3>
              <a href="case-study.html?slug=${r.slug}">View case study →</a>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="hero-actions case-followup-actions">
          <a class="btn btn-primary" href="contact.html">Discuss a project</a>
          <a class="btn btn-secondary" href="https://calendar.app.google/BGmovsgcMaz1fGqo7" data-schedule-call>Schedule a call ↗</a>
          <a class="btn btn-secondary" href="work.html">View all work</a>
        </div>
      </div>
    </section>
  `;
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');

  const show = (message) => {
    if (!status) return;
    status.textContent = message;
    status.classList.add("visible");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      show("Please complete the required fields before sending.");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      _subject: `Portfolio enquiry from ${data.name || "website visitor"}`,
      _template: "table",
      _captcha: "false",
    };

    if (submit) {
      submit.disabled = true;
      submit.dataset.label = submit.textContent;
      submit.textContent = "Sending…";
    }
    show("Sending your project context…");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const result = await response.json().catch(() => ({ success: "true" }));
      if (String(result.success) !== "true") {
        throw new Error(result.message || "Submission rejected");
      }
      form.reset();
      show("Thank you. Your project context has been received.");
    } catch (error) {
      show(
        "Sending failed. Please try again in a moment, or reach out via LinkedIn."
      );
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.label || "Send project context";
      }
    }
  });
}


let googleSchedulingPromise = null;

/**
 * Loads Google's own appointment-scheduling assets once, so a click can
 * open the official booking pop-up on the same page instead of a new tab.
 */
function loadGoogleScheduling() {
  if (!googleSchedulingPromise) {
    googleSchedulingPromise = new Promise((resolve, reject) => {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      script.onload = () => {
        if (window.calendar && window.calendar.schedulingButton) {
          resolve();
        } else {
          reject(new Error("Google scheduling API unavailable"));
        }
      };
      script.onerror = () => reject(new Error("Google scheduling script failed to load"));
      document.head.appendChild(script);
    });
  }
  return googleSchedulingPromise;
}

/**
 * Opens the booking pop-up by mounting Google's scheduling button in a
 * hidden element and activating it. Falls back to the public booking
 * link in a new tab if Google's script cannot load.
 */
function openBookingPopup() {
  loadGoogleScheduling()
    .then(() => {
      const mount = document.createElement("div");
      mount.style.position = "fixed";
      mount.style.left = "-9999px";
      mount.style.top = "0";
      document.body.appendChild(mount);
      window.calendar.schedulingButton.load({
        url: SCHEDULE_EMBED_URL,
        color: "#1D6F5F",
        label: "Book an appointment",
        target: mount,
      });
      const googleButton = mount.querySelector("button, a");
      if (googleButton) {
        googleButton.click();
      } else {
        throw new Error("Google scheduling button not rendered");
      }
    })
    .catch(() => {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    });
}

function setupScheduler() {
  const triggers = document.querySelectorAll("[data-schedule-call]");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    if (trigger.tagName === "A") {
      trigger.setAttribute("href", BOOKING_URL);
      trigger.setAttribute("rel", "noopener noreferrer");
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openBookingPopup();
    });
  });
}
