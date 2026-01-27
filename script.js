// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION ====================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Observe project cards with stagger effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });

    // Observe skill cards with stagger effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(card);
    });

    // ==================== ACTIVE NAVIGATION LINK ====================
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');
        
        blobs.forEach(function(blob, index) {
            const speed = (index + 1) * 0.05;
            const yPos = scrolled * speed;
            blob.style.transform = 'translateY(' + yPos + 'px)';
        });
    });

    // ==================== PROJECT CARDS HOVER ====================
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==================== EDUCATION SCORE ANIMATION ====================
    
    // Animate score numbers on scroll
    const scoreObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateScore = (entries, scoreObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scoreNumber = entry.target.querySelector('.score-number');
                const target = parseFloat(scoreNumber.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    scoreNumber.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                }, 30);
                
                // Animate progress circle
                const progressCircle = entry.target.querySelector('.score-progress');
                if (progressCircle) {
                    const percentage = parseFloat(progressCircle.getAttribute('data-percentage'));
                    const circumference = 339.292;
                    const offset = circumference - (percentage / 100) * circumference;
                    progressCircle.style.strokeDashoffset = offset;
                }
                
                scoreObserver.unobserve(entry.target);
            }
        });
    };

    const scoreObserver = new IntersectionObserver(animateScore, scoreObserverOptions);

    // Observe education cards
    document.querySelectorAll('.education-card-box').forEach(card => {
        scoreObserver.observe(card);
    });

    // ==================== PARTICLE EFFECT ON MOUSE MOVE ====================
    let particles = [];

    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Create particle occasionally
        if (Math.random() > 0.97 && particles.length < 30) {
            createParticle(mouseX, mouseY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(192, 132, 252, 0.8)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 1.5s ease-out';
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // Animate particle
        setTimeout(function() {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.opacity = '0';
            particle.style.transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(0)';
        }, 10);
        
        // Remove particle
        setTimeout(function() {
            particle.remove();
            particles = particles.filter(function(p) {
                return p !== particle;
            });
        }, 1500);
    }

    // ==================== LAZY LOAD IMAGES ====================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ==================== HERO ELEMENTS ANIMATION ====================
    const heroElements = document.querySelectorAll('.hero-text, .photo-container');
    heroElements.forEach(function(element, index) {
        setTimeout(function() {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });

    // ==================== BUTTON ANIMATIONS ====================
    const buttons = document.querySelectorAll('.btn');
    
    // Click animation
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(function() {
                btn.style.transform = '';
            }, 150);
        });
    });

    // Ripple effect
    buttons.forEach(function(button) {
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });

    // ==================== CONSOLE EASTER EGGS ====================
    console.log('%c👋 Hello Developer!', 'color: #a855f7; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%c✨ Thanks for checking out the code!', 'color: #ec4899; font-size: 16px;');
    console.log('%c💼 Interested in working together? Get in touch!', 'color: #3b82f6; font-size: 14px;');
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✅ Education score animations loaded!');
});

document.addEventListener('DOMContentLoaded', function() {
    
    // ... your existing code (navigation, smooth scrolling, etc.) ...
    
    // ==================== EDUCATION SCORE ANIMATION ====================
    // ... your education animation code ...
    
    // ==================== ABOUT SECTION STATS ANIMATION ====================
    // Paste the corrected code here
    const statObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(function(stat) {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + '+';
                    }, 30);
                });
                
                statObserver.unobserve(entry.target);
            }
        });
    }, statObserverOptions);

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statObserver.observe(aboutStats);
    }
    
    // ... rest of your code ...
    
}); // End of DOMContentLoaded

// Add parallax effect to image on scroll
document.addEventListener('DOMContentLoaded', function() {
    const splitImage = document.querySelector('.split-image');
    const splitLeft = document.querySelector('.split-left');
    
    if (splitImage && splitLeft) {
        window.addEventListener('scroll', function() {
            const rect = splitLeft.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            // Only apply parallax when section is in view
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (window.innerHeight - rect.top) * 0.1;
                splitImage.style.transform = `translateY(${offset}px) scale(1.1)`;
            }
        });
    }
});