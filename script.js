document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

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
});
