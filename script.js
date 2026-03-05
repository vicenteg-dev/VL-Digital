// Funcionalidades do Header
function initHeader() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Animação do botão hambúrguer
            const icon = mobileMenuBtn.querySelector('svg');
            if (navList.classList.contains('active')) {
                icon.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                `;
            } else {
                icon.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            }
        });
        
        // Fechar menu ao clicar em link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            });
        });
    }
}

// Funcionalidades do Formulário de Contato
function initContactForm() {
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem enviada!';
                submitBtn.style.background = '#25D366';
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// Animação de entrada para elementos do contato
function animateContactElements() {
    const contactItems = document.querySelectorAll('.contact-item');
    const formGroup = document.querySelectorAll('.form-group');
    
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
    
    formGroup.forEach((group, index) => {
        group.style.animationDelay = `${(contactItems.length + index) * 0.1}s`;
        group.classList.add('fade-in');
    });
}
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animação de fade-in ao rolar a página
function handleScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Adicionar efeito parallax nos elementos flutuantes
function handleParallax() {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Animação para os cards de serviços
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Animação para os steps
function animateSteps() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
    });
}

// Animação para os cards de portfólio
function animatePortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Animação para as estatísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isTime = finalValue.includes('h');
        const isPlus = finalValue.includes('+');
        
        let numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const updateCounter = () => {
            if (currentValue < numericValue) {
                currentValue += increment;
                if (currentValue > numericValue) currentValue = numericValue;
                
                let displayValue = Math.floor(currentValue);
                if (isPercentage) displayValue += '%';
                else if (isTime) displayValue += 'h';
                else if (isPlus) displayValue += '+';
                
                stat.textContent = displayValue;
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Iniciar animação quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Efeito de aparição suave para o título
function fadeInTitle() {
    const title = document.querySelector('.hero-title');
    if (title) {
        title.style.opacity = '0';
        title.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            title.style.transition = 'all 1.5s ease-out';
            title.style.opacity = '1';
            title.style.filter = 'blur(0)';
        }, 500);
    }
}

// Adicionar efeito de brilho ao mouse nos cards
function addMouseGlowEffect() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .step');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Criar partículas mais avançadas
function createAdvancedParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'advanced-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Criar diferentes tipos de partículas
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 102, 255, 0.8) 0%, rgba(0, 170, 255, 0.4) 100%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: advancedFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(0, 102, 255, 0.4);
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Efeito de brilho no hover dos botões
function addButtonGlowEffect() {
    const buttons = document.querySelectorAll('.cta-button, .whatsapp-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Inicializar animações quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar header
    initHeader();
    
    // Inicializar formulário de contato
    initContactForm();
    
    // Iniciar animações
    handleScrollAnimation();
    animateServiceCards();
    animateSteps();
    animatePortfolio();
    animateStats();
    animateContactElements();
    fadeInTitle();
    addButtonGlowEffect();
    addMouseGlowEffect();
    createAdvancedParticles();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', function() {
        handleScrollAnimation();
        handleParallax();
    });
    
    // Adicionar efeito de hover nos cards de serviços
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adicionar efeito de hover nos portfólio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            const icon = this.querySelector('.portfolio-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.portfolio-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Adicionar efeito de hover nos steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            const number = this.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const number = this.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });
    
    // Animação suave para todos os links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Ajustar para header fixo
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar efeito de loading suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    // Adicionar efeito parallax no mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Otimização de performance - debounce para scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce nas funções de scroll
window.addEventListener('scroll', debounce(handleScrollAnimation, 10));
window.addEventListener('scroll', debounce(handleParallax, 10));

// Detectar quando elementos entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos os elementos com fade-in
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Adicionar estilos CSS para as partículas avançadas dinamicamente
const advancedParticleStyles = document.createElement('style');
advancedParticleStyles.textContent = `
    @keyframes advancedFloat {
        0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(80vh) translateX(10px) scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) translateX(-10px) scale(0);
            opacity: 0;
        }
    }
    
    .advanced-particles {
        overflow: hidden;
    }
    
    /* Efeito de brilho seguindo o mouse */
    .service-card::after,
    .portfolio-item::after,
    .step::after {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .service-card:hover::after,
    .portfolio-item:hover::after,
    .step:hover::after {
        opacity: 1;
    }
    
    /* Animação de entrada para estatísticas */
    .stat-item {
        animation: slideInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(advancedParticleStyles);

document.getElementById("logoLink").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});