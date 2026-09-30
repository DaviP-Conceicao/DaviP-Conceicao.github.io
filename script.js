document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');

    if (menuToggle && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
    }

    const fadeElements = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const btnOpenModal = document.getElementById('btnOpenModalEnem');
    const modalEnem = document.getElementById('modalEnem');
    const btnCloseModal = document.getElementById('btnCloseModalEnem');

    if (btnOpenModal && modalEnem && btnCloseModal) {
        btnOpenModal.addEventListener('click', (e) => {
            e.preventDefault(); 
            modalEnem.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        btnCloseModal.addEventListener('click', () => {
            modalEnem.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        });

        modalEnem.addEventListener('click', (e) => {
            if (e.target === modalEnem) {
                modalEnem.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalEnem.classList.contains('active')) {
                modalEnem.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});