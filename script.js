document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const hero = document.getElementById('inicio');
    const heroBg = document.getElementById('hero-bg-container');

    // 1. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // 2. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. 3D Perspective Effect on Hero
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate factors (-1 to 1)
        const xFactor = (clientX / innerWidth - 0.5) * 2;
        const yFactor = (clientY / innerHeight - 0.5) * 2;

        // Rotation degrees (max 3 degrees for subtleness)
        const rotY = xFactor * 3;
        const rotX = yFactor * -3;

        // Translation for parallax
        const transX = xFactor * -10;
        const transY = yFactor * -10;

        heroBg.style.transform = `
            perspective(1000px) 
            rotateX(${rotX}deg) 
            rotateY(${rotY}deg) 
            translate3d(${transX}px, ${transY}px, 0)
        `;
    });

    // Reset transform on mouse leave
    hero.addEventListener('mouseleave', () => {
        heroBg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translate3d(0, 0, 0)';
    });
});
