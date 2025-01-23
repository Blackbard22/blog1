document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    // const trigger = document.querySelector('.mobile-nav-trigger');
    // const mobileNav = document.querySelector('.mobile-nav');
    // const mobileNavLinks = document.querySelectorAll('.mobile-nav-links li');

    // mobileNavLinks.forEach((link, index) => {
    //     link.style.setProperty('--i', index);
    // });

    // trigger?.addEventListener('click', () => {
    //     trigger.classList.toggle('active');
    //     mobileNav.classList.toggle('active');
    // });

    // mobileNavLinks.forEach(link => {
    //     link.addEventListener('click', () => {
    //         trigger.classList.remove('active');
    //         mobileNav.classList.remove('active');
    //     });
    // });

    // document.addEventListener('click', (e) => {
    //     if (!mobileNav?.contains(e.target) && !trigger?.contains(e.target)) {
    //         trigger?.classList.remove('active');
    //         mobileNav?.classList.remove('active');
    //     }
    // });



    const trigger = document.querySelector('.mobile-nav-trigger');
    const links = document.querySelector('.mobile-nav-links');
    const consultation = document.querySelector('.mobile-consultation');
    const nav = document.querySelector('.mobile-nav');
    
    trigger.addEventListener('click', () => {
        links.classList.toggle('active');
        consultation.classList.toggle('active');
        trigger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Progress Indicator
    const progressBoxes = document.querySelectorAll('.progress-box');
    const progressLine = document.querySelector('.progress-line');
    const progressContainer = document.querySelector('.progress-container');
    const footer = document.querySelector('.footer');
    const sections = [
        document.querySelector('.about-author'),
        document.querySelector('.carousel-container'),
        document.querySelector('.grid-sections'),
        document.querySelector('.consultation-section'),
        document.querySelector('.testimonials-section'),
        document.querySelector('.contact-section')
    ];

    function updateProgress(index) {
        progressBoxes.forEach((box, i) => {
            box.classList.toggle('active', i <= index);
        });
        const progress = ((index + 1) / sections.length) * 100;
        progressLine.style.setProperty('--progress-height', `${progress}%`);
    }

    // Check if footer is in view and hide progress
    function checkFooterVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top <= window.innerHeight;
        
        if (isFooterVisible) {
            progressContainer.style.opacity = '0';
            progressContainer.style.pointerEvents = 'none';
        } else {
            progressContainer.style.opacity = '1';
            progressContainer.style.pointerEvents = 'auto';
        }
    }

    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = sections.findIndex(section => section === entry.target);
                if (index !== -1) {
                    updateProgress(index);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });

    // Observe all sections
    sections.forEach(section => {
        if (section) {
            sectionObserver.observe(section);
        }
    });

    // Add scroll event listener for footer visibility
    window.addEventListener('scroll', checkFooterVisibility);
    // Initial check for footer visibility
    checkFooterVisibility();

    // Add click handlers for progress boxes
    progressBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (sections[index]) {
                sections[index].scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Testimonials Section
    const profiles = document.querySelectorAll('.profile');
    const testimonials = document.querySelectorAll('.testimonials-section');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', () => {
            console.log('Testimonial section clicked');
        });
    });
    const testimonialContents = document.querySelectorAll('.testimonial-content');

    function switchTestimonial(profileId) {
        const selectedContent = document.querySelector(`.testimonial-content[data-id="${profileId}"]`);
        const selectedProfile = document.querySelector(`.profile[data-id="${profileId}"]`);

        if (!selectedContent || !selectedProfile) return;

        profiles.forEach(profile => profile.classList.remove('active'));
        testimonialContents.forEach(content => content.classList.remove('active'));

        selectedProfile.classList.add('active');
        selectedContent.classList.add('active');
    }

    profiles.forEach(profile => {
        console.log(profile);
        profile.addEventListener('click', () => {
            console.log('Clicked:', profile); 
            console.log('Profile ID:', profile.getAttribute('data-id'));    
            const profileId = profile.getAttribute('data-id');
            switchTestimonial(profileId);
        });
    }); 

    // Initialize first testimonial
    if (profiles.length > 0) {
        const firstProfileId = profiles[0].getAttribute('data-id');
        switchTestimonial(firstProfileId);
    }

    // Navbar Scroll Animation
    let isAnimating = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        clearTimeout(scrollTimeout);

        if (currentScrollY > lastScrollY && currentScrollY > 200 && !isAnimating) {
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
        } else if (currentScrollY < 200 && isAnimating) {
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
            if (currentScrollY < 200) {
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

    // Initialize progress container
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

    // Update progress on page load
    const updateInitialProgress = () => {
        let maxVisibleIndex = -1;
        sections.forEach((section, index) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight * 0.7;
                if (isVisible) {
                    maxVisibleIndex = index;
                }
            }
        });
        if (maxVisibleIndex >= 0) {
            updateProgress(maxVisibleIndex);
        }
    };

    // Call on load and scroll
    updateInitialProgress();
    window.addEventListener('scroll', updateInitialProgress);

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

    // Carousel Implementation
    class HDCarousel {
        version = 0.1;
        el = null;
        items = [];
        size = 3;
        activeClass = false;
        gap = 8;
        width = 0;

        constructor(el, settings = {}) {
            console.log("HDCarousel v" + this.version + " init");

            if (Object.keys(settings).length > 0) {
                if (settings.gap) {
                    this.gap = parseInt(settings.gap);
                }
                if (settings.size) {
                    this.size = parseInt(settings.size);
                }
                if (settings.activeClass) {
                    this.activeClass = true;
                }
            }
            this.el = el;
            this.init();
        }

        async init() {
            await this.createMarkup();

            // set nav listeners
            const nav = document.querySelectorAll('.carousel-controls .carousel-button');
            nav.forEach(button => {
                button.addEventListener("click", () => this.move(button));
            });

            await this.setMinItems();
            this.width = await this.getSize();
            this.el.style.height = await this.getHeight();

            await this.clone("prev");
            await this.build();
        }

        async createMarkup() {
            // Add necessary classes and get items
            this.el.classList.add("hdcarousel");
            this.items = this.el.getElementsByClassName("carousel-slide");
            
            // Add hdcarousel_item class to slides
            for (let item of this.items) {
                item.classList.add("hdcarousel_item");
            }
        }

        async setMinItems() {
            const minItems = this.size + 2;
            if (this.items.length < minItems) {
                let itemsLength = this.items.length;
                for (let i = 0; i < itemsLength; i++) {
                    let c = this.items[i].cloneNode(true);
                    this.el.append(c);
                }
            }

            if (this.items.length < minItems) {
                await this.setMinItems();
            }
        }

        async getSize() {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                return 180; // Fixed width for mobile
            }
            let w = this.el.clientWidth;
            w = (w / this.size) - this.gap;
            return Math.min(w, 400); // Cap desktop width at 400px
        }

        async getHeight() {
            let maxHeight = 0;
            for (let i = 0; i < this.items.length; i++) {
                // Get the actual content height including all children
                const card = this.items[i].querySelector('.about-card');
                if (card) {
                    const cardHeight = card.offsetHeight;
                    maxHeight = Math.max(maxHeight, cardHeight);
                }
            }
            // Add some padding to ensure full visibility
            return (maxHeight + 40) + "px";
        }

        async build() {
            const isMobile = window.innerWidth <= 768;
            let l = this.width * -1;
            for (let i = 0; i < this.items.length; i++) {
                const slideWidth = isMobile ? 180 : this.width;
                this.items[i].style.width = slideWidth + "px";
                this.items[i].style.left = l + "px";
                l = l + slideWidth;
                if (i > 0) {
                    let g = this.gap / this.size;
                    l = l + this.gap + g;
                }
            }

            // Update height after building
            this.el.style.height = await this.getHeight();

            if (this.activeClass) {
                this.setActive();
            }
        }

        async clone(pos = "next") {
            let item = null;
            if (pos === "next") {
                item = this.items[0];
            } else {
                item = this.items[this.items.length - 1];
            }

            let c = item.cloneNode(true);

            if (pos === "next") {
                this.el.append(c);
            } else {
                this.el.prepend(c);
            }

            item.remove();
        }

        async move(el) {
            let pos = el.classList.contains("next") ? "next" : "prev";
            if (pos === "next") {
                this.next();
            } else {
                this.prev();
            }
        }

        async next() {
            await this.clone("next");
            await this.build();
        }

        async prev() {
            await this.clone("prev");
            await this.build();
        }

        setActive() {
            let m = Math.round(this.size / 2);
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove("hdcarousel_item_active");
                if (i === m) {
                    this.items[i].classList.add("hdcarousel_item_active");
                }
            }
        }
    }

  
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const isMobile = window.innerWidth <= 768;
        new HDCarousel(carouselTrack, { 
            activeClass: true,
            size: isMobile ? 2 : 3,
            gap: isMobile ? 0 : 8
        });
    }

    // Comment Section Functionality
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const commentText = document.getElementById('comment').value;

            // Create new comment
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';

            // Get current date in Arabic format
            const date = new Date();
            const arabicDate = new Intl.DateTimeFormat('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);

            // Set comment HTML
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <h3>${name}</h3>
                    <span class="comment-date">${arabicDate}</span>
                </div>
                <p class="comment-text">${commentText}</p>
            `;

            // Add new comment to the top of the list
            commentsList.insertBefore(commentDiv, commentsList.firstChild);

            // Clear form
            commentForm.reset();

            // Show success message (optional)
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'تم إضافة تعليقك بنجاح';
            successMessage.style.cssText = `
                color: green;
                text-align: right;
                margin-top: 1rem;
                padding: 0.5rem;
            `;
            commentForm.appendChild(successMessage);

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

   
});












