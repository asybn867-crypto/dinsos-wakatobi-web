(() => {
  const header = document.querySelector(".site-header");
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (button && nav) {
    const closeMenu = () => {
      button.setAttribute("aria-expanded", "false");
      button.querySelector("span").textContent = "＋";
      nav.classList.remove("is-open");
    };

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      button.querySelector("span").textContent = isOpen ? "＋" : "−";
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!header.contains(event.target)) closeMenu();
    });
  }

  if ("IntersectionObserver" in window && nav) {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const active = link.getAttribute("href") === ("#" + entry.target.id);
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -62% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
})();