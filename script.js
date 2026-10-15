// ========================================
// KITSAMBA WRITES AFRICA - JAVASCRIPT (UPDATED)
// Consolidated initialization, null guards, menu extensions, add-story via localStorage
// ========================================

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    initializeNavigation();
    initializeSmoothScroll();
    initializeFormHandling();
    initializeAnimations();
    setActiveNavLink();
    initializeMenuExtensions();
    initializeHeroButtons();
    initializeReadMoreButtons();
    initializeSideMenuControls();
    // load dynamic sections (plays/poems) from storage if present
    loadEntriesIntoSections();
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.querySelector('.explore-btn');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }

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

        if (href === currentPage || (currentPage === '' && href === 'index.html') || (href && href.endsWith('#' + (location.hash || '').replace('#','')))) {
            // if the link points to the current page or the current hash
            if (href && href.includes('#') && location.hash && href.endsWith(location.hash)) {
                link.classList.add('active');
            } else if (href === currentPage) {
                link.classList.add('active');
            }
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // TODO: wire this to a backend or form service
    console.log('Contact Form Data:', data);
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    form.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email || !validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'info');
        return;
    }

    console.log('Newsletter Signup:', email);
    showNotification('Successfully subscribed to our newsletter!', 'success');
    form.reset();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    document.querySelectorAll('.novel-card, .section-card, .blog-card, .lifestyle-card, .mission-card, .stat-card, .beyond-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// UTILITIES
// ========================================

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
// THEME / MENU EXTENSIONS / ADD STORY
// ========================================

function initializeMenuExtensions() {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

    // Avoid double-inserting if already present
    if (document.getElementById('nav-plays-link')) return;

    // Plays link
    const playsLink = document.createElement('a');
    playsLink.className = 'nav-link';
    playsLink.id = 'nav-plays-link';
    playsLink.href = 'index.html#plays';
    playsLink.textContent = 'Plays';

    // Poems link
    const poemsLink = document.createElement('a');
    poemsLink.className = 'nav-link';
    poemsLink.id = 'nav-poems-link';
    poemsLink.href = 'index.html#poems';
    poemsLink.textContent = 'Poems';

    // Add a Story button
    const addStoryBtn = document.createElement('button');
    addStoryBtn.className = 'main-menu-button';
    addStoryBtn.id = 'add-story-btn';
    addStoryBtn.type = 'button';
    addStoryBtn.innerHTML = '<i class="fa fa-plus"></i> Add a Story';
    addStoryBtn.addEventListener('click', openAddStoryModal);

    navLinksContainer.appendChild(playsLink);
    navLinksContainer.appendChild(poemsLink);

    // put button inside a wrapper if main-menu exists, otherwise append to nav
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu) {
        mainMenu.appendChild(addStoryBtn);
    } else {
        navLinksContainer.appendChild(addStoryBtn);
    }
}

// Modal for adding stories (created on demand)
function openAddStoryModal() {
    // prevent duplicates
    if (document.getElementById('kw-add-story-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'kw-add-story-modal';
    modal.style.cssText = `position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:20000;background:rgba(0,0,0,0.6);`;

    const box = document.createElement('div');
    box.style.cssText = 'width:min(900px,94%);background:var(--card);padding:22px;border-radius:12px;border:1px solid var(--border);color:inherit;';

    box.innerHTML = `
      <h2 style="font-family:Playfair Display, serif;margin-bottom:6px;">Add a Story</h2>
      <p style="color:#aaa;margin-bottom:12px;">Submit a Play, Poem, or Story. Submissions are saved locally (preview). You can later transfer them to server or paste them manually.</p>
      <form id="kw-add-story-form">
        <div style="display:flex;gap:10px;margin-bottom:10px;">
          <select name="type" required style="padding:10px;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:#fff;">
            <option value="play">Play</option>
            <option value="poem">Poem</option>
            <option value="story">Story</option>
            <option value="novel">Novel</option>
          </select>
          <input name="title" placeholder="Title" required style="flex:1;padding:10px;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:#fff;" />
        </div>
        <div style="margin-bottom:10px;"><input name="author" placeholder="Author (optional)" style="width:100%;padding:10px;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:#fff;" /></div>
        <div style="margin-bottom:12px;"><textarea name="content" rows="8" placeholder="Write or paste your story here..." required style="width:100%;padding:12px;border-radius:8px;border:1px solid #333;background:#0f0f0f;color:#fff;font-family:inherit;"></textarea></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button type="button" id="kw-cancel-add" class="main-menu-button" style="background:transparent;">Cancel</button>
          <button type="submit" class="main-menu-button" style="background:var(--gold);color:#111;">Add Story</button>
        </div>
      </form>
    `;

    modal.appendChild(box);
    document.body.appendChild(modal);

    document.getElementById('kw-cancel-add').addEventListener('click', () => modal.remove());
    document.getElementById('kw-add-story-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const entry = {
            id: 'entry_' + Date.now(),
            type: fd.get('type'),
            title: (fd.get('title') || '').trim(),
            author: (fd.get('author') || '').trim(),
            content: (fd.get('content') || '').trim(),
            createdAt: new Date().toISOString()
        };

        saveEntry(entry);
        showNotification('Saved locally — your story appears in the chosen section.', 'success');
        modal.remove();

        // navigate to the relevant section on the current page
        if (entry.type === 'play') location.href = (location.pathname.endsWith('index.html') || location.pathname.endsWith('/') ? 'index.html' : 'index.html') + '#plays';
        else if (entry.type === 'poem') location.href = (location.pathname.endsWith('index.html') || location.pathname.endsWith('/') ? 'index.html' : 'index.html') + '#poems';
        else location.reload();
    });
}

