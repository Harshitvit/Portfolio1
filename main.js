// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth scroll function
const smoothScroll = (target, offset = 70) => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: target,
            offsetY: offset
        },
        ease: "power3.inOut"
    });
};

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme change
        gsap.to('body', {
            backgroundColor: getComputedStyle(document.documentElement)
                .getPropertyValue('--background-color'),
            color: getComputedStyle(document.documentElement)
                .getPropertyValue('--text-color'),
            duration: 0.3
        });
        
        // Animate other elements that need color transition
        gsap.to(['.project', '.skill-category'], {
            backgroundColor: getComputedStyle(document.documentElement)
                .getPropertyValue('--background-color'),
            boxShadow: `0 4px 6px ${getComputedStyle(document.documentElement)
                .getPropertyValue('--shadow-color')}`,
            duration: 0.3
        });
    });

    // Hero section animations
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" }});
    heroTimeline
        .from('.hero h1', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            delay: 0.2
        })
        .from('.hero .subtitle', {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.8")
        .from('.hero .intro', {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.8");

    // Navigation animation
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    // Projects section animation
    gsap.utils.toArray('.project').forEach((project, i) => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: "top bottom-=50",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });

    // Skills animation
    const skillCategories = gsap.utils.toArray('.skill-category');
    skillCategories.forEach((category, i) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // About section animation
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-content',
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    // Achievements animation
    const achievements = gsap.utils.toArray('.achievements li');
    achievements.forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Contact section animation
    const contactTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    contactTimeline
        .from('.contact h2', {
            y: 30,
            opacity: 0,
            duration: 0.6
        })
        .from('.contact-info', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.3")
        .from('.social-links a', {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1
        }, "-=0.3");

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            gsap.to(header, {
                yPercent: -100,
                duration: 0.3,
                ease: "power3.inOut"
            });
        } else {
            gsap.to(header, {
                yPercent: 0,
                duration: 0.3,
                ease: "power3.inOut"
            });
        }
        
        lastScroll = currentScroll;
    });

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0
    });

    let cursorVisible = false;
    let cursorEnlarged = false;

    const onMouseMove = (e) => {
        if (!cursorVisible) {
            gsap.to(cursor, {
                opacity: 1,
                duration: 0.3
            });
            cursorVisible = true;
        }
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    };

    const onMouseOut = (e) => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
        cursorVisible = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3
            });
            cursorEnlarged = true;
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
            cursorEnlarged = false;
        });
    });
}); 