/**
 * Sonu Kumar - Personal Portfolio Website JavaScript
 * Features:
 * - Dark / Light Theme Toggle with LocalStorage persistence
 * - Typing Animation Effect
 * - Mobile Navigation Menu Toggle & Auto-Close
 * - Sticky Header & Active Nav Link Highlight on Scroll
 * - IntersectionObserver Scroll Reveal Animations
 * - Scroll-to-Top Floating Button
 * - Dynamic Footer Year
 * - Contact Form Validation & Feedback
 * - Interactive Speed Typer Mini-App Demo Modal
 * - Project Architecture & Analytics Modals
 * - Professional Resume Viewer & Print Generator
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or prefer dark
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  htmlRoot.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlRoot.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";
      htmlRoot.setAttribute("data-theme", targetTheme);
      localStorage.setItem("portfolio-theme", targetTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Typing Effect in Hero Section
  // --------------------------------------------------------------------------
  const typedTextEl = document.querySelector(".typed-text");
  const phrases = [
    "MCA Student",
    "Java Developer",
    "Data Analytics Enthusiast",
    "SQL & Database Developer",
    "Problem Solver"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of the phrase
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Menu
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (hamburgerBtn && mobileNavDrawer) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileNavDrawer.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mobileNavDrawer.classList.contains("open") &&
        !mobileNavDrawer.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        mobileNavDrawer.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Nav Link on Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Scroll-To-Top Button
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 350) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Footer Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form Client-Side Validation & Feedback
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("portfolio-contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const subjectInput = document.getElementById("contact-subject");
      const messageInput = document.getElementById("contact-message");

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, "Please enter your name (at least 2 characters).");
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showError(subjectInput, "Please enter a subject (at least 3 characters).");
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError(messageInput, "Please write a message of at least 10 characters.");
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        // Successful submission simulation
        if (formFeedback) {
          formFeedback.textContent =
            "Thank you, " +
            nameInput.value.trim() +
            "! Your message has been sent successfully. I will get back to you shortly.";
          formFeedback.className = "form-feedback success";
        }
        contactForm.reset();

        setTimeout(() => {
          if (formFeedback) {
            formFeedback.style.display = "none";
          }
        }, 6000);
      }
    });
  }

  function showError(inputElement, message) {
    inputElement.classList.add("error");
    const errorMsgEl = inputElement.parentElement.querySelector(".form-error-msg");
    if (errorMsgEl) {
      errorMsgEl.textContent = message;
      errorMsgEl.classList.add("visible");
    }
  }

  function clearError(inputElement) {
    inputElement.classList.remove("error");
    const errorMsgEl = inputElement.parentElement.querySelector(".form-error-msg");
    if (errorMsgEl) {
      errorMsgEl.textContent = "";
      errorMsgEl.classList.remove("visible");
    }
  }

  // --------------------------------------------------------------------------
  // 9. Interactive Modals (Speed Typer, Dashboard, Java SMS, Resume)
  // --------------------------------------------------------------------------
  const modals = document.querySelectorAll(".modal-overlay");
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add("active");
      document.body.style.overflow = "hidden";

      // If opening Speed Typer, initialize game
      if (modalId === "speed-typer-modal") {
        initSpeedTyper();
      }
    }
  }

  function closeModal(targetModal) {
    if (targetModal) {
      targetModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Attach trigger buttons
  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute("data-open-modal");
      openModal(modalId);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentModal = btn.closest(".modal-overlay");
      closeModal(parentModal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((m) => closeModal(m));
    }
  });

  // --------------------------------------------------------------------------
  // 10. Playable Speed Typer Interactive Engine
  // --------------------------------------------------------------------------
  const sampleQuotes = [
    "Clean code always looks like it was written by someone who cares.",
    "Data analysis is the compass that turns raw numbers into strategic direction.",
    "Object-oriented programming in Java enforces structured and maintainable architecture.",
    "Continuous learning and consistency define high-impact software developers."
  ];

  let currentQuoteText = "";
  let typerTimer = null;
  let timeLeft = 30;
  let isTimerRunning = false;
  let totalCharsTyped = 0;
  let correctCharsTyped = 0;

  function initSpeedTyper() {
    const quoteDisplay = document.getElementById("typer-quote-text");
    const typerInput = document.getElementById("typer-input");
    const timeLeftEl = document.getElementById("typer-time-left");
    const wpmEl = document.getElementById("typer-wpm");
    const accuracyEl = document.getElementById("typer-accuracy");
    const restartBtn = document.getElementById("typer-restart-btn");

    if (!quoteDisplay || !typerInput) return;

    // Reset game state
    clearInterval(typerTimer);
    timeLeft = 30;
    isTimerRunning = false;
    totalCharsTyped = 0;
    correctCharsTyped = 0;

    if (timeLeftEl) timeLeftEl.textContent = "30s";
    if (wpmEl) wpmEl.textContent = "0";
    if (accuracyEl) accuracyEl.textContent = "100%";

    // Pick random quote
    currentQuoteText = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
    quoteDisplay.innerHTML = "";

    currentQuoteText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "typer-quote-char";
      span.innerText = char;
      quoteDisplay.appendChild(span);
    });

    typerInput.value = "";
    typerInput.disabled = false;
    typerInput.focus();

    typerInput.oninput = handleTypingInput;
    if (restartBtn) restartBtn.onclick = initSpeedTyper;
  }

  function handleTypingInput() {
    const typerInput = document.getElementById("typer-input");
    const timeLeftEl = document.getElementById("typer-time-left");
    const wpmEl = document.getElementById("typer-wpm");
    const accuracyEl = document.getElementById("typer-accuracy");
    const charSpans = document.querySelectorAll(".typer-quote-char");

    if (!typerInput) return;

    // Start timer on first keystroke
    if (!isTimerRunning) {
      isTimerRunning = true;
      typerTimer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          if (timeLeftEl) timeLeftEl.textContent = `${timeLeft}s`;
          updateTyperStats();
        } else {
          clearInterval(typerTimer);
          typerInput.disabled = true;
        }
      }, 1000);
    }

    const inputVal = typerInput.value.split("");
    let correctCount = 0;

    charSpans.forEach((charSpan, index) => {
      const char = inputVal[index];
      if (char == null) {
        charSpan.classList.remove("correct", "incorrect", "current");
        if (index === inputVal.length) charSpan.classList.add("current");
      } else if (char === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect", "current");
        correctCount++;
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct", "current");
      }
    });

    totalCharsTyped = inputVal.length;
    correctCharsTyped = correctCount;

    // If completed quote
    if (inputVal.length === currentQuoteText.length) {
      clearInterval(typerTimer);
      typerInput.disabled = true;
      updateTyperStats();
    }
  }

  function updateTyperStats() {
    const wpmEl = document.getElementById("typer-wpm");
    const accuracyEl = document.getElementById("typer-accuracy");

    const timeElapsed = 30 - timeLeft;
    if (timeElapsed > 0) {
      const words = correctCharsTyped / 5;
      const wpm = Math.round((words / timeElapsed) * 60);
      if (wpmEl) wpmEl.textContent = wpm > 0 ? wpm.toString() : "0";
    }

    if (totalCharsTyped > 0) {
      const acc = Math.round((correctCharsTyped / totalCharsTyped) * 100);
      if (accuracyEl) accuracyEl.textContent = `${acc}%`;
    }
  }

  // --------------------------------------------------------------------------
  // 11. Skills Filter Tabs
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-category-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      skillCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 12. Resume Print / Download Trigger
  // --------------------------------------------------------------------------
  const printResumeBtn = document.getElementById("print-resume-btn");
  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }
});
