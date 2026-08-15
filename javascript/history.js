document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // =====================================================
    // 1. SET CURRENT YEAR IN FOOTER
    // =====================================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =====================================================
    // 2. SEARCH FORM FUNCTIONALITY
    // =====================================================
    const searchForm = document.querySelector('form.d-flex[role="search"]');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="search"]');
        const searchButton = searchForm.querySelector('button[type="submit"]');
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput ? searchInput.value.trim() : '';
            
            if (query === '') {
                showAlert('Please enter a search term.', 'warning');
                searchInput.focus();
            } else {
                showAlert('Searching for: "' + query + '" in History & Origin', 'info');
                searchInput.value = '';
            }
        });

        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchForm.dispatchEvent(new Event('submit'));
                }
            });
        }
    }

    // =====================================================
    // 3. LOGIN BUTTON FUNCTIONALITY
    // =====================================================
    const loginBtn = document.querySelector('.btn-primary:has(.bi-person-circle)');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showAlert('Redirecting to login page...', 'primary');
        });
    }

    // =====================================================
    // 4. NEWSLETTER SUBSCRIPTION
    // =====================================================
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const subscribeBtn = newsletterForm.querySelector('button[type="button"]');
        
        if (subscribeBtn) {
            subscribeBtn.type = 'submit';
        }

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                showAlert('Please enter your email address.', 'warning');
                emailInput.focus();
            } else if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                emailInput.focus();
                emailInput.select();
            } else {
                showAlert('Thank you for subscribing with: ' + email, 'success');
                emailInput.value = '';
            }
        });
    }

    // =====================================================
    // 5. NAVIGATION - Set active link based on current page
    // =====================================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.disabled)');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
        
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // =====================================================
    // 6. DROPDOWN ITEMS
    // =====================================================
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            showAlert('Action: "' + action + '" clicked', 'info');
        });
    });

    // =====================================================
    // 7. DISABLED LINK
    // =====================================================
    const disabledLink = document.querySelector('.nav-link.disabled');
    if (disabledLink) {
        disabledLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('This link is currently disabled.', 'secondary');
        });
    }

    // =====================================================
    // 8. SOCIAL ICONS
    // =====================================================
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const iconClass = this.querySelector('i')?.className || '';
            let platform = 'social media';
            
            if (iconClass.includes('twitter')) platform = 'Twitter/X';
            else if (iconClass.includes('facebook')) platform = 'Facebook';
            else if (iconClass.includes('github')) platform = 'GitHub';
            else if (iconClass.includes('instagram')) platform = 'Instagram';
            
            showAlert('Opening ' + platform + ' page...', 'primary');
        });
    });

    // =====================================================
    // 9. FOOTER QUICK LINKS
    // =====================================================
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                showAlert('Page under construction: ' + this.textContent.trim(), 'warning');
            } else {
                showAlert('Navigating to: ' + this.textContent.trim(), 'info');
            }
        });
    });

    // =====================================================
    // 10. RESOURCES LINKS
    // =====================================================
    const resourceLinks = document.querySelectorAll('.col-md-3 .footer-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim();
            showAlert('📄 ' + page + ' page - Coming soon!', 'info');
        });
    });

    // =====================================================
    // 11. "LEARN MORE" BUTTON
    // =====================================================
    const learnMoreLink = document.querySelector('.learn a');
    if (learnMoreLink) {
        learnMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('📖 Loading About Us page...', 'info');
            // Uncomment for actual navigation:
            // window.location.href = this.getAttribute('href');
        });
    }

    // =====================================================
    // 12. CONTACT LINK
    // =====================================================
    const contactLink = document.querySelector('.contact a');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('📧 Opening Contact page...', 'info');
            // Uncomment for actual navigation:
            // window.location.href = this.getAttribute('href');
        });
    }

    // =====================================================
    // 13. BRAND LOGO CLICK
    // =====================================================
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('🏠 Returning to Home page...', 'primary');
            // Uncomment for actual navigation:
            // window.location.href = 'index.html';
        });
    }

    // =====================================================
    // 14. SCROLL TO TOP BUTTON (Dynamic Creation)
    // =====================================================
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #0a58ca;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
        opacity: 0.8;
    `;
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
        this.style.transform = 'scale(1)';
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // =====================================================
    // 15. SECTION HIGHLIGHT ON SCROLL (Intersection Observer)
    // =====================================================
    const sections = document.querySelectorAll('.about, .services, .origin, .egbema, .nze-obi, .tradition, .modern, .socio, .culture, .masquerade, .economy, .background');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // =====================================================
    // 16. TABLE OF CONTENTS / NAVIGATION HIGHLIGHT
    // =====================================================
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    headings.forEach(heading => {
        // Add smooth scroll to internal links if any
        if (heading.id) {
            const link = document.querySelector(`a[href="#${heading.id}"]`);
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }
    });

    // =====================================================
    // 17. KEYBOARD SHORTCUTS
    // =====================================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+S - Focus search
        if (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
                showAlert('🔍 Search box focused', 'info');
            }
        }
        
        // Ctrl+Shift+H - Go to History (current page)
        if (e.ctrlKey && e.shiftKey && (e.key === 'h' || e.key === 'H')) {
            e.preventDefault();
            showAlert('📜 You are on the History page', 'primary');
        }

        // Escape key - Close alerts
        if (e.key === 'Escape') {
            const alerts = document.querySelectorAll('#alert-container .alert');
            if (alerts.length > 0) {
                const lastAlert = alerts[alerts.length - 1];
                lastAlert.classList.remove('show');
                setTimeout(() => lastAlert.remove(), 300);
            }
        }
    });

    // =====================================================
    // 18. CONTENT SEARCH (Client-side search within page)
    // =====================================================
    // This allows users to search within the page content
    const contentSearch = document.createElement('div');
    contentSearch.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: none;
        max-width: 300px;
        width: 100%;
    `;
    contentSearch.innerHTML = `
        <h6 style="margin-bottom: 10px; font-weight: 600;">🔍 Page Search</h6>
        <input type="text" id="pageSearchInput" class="form-control form-control-sm" placeholder="Search on this page...">
        <div id="searchResults" style="margin-top: 10px; max-height: 200px; overflow-y: auto; font-size: 0.9rem;"></div>
        <button class="btn btn-sm btn-secondary mt-2" id="closePageSearch">Close</button>
    `;
    document.body.appendChild(contentSearch);

    // Toggle page search with Ctrl+Shift+P
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            if (contentSearch.style.display === 'block') {
                contentSearch.style.display = 'none';
            } else {
                contentSearch.style.display = 'block';
                document.getElementById('pageSearchInput')?.focus();
            }
        }
    });

    document.getElementById('closePageSearch')?.addEventListener('click', function() {
        contentSearch.style.display = 'none';
    });

    // Page search functionality
    const pageSearchInput = document.getElementById('pageSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (pageSearchInput && searchResults) {
        pageSearchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            searchResults.innerHTML = '';
            
            if (query === '') return;
            
            // Search in all paragraphs and list items
            const textElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
            let matches = 0;
            
            textElements.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(query)) {
                    matches++;
                    const matchDiv = document.createElement('div');
                    matchDiv.style.cssText = `
                        padding: 5px 8px;
                        margin: 3px 0;
                        background: #f8f9fa;
                        border-radius: 4px;
                        cursor: pointer;
                        border-left: 3px solid #0a58ca;
                    `;
                    const snippet = el.textContent.substring(0, 100) + (el.textContent.length > 100 ? '...' : '');
                    matchDiv.textContent = snippet;
                    matchDiv.addEventListener('click', function() {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.style.backgroundColor = '#fff3cd';
                        setTimeout(() => {
                            el.style.backgroundColor = '';
                        }, 2000);
                        contentSearch.style.display = 'none';
                    });
                    searchResults.appendChild(matchDiv);
                }
            });
            
            if (matches === 0) {
                searchResults.innerHTML = '<div class="text-muted small">No matches found.</div>';
            } else {
                const info = document.createElement('div');
                info.className = 'text-muted small';
                info.textContent = `Found ${matches} match(es)`;
                searchResults.prepend(info);
            }
        });
    }

    // =====================================================
    // 19. SHOW ALERT FUNCTION (Custom Toast Notifications)
    // =====================================================
    function showAlert(message, type = 'info') {
        let alertContainer = document.getElementById('alert-container');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.id = 'alert-container';
            alertContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                width: 100%;
            `;
            document.body.appendChild(alertContainer);
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.style.cssText = `
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
            margin-bottom: 10px;
            border-radius: 12px;
            border: none;
            backdrop-filter: blur(10px);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'btn-close';
        closeBtn.setAttribute('data-bs-dismiss', 'alert');
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.addEventListener('click', function() {
            alertDiv.remove();
        });

        const msgSpan = document.createElement('span');
        msgSpan.textContent = message;
        if (message.includes('\n')) {
            msgSpan.innerHTML = message.replace(/\n/g, '<br>');
        }

        alertDiv.appendChild(msgSpan);
        alertDiv.appendChild(closeBtn);
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.classList.remove('show');
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 5000);
    }

    // Add animation styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
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
        .alert-info {
            background: rgba(13, 202, 240, 0.95);
            color: #055160;
        }
        .alert-success {
            background: rgba(25, 135, 84, 0.95);
            color: #0a3622;
        }
        .alert-warning {
            background: rgba(255, 193, 7, 0.95);
            color: #664d03;
        }
        .alert-danger {
            background: rgba(220, 53, 69, 0.95);
            color: #58151c;
        }
        .alert-primary {
            background: rgba(13, 110, 253, 0.95);
            color: #052c65;
        }
        .alert-secondary {
            background: rgba(108, 117, 125, 0.95);
            color: #1e2125;
        }
    `;
    document.head.appendChild(styleSheet);

    // =====================================================
    // 20. CONSOLE WELCOME MESSAGE
    // =====================================================
    console.log('%c📜 Egbema History & Origin Page', 'font-size: 20px; font-weight: bold; color: #0a58ca;');
    console.log('%cDeveloped by: Engr. Kenneth Iyke Amadi', 'font-size: 14px; color: #6c757d;');
    console.log('%c+234 7038716096', 'font-size: 12px; color: #6c757d;');
    console.log('%c📖 Keyboard Shortcuts: Ctrl+Shift+S (Search), Ctrl+Shift+P (Page Search), Esc (Close alerts)', 'font-size: 13px; color: #198754;');

    // =====================================================
    // 21. IMAGE ERROR HANDLING (if any images exist)
    // =====================================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e9ecef" width="100" height="100"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%236c757d" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
            this.style.objectFit = 'contain';
            this.style.padding = '10px';
            this.style.background = '#f8f9fa';
        });
    });

    // =====================================================
    // 22. PAGE VISIBILITY API
    // =====================================================
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('📋 History page is now visible');
        }
    });

    // =====================================================
    // 23. NAVBAR TOGGLER - Mobile menu feedback
    // =====================================================
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            console.log(expanded ? '📱 Mobile menu closed' : '📱 Mobile menu opened');
        });
    }

    // =====================================================
    // 24. SECTION COUNTER (show number of sections)
    // =====================================================
    console.log(`📊 Total sections found: ${sections.length}`);

    console.log('✅ All JavaScript functionality loaded successfully!');
});