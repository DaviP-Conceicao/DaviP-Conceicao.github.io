document.addEventListener('DOMContentLoaded', () => {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.toggle();
            }
        });
    });
});