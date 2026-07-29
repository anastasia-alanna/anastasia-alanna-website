(function () {
  const c = window.SITE_CONTENT;
  const path = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  const serviceLinks = [
    ["ongoing-operations.html", "Ongoing Operations Partnership"],
    ["website-analysis.html", "Website Analysis"],
    ["growth-roadmap.html", "Growth Roadmap"]
  ];

  const servicePages = serviceLinks.map(([href]) => href);
  const servicesActive =
    path === "services.html" || servicePages.includes(path);

  const header = document.querySelector("[data-site-header]");

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to main content</a>

      <header class="site-header">
        <div class="container header-inner">
          <a
            class="brand"
            href="index.html"
            aria-label="${c.businessName} home"
          >
            <img
              src="${c.images.logo}"
              alt="${c.businessName}, ${c.title}"
            >
          </a>

          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="main-nav"
            aria-label="Open navigation"
          >
            ☰
          </button>

          <nav
            id="main-nav"
            class="main-nav"
            aria-label="Primary navigation"
          >
            <a
              href="index.html"
              ${path === "index.html" ? 'aria-current="page"' : ""}
            >
              Home
            </a>

            <div class="nav-dropdown">
              <button
                class="nav-dropdown-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="services-submenu"
                ${servicesActive ? 'aria-current="page"' : ""}
              >
                Services
                <span class="nav-dropdown-arrow" aria-hidden="true">⌄</span>
              </button>

              <div
                id="services-submenu"
                class="nav-dropdown-menu"
              >
                <a
                  href="services.html"
                  ${path === "services.html" ? 'aria-current="page"' : ""}
                >
                  View All Services
                </a>

                ${serviceLinks
                  .map(
                    ([href, label]) => `
                      <a
                        href="${href}"
                        ${path === href ? 'aria-current="page"' : ""}
                      >
                        ${label}
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>

            <a
              href="about.html"
              ${path === "about.html" ? 'aria-current="page"' : ""}
            >
              About
            </a>

            <a
              href="contact.html"
              ${path === "contact.html" ? 'aria-current="page"' : ""}
            >
              Contact
            </a>
          </nav>

          <a
            class="btn header-cta schedule-link"
            href="${c.schedulingUrl}"
          >
            Book a Discovery Call
          </a>
        </div>
      </header>
    `;
  }

  const footer = document.querySelector("[data-site-footer]");

  const footerNav = [
    ["index.html", "Home"],
    ["services.html", "Services"],
    ["website-analysis.html", "Website Analysis"],
    ["growth-roadmap.html", "Growth Roadmap"],
    ["about.html", "About"],
    ["contact.html", "Contact"]
  ];

  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-top">
          <div class="footer-brand">
            <img
              src="${c.images.logo}"
              alt="${c.businessName}"
            >

            <p>
              I help small business owners create structure behind the scenes
              so they can lead with confidence and grow with clarity.
            </p>
          </div>

          <nav
            class="footer-links"
            aria-label="Footer navigation"
          >
            <strong>Quick Links</strong>

            ${footerNav
              .map(
                ([href, label]) => `
                  <a href="${href}">${label}</a>
                `
              )
              .join("")}
          </nav>

          <div class="footer-cta">
            <h3>Ready for greater clarity behind your business?</h3>

            <p>
              Schedule a discovery call to talk about your business and the
              support that is right for you.
            </p>

            <a
              class="btn schedule-link"
              href="${c.schedulingUrl}"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>

        <div class="container footer-bottom">
          <span>
            © <span data-year></span>
            ${c.businessName} | ${c.title}
          </span>

          <span class="footer-legal">
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms &amp; Conditions</a>
            <a href="accessibility.html">Accessibility</a>
          </span>
        </div>
      </footer>
    `;
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-image]").forEach((element) => {
    const key = element.dataset.image;

    if (c.images[key]) {
      element.src = c.images[key];
    }
  });

  document.querySelectorAll(".schedule-link").forEach((element) => {
    element.href = c.schedulingUrl;

    if (c.schedulingUrl.startsWith("#ADD")) {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Add the Cal.com URL in assets/js/site-content.js.");
      });
    }
  });

  const mobileToggle = document.querySelector(".nav-toggle");
  const mainMenu = document.querySelector(".main-nav");

  if (mobileToggle && mainMenu) {
    mobileToggle.addEventListener("click", () => {
      const open = mainMenu.classList.toggle("open");

      mobileToggle.setAttribute("aria-expanded", String(open));
      mobileToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
      mobileToggle.textContent = open ? "×" : "☰";
    });
  }

  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  function closeDropdown() {
    if (!dropdown || !dropdownToggle) {
      return;
    }

    dropdown.classList.remove("open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const open = dropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
        dropdownToggle.focus();
      }
    });
  }

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        )
      : null;

  document.querySelectorAll(".reveal").forEach((element) => {
    if (observer) {
      observer.observe(element);
    } else {
      element.classList.add("visible");
    }
  });

  const form = document.querySelector("[data-contact-form]");

  if (form) {
    form.action = c.formAction;

    form.addEventListener("submit", (event) => {
      if (c.formAction.startsWith("#ADD")) {
        event.preventDefault();

        const status = form.querySelector(".form-status");

        if (status) {
          status.textContent =
            "The form endpoint still needs to be added in assets/js/site-content.js.";
          status.focus();
        }
      }
    });
  }
})();