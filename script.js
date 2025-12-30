/**
 * Portfolio Website - JavaScript
 * Handles theme toggle, mobile navigation, and smooth interactions
 */

(function () {
    'use strict';

    // ========================================
    // Theme Toggle
    // ========================================

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const THEME_KEY = 'portfolio-theme';

    // Initialize theme from localStorage or default to dark
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.setAttribute('data-theme', prefersDark ? 'dark' : 'dark'); // Default to dark
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    }

    themeToggle?.addEventListener('click', toggleTheme);
    initTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // ========================================
    // Mobile Navigation
    // ========================================

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        navToggle?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle?.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ========================================
    // Smooth Scroll with Offset
    // ========================================

    const NAV_HEIGHT = 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Animations
    // ========================================

    const animatedElements = document.querySelectorAll('.system-card, .timeline-item, .skill-group');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ========================================
    // Active Nav Link on Scroll
    // ========================================

    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + NAV_HEIGHT + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    // ========================================
    // Nav Background on Scroll
    // ========================================

    const nav = document.getElementById('nav');

    function updateNavBackground() {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavBackground, { passive: true });

    // ========================================
    // Typing Effect for Hero (Optional Enhancement)
    // ========================================

    // Uncomment if you want a typing effect on the hero title
    /*
    const heroTitle = document.querySelector('.hero-title');
    const titles = [
        'Senior Research Scientist | GenAI Systems for Real Businesses',
        'Building Production-Grade AI Systems',
        'GenAI × System Design × Business Execution'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTitle() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(typeTitle, isDeleting ? 50 : 100);
    }

    setTimeout(typeTitle, 2000);
    */

    // ========================================
    // Parallax Effect on Hero Shapes
    // ========================================

    const shapes = document.querySelectorAll('.shape');

    if (shapes.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 10;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }, { passive: true });
    }

    // ========================================
    // Console Easter Egg
    // ========================================

    console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold;');
    console.log('%cLooking for the source? Feel free to explore.', 'font-size: 14px;');
    console.log('%cBuilt with vanilla HTML, CSS, and JS. No frameworks. Pure signal.', 'font-size: 14px; color: #a78bfa;');

})();
