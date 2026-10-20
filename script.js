// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.content-item, .service-card, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
        
        // Reset form
        contactForm.reset();
    });
}

// Service items animation on scroll
const serviceItems = document.querySelectorAll('.service-item');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

serviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    serviceObserver.observe(item);
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = element.textContent.replace(/\D/g, '');
    const prefix = element.textContent.replace(/\d/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + target;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current);
        }
    }, 16);
}

// Video play button interaction
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // Here you would typically open a video modal or play a video
        alert('Funcionalidade de vídeo será implementada aqui');
    });
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for cover cityscape image - Mouse movement
const coverCityscape = document.querySelector('.cover-cityscape');
if (coverCityscape) {
    coverCityscape.addEventListener('mousemove', (e) => {
        const rect = coverCityscape.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const moveX = (x - centerX) / centerX;
        const moveY = (y - centerY) / centerY;
        
        // Apply parallax effect (max 5% movement)
        const moveXPercent = moveX * 5;
        const moveYPercent = moveY * 5;
        
        coverCityscape.style.backgroundPosition = `${50 + moveXPercent}% ${50 + moveYPercent}%`;
    });
    
    // Reset position when mouse leaves
    coverCityscape.addEventListener('mouseleave', () => {
        coverCityscape.style.backgroundPosition = 'center center';
    });
}

// Parallax effect for cover cityscape image - Scroll animation (Improved)
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) return;
    const scrolled = window.pageYOffset;
    const coverTopSection = document.querySelector('.cover-top-section');
    
    if (coverCityscape && coverTopSection) {
        const sectionTop = coverTopSection.offsetTop;
        const sectionHeight = coverTopSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate if section is in viewport
        if (scrolled < sectionTop + sectionHeight && scrolled + windowHeight > sectionTop) {
            // Parallax effect: move background slower than scroll
            const parallaxSpeed = 0.5;
            const yPos = -(scrolled - sectionTop) * parallaxSpeed;
            
            // Apply smooth transform
            coverCityscape.style.transform = `translateY(${yPos}px)`;
            
            // Optional: Scale effect on scroll
            const scale = 1 + (scrolled - sectionTop) * 0.0002;
            coverCityscape.style.transform += ` scale(${Math.max(1, Math.min(1.1, scale))})`;
        }
    }
}, { passive: true });

// ============================================
// EFEITOS VISUAIS PROFISSIONAIS
// ============================================

// Scroll Reveal - Professional Implementation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay for staggered animation
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize reveal animations with staggered delays
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal classes to elements with different animation types
    const revealElements = document.querySelectorAll('.content-item, .service-card, .stat-item, .what-we-do-card, .about-image-container');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Section titles with zoom effect
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((el, index) => {
        el.classList.add('reveal-zoom');
        revealObserver.observe(el);
    });

    // Add reveal-fade to labels
    const labels = document.querySelectorAll('.section-label, .services-label');
    labels.forEach(el => {
        el.classList.add('reveal-fade');
        revealObserver.observe(el);
    });

    // Alternate slide animations for cards
    const cards = document.querySelectorAll('.what-we-do-card');
    cards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('reveal-slide-left');
        } else {
            card.classList.add('reveal-slide-right');
        }
        revealObserver.observe(card);
    });
});

