document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica da Navbar mantida
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
    
    // Lógica de Scroll e Fade mantida
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // Lógica do Modal ENEM mantida
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

    // ========================================================
    // NOVA LÓGICA DE GERENCIAMENTO DE AGENTES DO VOICEFLOW
    // ========================================================
    
    let currentActiveAgent = null;

    function openVoiceflowAgent(projectId) {
       
        // 1. Se for o mesmo agente, apenas reabre o chat
        if (currentActiveAgent === projectId && window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.open();
            return;
        }

        // 2. Destruição segura e oficial do Voiceflow para limpar o DOM e sessões antigas
        if (window.voiceflow && window.voiceflow.chat) {
            window.voiceflow.chat.destroy();
        }

        currentActiveAgent = projectId;
       
        // 3. Limpa o script anterior
        const existingScript = document.getElementById('vf-widget-script');
        if (existingScript) existingScript.remove();

        // 4. Injeta o novo script limpo
        const vfScript = document.createElement('script');
        vfScript.id = 'vf-widget-script';
        vfScript.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
        vfScript.type = 'text/javascript';
        vfScript.onload = () => {
            window.voiceflow.chat.load({
                verify: { projectID: projectId },
                url: 'https://general-runtime.voiceflow.com',
                voice: { url: 'https://runtime-api.voiceflow.com' }
            }).then(() => {
                window.voiceflow.chat.open(); 
            }).catch(err => console.error("Erro ao carregar Voiceflow:", err));
        };
        document.body.appendChild(vfScript);
    }

    // Novo Event Listener mais simples e seguro, baseado no HTML
    const voiceflowButtons = document.querySelectorAll('.btn-voiceflow');
    
    voiceflowButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const projectId = btn.getAttribute('data-vf-id');
            if (projectId) {
                openVoiceflowAgent(projectId);
            }
        });
    });

    // Fallback de segurança mantido (caso utilize em outra página)
    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('#btnOpenAIAgentBottom');
        if (trigger) {
            event.preventDefault();
            openVoiceflowAgent('6abd2b1ac2c0d5ecb6cbfbb1'); // ENEM como padrão
        }
    });
});