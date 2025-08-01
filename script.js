// Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth reveal animations on scroll
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

    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add click analytics (optional)
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const projectName = this.querySelector('h3').textContent;
            console.log(`Projeto clicado: ${projectName}`);
            
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Profile image interaction
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    }

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Dynamic greeting based on time
    function updateGreeting() {
        const hour = new Date().getHours();
        const profileDescription = document.querySelector('.profile-description');
        
        if (profileDescription) {
            let greeting = '';
            if (hour < 12) {
                greeting = 'Bom dia! ';
            } else if (hour < 18) {
                greeting = 'Boa tarde! ';
            } else {
                greeting = 'Boa noite! ';
            }
            
            const originalText = 'Criando experiências digitais incríveis com tecnologias modernas. Especialista em desenvolvimento web, Design UI e UX.';
            profileDescription.textContent = greeting + originalText;
        }
    }

    updateGreeting();

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const elements = document.querySelectorAll('.profile-header, .project-card, .footer');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // Performance optimization: Lazy load profile image
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load if not already loaded
                    imageObserver.unobserve(img);
                }
            });
        });
        
        imageObserver.observe(profileImage);
    }

    // Add subtle parallax effect to background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only add parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }

    // Add copy email functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copiado para a área de transferência!');
                });
            } else {
                // Fallback for older browsers
                window.open(this.href);
            }
        });
    }

    // Simple toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4f46e5;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Add theme detection and adaptation
    function detectTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-theme', prefersDark);
    }

    detectTheme();
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

    // Add error handling for external links
    projectCards.forEach(card => {
        card.addEventListener('error', function() {
            console.warn('Erro ao carregar projeto:', this.href);
        });
    });

    // Performance: Preload critical project pages
    const criticalProjects = ['https://personalbriefing.netlify.app', 'https://minhaloja-online.netlify.app'];
    criticalProjects.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });

    console.log('Portfolio carregado com sucesso! 🚀');
});

