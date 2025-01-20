document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const trigger = document.querySelector('.mobile-nav-trigger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li');

    mobileNavLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });

    trigger?.addEventListener('click', () => {
        trigger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            trigger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav?.contains(e.target) && !trigger?.contains(e.target)) {
            trigger?.classList.remove('active');
            mobileNav?.classList.remove('active');
        }
    });

    // Navbar Scroll Animation
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.set(".progress-container", {
        x: -100,
        opacity: 0
    });

    ScrollTrigger.create({
        trigger: ".about-section",
        start: "top center",
        onEnter: () => {
            gsap.to(".progress-container", {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            gsap.to(".progress-container", {
                x: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });
        }
    });
    
    let isAnimating = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        clearTimeout(scrollTimeout);

        if (currentScrollY > lastScrollY && currentScrollY > 100 && !isAnimating) {
            isAnimating = true;

            gsap.to(".nav-links li:first-child", {
                x: "-30%",
                opacity: 0,
                duration: 0.3
            });

            gsap.to([".logo", ".nav-links li:nth-child(2)", ".nav-links li:nth-child(3)"], {
                x: "30%",
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(".hero", {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        } else if (currentScrollY < 100 && isAnimating) {
            gsap.to([
                ".nav-links li:first-child",
                ".logo",
                ".nav-links li:nth-child(2)",
                ".nav-links li:nth-child(3)",
                ".hero"
            ], {
                x: "0%",
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                    isAnimating = false;
                }
            });
        }

        lastScrollY = currentScrollY;
        scrollTimeout = setTimeout(() => {
            if (currentScrollY < 400) {
                isAnimating = false;
            }
        }, 300);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;

            });
            ticking = true;
        }
    });

    // Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const slides = track ? Array.from(track.children) : [];
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = dotsNav ? Array.from(dotsNav.children) : [];

    function initializeCarousel() {
        if (!track || window.innerWidth > 1024) return;

        let isScrolling;
        const slideWidth = slides[0].offsetWidth + 20;
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        function updateDots() {
            const scrollPosition = track.scrollLeft;
            const activeIndex = Math.round(scrollPosition / slideWidth);
            const boundedIndex = Math.min(Math.max(0, activeIndex), dots.length - 1);
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === boundedIndex);
            });
        }

        function scrollToSlide(index) {
            const targetScroll = Math.min(slideWidth * index, maxScroll);
            track.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }

        nextButton?.addEventListener('click', () => {
            const currentScroll = track.scrollLeft;
            const nextScroll = Math.min(currentScroll + slideWidth, maxScroll);
            
            track.scrollTo({
                left: nextScroll === maxScroll ? 0 : nextScroll,
                behavior: 'smooth'
            });
        });

        prevButton?.addEventListener('click', () => {
            const currentScroll = track.scrollLeft;
            const prevScroll = Math.max(currentScroll - slideWidth, 0);
            
            track.scrollTo({
                left: currentScroll === 0 ? maxScroll : prevScroll,
                behavior: 'smooth'
            });
        });

        track.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(updateDots, 50);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => scrollToSlide(index));
        });

        track.addEventListener('scrollend', updateDots);
        dots[0]?.classList.add('active');

        // Touch events
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    nextButton?.click();
                } else {
                    prevButton?.click();
                }
            }
        });
    }

    initializeCarousel();
    window.addEventListener('resize', initializeCarousel);

    // Grid Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.grid-item, .grid-separator-vertical, .grid-separator-horizontal')
        .forEach(element => observer.observe(element));

    // Testimonials
    const profiles = document.querySelectorAll('.profile');
    const testimonialContents = document.querySelectorAll('.testimonial-content');

    profiles.forEach(profile => {
        profile.addEventListener('click', () => {
            profiles.forEach(p => p.classList.remove('active'));
            testimonialContents.forEach(content => content.classList.remove('active'));

            profile.classList.add('active');
            const contentId = profile.getAttribute('data-id');
            document.querySelector(`.testimonial-content[data-id="${contentId}"]`)?.classList.add('active');
        });
    });

    // Progress Indicator
    const progressBoxes = document.querySelectorAll('.progress-box');
    const progressLine = document.querySelector('.progress-line');
    const sections = [
        // document.querySelector('.hero-container'),
        document.querySelector('.about-section'),
        document.querySelector('.grid-sections'),
        document.querySelector('.consultation-section'),
        document.querySelector('.creative-section'),
        document.querySelector('.testimonials-section')
    ];

    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = sections.indexOf(entry.target);
            if (index !== -1 && entry.isIntersecting) {
                // Update progress boxes
                progressBoxes.forEach((box, i) => {
                    box.classList.toggle('active', i === index);
                });
                // Update progress line height
                const progress = ((index + 1) / sections.length) * 100;
                progressLine.style.setProperty('--progress-height', `${progress}%`);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all sections
    sections.forEach(section => {
        if (section) sectionObserver.observe(section);
    });

    // Add click handlers for progress boxes
    progressBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            sections[index]?.scrollIntoView({ behavior: 'smooth' });
            console.log(index);
        });
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, timelineObserverOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});