function saveEntry(entry) {
    try {
        const raw = localStorage.getItem('kw_entries');
        const arr = raw ? JSON.parse(raw) : [];
        arr.unshift(entry);
        localStorage.setItem('kw_entries', JSON.stringify(arr));
    } catch (e) {
        console.error('Failed to save entry', e);
    }
}

function getEntries() {
    try {
        const raw = localStorage.getItem('kw_entries');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function loadEntriesIntoSections() {
    const playsContainer = document.getElementById('plays-list');
    const poemsContainer = document.getElementById('poems-list');
    const entries = getEntries();

    if (playsContainer) {
        // clear existing dynamic entries placeholder area (we keep static sample)
        const dyn = playsContainer.querySelector('.dynamic-entries');
        if (dyn) dyn.innerHTML = '';
        entries.filter(en => en.type === 'play').forEach(en => {
            appendEntryCard(en, playsContainer.querySelector('.dynamic-entries'));
        });
    }

    if (poemsContainer) {
        const dyn = poemsContainer.querySelector('.dynamic-entries');
        if (dyn) dyn.innerHTML = '';
        entries.filter(en => en.type === 'poem').forEach(en => {
            appendEntryCard(en, poemsContainer.querySelector('.dynamic-entries'));
        });
    }
}

function appendEntryCard(entry, container) {
    if (!container) return;
    const card = document.createElement('article');
    card.className = 'beyond-card';
    card.style.marginBottom = '12px';
    card.innerHTML = `
      <strong style="font-family:Playfair Display, serif;">${escapeHtml(entry.title)}</strong>
      <div style="color:#888;margin-top:6px;font-size:.95rem;">${entry.author ? 'By ' + escapeHtml(entry.author) : ''}</div>
      <p style="color:#bbb;margin-top:10px;white-space:pre-wrap;">${escapeHtml(entry.content.substring(0, 800))}${entry.content.length>800?'...':''}</p>
      <a class="read-story" href="#" data-entry-id="${entry.id}">Read more</a>
    `;
    container.appendChild(card);

    // Read more handler
    const readMore = card.querySelector('.read-story');
    readMore.addEventListener('click', (e) => {
        e.preventDefault();
        showEntryModal(entry);
    });
}

function showEntryModal(entry) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:20000;background:rgba(0,0,0,0.6);';
    modal.id = 'kw-entry-modal-' + entry.id;
    const box = document.createElement('div');
    box.style.cssText = 'width:min(900px,94%);background:var(--card);padding:22px;border-radius:12px;border:1px solid var(--border);color:inherit;max-height:80vh;overflow:auto;';
    box.innerHTML = `
      <h2 style="font-family:Playfair Display, serif;margin-bottom:6px;">${escapeHtml(entry.title)}</h2>
      <p style="color:#aaa;margin-bottom:12px;">${entry.author ? 'By ' + escapeHtml(entry.author) : ''} — ${new Date(entry.createdAt).toLocaleString()}</p>
      <div style="white-space:pre-wrap;color:#ddd;">${escapeHtml(entry.content)}</div>
      <div style="display:flex;justify-content:flex-end;margin-top:12px;"><button class="main-menu-button" id="kw-entry-close">Close</button></div>
    `;
    modal.appendChild(box);
    document.body.appendChild(modal);
    document.getElementById('kw-entry-close').addEventListener('click', () => modal.remove());
}

function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/[&<>"']/g, function (c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
}

// ========================================
// HERO BUTTONS (moved to function so can be initialized once)
// ========================================

function initializeHeroButtons() {
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
}

// ========================================
// READ MORE BUTTONS
// ========================================

function initializeReadMoreButtons() {
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function (e) {
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
}

// ========================================
// SIDE MENU CONTROL
// ========================================

function initializeSideMenuControls() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', function () {
            sideMenu.classList.add('active');
        });
    }

    // closeMenu function preserved
    window.closeMenu = function () {
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu) sideMenu.classList.remove('active');
    };
}

// ========================================
// SETTINGS PAGE: safe switchTab signature
// ========================================

function switchTab(tabName, evt) {
    // Hide all sections
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => section.classList.remove('active'));

    // Remove active class from all sidebar items
    const sidebarItems = document.querySelectorAll('.settings-sidebar li');
    sidebarItems.forEach(item => item.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(tabName);
    if (selectedSection) selectedSection.classList.add('active');

    // Add active class to clicked sidebar item (use passed event)
    if (evt && evt.target) {
        const closestLi = evt.target.closest('li');
        if (closestLi) closestLi.classList.add('active');
    }
}

// ========================================
// FINAL: small utilities
// ========================================

console.log('Kitsamba Writes Africa - Website script loaded (updated)');
