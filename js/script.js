// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio Loaded Successfully!');
    
    // Hide loader immediately
    hideLoader();
    
    // Initialize all features
    initTyping();
    initSmoothScroll();
    initNavbar();
    initScrollReveal();
    initCounters();
    initSkills();
    initMobileMenu();
});

// Hide loader
function hideLoader() {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Typing Animation
function initTyping() {
    const texts = ['Future Data Analyst', 'Full Stack Developer', 'Python Programmer', 'AI Enthusiast'];
    let index = 0;
    let i = 0;
    let forward = true;
    
    const typedText = document.getElementById('typed-text');
    const cursor = document.querySelector('.cursor');
    
    function typeWriter() {
        const currentText = texts[index];
        
        if (forward) {
            typedText.textContent = currentText.slice(0, ++i);
        } else {
            typedText.textContent = currentText.slice(0, --i);
        }
        
        if (i === currentText.length) {
            setTimeout(() => forward = false, 1500);
        }
        
        if (i === 0) {
            forward = true;
            index = (index + 1) % texts.length;
        }
        
        setTimeout(typeWriter, forward ? 100 : 50);
    }
    
    typeWriter();
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Navbar Active Link
function initNavbar() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.section, .project-card, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.textContent = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                updateCount();
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Skill Bars
function initSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
        });
    });
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) observer.observe(skillsSection);
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}