// 3D Card Effect with Mouse Tracking (Enhanced)
function init3DCards() {
    const cards3D = document.querySelectorAll('.what-we-do-card, .service-card, .stat-item');
    
    cards3D.forEach(card => {
        card.classList.add('card-3d');
        
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return; // Skip on mobile
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position (max 5 degrees)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            // Apply 3D transform
            card.style.transform = `perspective(${1000}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// Enhanced Parallax for Multiple Layers (Professional)
function initParallaxLayers() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Only animate if element is in viewport
            if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
                const speed = 0.2 + (index * 0.05);
                const yPos = (scrolled - elementTop + windowHeight) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Glow Effect for Buttons
function initGlowButtons() {
    const glowButtons = document.querySelectorAll('.btn-agendar, .btn-nav, .btn-all-services');
    glowButtons.forEach(btn => {
        btn.classList.add('glow-effect', 'btn-micro');
    });
}

// Initialize all effects
window.addEventListener('load', () => {
    init3DCards();
    initParallaxLayers();
    initGlowButtons();
});

// ============================================
// SERVIÇOS - SISTEMA DE ABAS E CONTEÚDO
// ============================================

const portfolioTabs = document.querySelectorAll('.portfolio-tab');
const serviceBlocks = document.querySelectorAll('.service-block');

// Função para mostrar/esconder blocos de serviço
function showService(category) {
    // Remover active de todos os blocos
    serviceBlocks.forEach(block => {
        block.classList.remove('active');
    });
    
    // Encontrar e mostrar o bloco correspondente
    const targetBlock = document.querySelector(`.service-block[data-category="${category}"]`);
    if (targetBlock) {
        // Pequeno delay para animação suave
        setTimeout(() => {
            targetBlock.classList.add('active');
        }, 50);
    }
}

// Event listeners para as abas
portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover active de todas as abas
        portfolioTabs.forEach(t => t.classList.remove('active'));
        
        // Adicionar active na aba clicada
        tab.classList.add('active');
        
        // Mostrar conteúdo do serviço
        const category = tab.getAttribute('data-category');
        showService(category);
    });
});

// Inicializar mostrando o primeiro serviço (design)
if (serviceBlocks.length > 0) {
    showService('design');
}

// Service slider interaction (optional enhancement)
const serviceSlider = document.querySelector('.services-slider');
if (serviceSlider) {
    let currentIndex = 0;
    const items = serviceSlider.querySelectorAll('.service-item:not(:has(/))');
    
    // Auto-rotate active service (optional)
    // setInterval(() => {
    //     items.forEach(item => item.classList.remove('active'));
    //     currentIndex = (currentIndex + 2) % items.length;
    //     if (items[currentIndex]) {
    //         items[currentIndex].classList.add('active');
    //     }
    // }, 3000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroCta.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 400);
    }
});

// ============================================
// CARROSSEL DE BANNERS (2 instâncias)
// ============================================
function initBannerCarousel(root) {
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const prev = root.querySelector('.carousel-prev');
    const next = root.querySelector('.carousel-next');
    const dotsWrap = root.querySelector('.carousel-dots');
    const track = root.querySelector('.carousel-track');

    if (!slides.length || !prev || !next || !dotsWrap || !track) return;

    const visible = Math.max(1, parseInt(root.dataset.visible || '1', 10));
    const style = (root.dataset.style || '').toLowerCase();
    const maxIndex = Math.max(0, slides.length - visible);
    let index = 0;

    dotsWrap.innerHTML = '';
    const dotCount = style === 'nft' ? slides.length : Math.max(1, maxIndex + 1);
    const dots = Array.from({ length: dotCount }).map((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'carousel-dot' + (i === index ? ' is-active' : '');
        b.setAttribute('aria-label', `Ir para a posição ${i + 1}`);
        b.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(b);
        return b;
    });

    function render() {
        if (style === 'nft') {
            slides.forEach((s) => {
                s.classList.remove('is-active', 'is-near', 'is-far', 'is-left', 'is-right');
            });

            const set = (i, cls) => {
                const el = slides[i];
                if (!el) return;
                cls.split(' ').forEach(c => el.classList.add(c));
            };

            set(index, 'is-active');
            set((index - 1 + slides.length) % slides.length, 'is-near is-left');
            set((index + 1) % slides.length, 'is-near is-right');

            if (slides.length >= 5) {
                set((index - 2 + slides.length) % slides.length, 'is-far is-left');
                set((index + 2) % slides.length, 'is-far is-right');
            }
        } else {
            const x = (index * 100) / visible;
            track.style.transform = `translateX(-${x}%)`;
        }
        dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
        if (style === 'nft') {
            const len = slides.length;
            index = (i + len) % len;
        } else {
            if (i < 0) index = maxIndex;
            else if (i > maxIndex) index = 0;
            else index = i;
        }
        render();
    }

    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));

    // autoplay suave (pausa no hover)
    let timer = null;
    function start() {
        if (style === 'nft') {
            if (slides.length < 2) return;
        } else {
            if (slides.length <= visible) return;
        }
        stop();
        timer = window.setInterval(() => goTo(index + 1), 4500);
    }
    function stop() {
        if (timer) window.clearInterval(timer);
        timer = null;
    }

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    start();
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.banner-carousel').forEach(initBannerCarousel);
});