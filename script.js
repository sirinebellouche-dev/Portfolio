document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations with robust iOS/Safari fallback
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85);
            if (isVisible) {
                el.classList.add('active');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
        
        // Trigger immediately for elements already in the viewport
        setTimeout(revealOnScroll, 150);
    } else {
        // Fallback for older browsers / strict iOS versions
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('resize', revealOnScroll);
        setTimeout(revealOnScroll, 150);
    }

    // Floating animation for badges
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-15px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 3000 + (index * 500),
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    });
    // Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-close">&times;</div>
        <img class="lightbox-content" src="" alt="Zoomed view">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const openLightbox = (src) => {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Small delay to ensure transition is smooth
        setTimeout(() => {
            lightboxImg.src = src;
        }, 50);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Clear src after transition to avoid flicker next time
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    document.querySelectorAll('.salon-item img, .grid-item img, .mockup-shadow:not(.no-lightbox), .project-card img').forEach(img => {
        img.addEventListener('click', (e) => {
            const src = e.target.tagName === 'IMG' ? e.target.src : e.target.querySelector('img').src;
            openLightbox(src);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Image Loading Optimization
    const handleImageLoad = (img) => {
        img.classList.add('loaded');
        const container = img.closest('.mobile-screen-scroll, .imac-screen-v2, .feature-image-container');
        if (container) {
            container.style.animation = 'none';
            container.style.background = 'transparent';
        }
    };

    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
        }
    });

    // Hamburger Menu Interactive Logic
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerToggle && navLinks) {
        hamburgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerToggle.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerToggle.contains(e.target)) {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('mobile-open');
            }
        });
    }
});
