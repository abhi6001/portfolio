/* =========================================================
   script.js
   Handles: mobile navigation toggle, smooth scrolling,
   active navigation highlighting, and a basic contact form
   demo handler.
   ========================================================= */

// ---------------------------------------------------------
// 1. MOBILE NAVIGATION TOGGLE
// ---------------------------------------------------------
// Grabs the hamburger button and the nav links list, then
// toggles a "show" class on the list and an "open" class on
// the button whenever the hamburger is clicked.
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');

    // Keep aria-expanded in sync for accessibility
    const isOpen = navLinks.classList.contains('show');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu automatically after a link is clicked
  const allNavLinks = navLinks.querySelectorAll('a');
  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ---------------------------------------------------------
// 2. SMOOTH SCROLLING FOR ON-PAGE ANCHOR LINKS
// ---------------------------------------------------------
// Only affects links that point to an ID on the SAME page,
// e.g. <a href="#skills">. Normal page links (about.html
// etc.) are left alone.
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    // Ignore empty "#" placeholder links (used for GitHub/LinkedIn stand-ins)
    if (targetId.length <= 1) return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------------------------------------------------------
// 3. ACTIVE NAVIGATION HIGHLIGHTING
// ---------------------------------------------------------
// Compares the current page's file name to each nav link's
// href and adds the "active" class to the matching one.
// This keeps the highlight correct even if a page is opened
// directly (not just through clicking a nav link).
function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

highlightActiveLink();

// ---------------------------------------------------------
// 4. CONTACT FORM (DEMO ONLY)
// ---------------------------------------------------------
// This just stops the page from reloading and shows a message.
// It does NOT actually send an email — you'll need a service
// like Formspree or EmailJS (or your own backend) for that.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // TODO: connect this to a real email service
    formStatus.textContent = 'Thanks! This is a demo form — hook it up to a real service to actually send messages.';

    contactForm.reset();
  });
}
