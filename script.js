// ========================================
// KITSAMBA WRITES AFRICA - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormHandling();
    initializeAnimations();
    setActiveNavLink();
});

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.querySelector('.explore-btn');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Explore button functionality
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'novels.html';
        });
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the form data to a server
    console.log('Contact Form Data:', data);

    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');

    // Reset form
    this.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    console.log('Newsletter Signup:', email);

    // Show success message
    showNotification('Successfully subscribed to our newsletter!', 'success');

    // Reset form
    this.reset();
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#d4af37' : '#666'};
        color: ${type === 'success' ? '#1a1a1a' : '#e8e8e8'};
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// ANIMATIONS
// ========================================

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.novel-card, .section-card, .blog-card, .lifestyle-card, .mission-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ADD CSS ANIMATIONS
// ========================================

const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    .notification {
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    }

    /* Mobile Navigation Enhancement */
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--dark-secondary);
        border-bottom: 2px solid var(--primary-color);
        z-index: 999;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// HERO BUTTON FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const exploreStoriesBtn = document.querySelector('.explore-stories-btn');
    const learnMoreBtn = document.querySelector('.learn-more-btn');

    if (exploreStoriesBtn) {
        exploreStoriesBtn.addEventListener('click', () => {
            window.location.href = 'novels.html';
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            window.location.href = 'about.html';
        });
    }
});

// ========================================
// READ MORE BUTTONS
// ========================================

document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If it's an internal page link, allow navigation
        if (href && href !== '#') {
            return;
        }
        
        // Otherwise, show a placeholder message
        e.preventDefault();
        showNotification('This feature will be available soon!', 'info');
    });
});

// ========================================
// SETTINGS PAGE FUNCTIONALITY
// ========================================

function switchTab(tabName) {
    // Hide all sections
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all sidebar items
    const sidebarItems = document.querySelectorAll('.settings-sidebar li');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(tabName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked sidebar item
    if (event && event.target) {
        const closestLi = event.target.closest('li');
        if (closestLi) {
            closestLi.classList.add('active');
        }
    }
}

// ========================================
// BLOG SEARCH & FILTER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput) {
        searchInput.addEventListener('keyup', filterBlogPosts);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', filterBlogPosts);
    }

    function filterBlogPosts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = filterSelect ? filterSelect.value : '';

        blogCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.blog-category')?.textContent.toLowerCase() || '';

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !selectedCategory || category.includes(selectedCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});

console.log('Kitsamba Writes Africa - Website loaded successfully!');
// SIDE MENU CONTROL

document.addEventListener("DOMContentLoaded", function(){

    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");

    if(menuToggle && sideMenu){

        menuToggle.addEventListener("click", function(){

            sideMenu.classList.add("active");

        });

    }

});


function closeMenu(){

    const sideMenu = document.getElementById("sideMenu");

    if(sideMenu){

        sideMenu.classList.remove("active");

    }

}

// ALL PAGES DROPDOWN

const pagesBtn = document.getElementById("pagesBtn");

const pagesDropdown = document.getElementById("pagesDropdown");


pagesBtn.addEventListener("click", function(){

    pagesDropdown.classList.toggle("active");

});


// Close dropdown when clicking outside

document.addEventListener("click", function(event){

    if(!pagesBtn.contains(event.target) && !pagesDropdown.contains(event.target)){

        pagesDropdown.classList.remove("active");

    }

});
