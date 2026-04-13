document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const hero = document.getElementById('inicio');
    const heroBg = document.getElementById('hero-bg-container');

    // ============================================
    // 1. MOBILE MENU
    // ============================================
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.setAttribute('data-lucide', navLinks.classList.contains('active') ? 'x' : 'menu');
        lucide.createIcons();
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // ============================================
    // 2. NAVBAR SCROLL
    // ============================================
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============================================
    // 3. EFECTO 3D PARALLAX EN HERO
    // ============================================
    hero.addEventListener('mousemove', (e) => {
        const xFactor = (e.clientX / window.innerWidth - 0.5) * 2;
        const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;

        heroBg.style.transform = `
            perspective(1000px)
            rotateX(${yFactor * -3}deg)
            rotateY(${xFactor * 3}deg)
            translate3d(${xFactor * -10}px, ${yFactor * -10}px, 0)
        `;
    });

    hero.addEventListener('mouseleave', () => {
        heroBg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0,0,0)';
    });

    // ============================================
    // 4. TYPING EFFECT EN EL HERO
    // ============================================
    const heroSubtitle = document.querySelector('.hero-content p');
    const originalText = heroSubtitle ? heroSubtitle.textContent.trim() : '';

    if (heroSubtitle && originalText) {
        heroSubtitle.textContent = '';

        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        heroSubtitle.appendChild(cursor);

        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                heroSubtitle.insertBefore(document.createTextNode(originalText[i]), cursor);
                i++;
            } else {
                clearInterval(typeInterval);
                // El cursor sigue parpadeando al final
            }
        }, 35);
    }

    // ============================================
    // 5. FADE IN + SLIDE UP AL SCROLL
    // ============================================
    // Agregar clase .reveal a los elementos que queremos animar
    const elementsToReveal = [
        { selector: '.property-card', delay: true },
        { selector: '.feature-item', delay: true },
        { selector: '.step-item', delay: true },
        { selector: '.testimonial-card', delay: true },
        { selector: '.commune-item', delay: true },
        { selector: '.stat-item', delay: true },
        { selector: '.section-intro', delay: false },
        { selector: '.about-text', delay: false },
        { selector: '.about-placeholder', delay: false },
        { selector: '.coverage-content', delay: false },
        { selector: '.final-cta h2', delay: false },
        { selector: '.final-cta p', delay: false },
        { selector: '.final-cta .btn', delay: false },
    ];

    elementsToReveal.forEach(({ selector, delay }) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            if (delay) {
                const delayIndex = (index % 4) + 1;
                el.classList.add(`reveal-delay-${delayIndex}`);
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Solo anima una vez
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ============================================
    // 6. CONTADOR ANIMADO
    // ============================================
    const counters = document.querySelectorAll('[data-count]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = prefix + Math.floor(current).toLocaleString('es-CL') + suffix;
                }, 16);

                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));
});