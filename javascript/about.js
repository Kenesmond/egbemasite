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
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput ? searchInput.value.trim() : '';
            
            if (query === '') {
                showAlert('Please enter a search term.', 'warning');
                searchInput.focus();
            } else {
                // Search through content sections
                const contentSections = document.querySelectorAll('.intro, .historic, .challenges, .about-card, .Rich, .vision, .section');
                let found = 0;
                
                contentSections.forEach(section => {
                    const text = section.textContent.toLowerCase();
                    if (text.includes(query.toLowerCase())) {
                        section.style.backgroundColor = '#f0f8ff';
                        section.style.border = '2px solid #0a58ca';
                        section.style.borderRadius = '8px';
                        section.style.padding = '15px';
                        section.style.transition = 'all 0.3s ease';
                        found++;
                        
                        // Scroll to first match
                        if (found === 1) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    } else {
                        section.style.backgroundColor = '';
                        section.style.border = 'none';
                        section.style.padding = '';
                    }
                });
                
                if (found > 0) {
                    showAlert(`Found ${found} section(s) matching "${query}"`, 'success');
                } else {
                    showAlert(`No content found matching "${query}"`, 'info');
                    // Reset styles
                    contentSections.forEach(section => {
                        section.style.backgroundColor = '';
                        section.style.border = 'none';
                        section.style.padding = '';
                    });
                }
            }
        });

        // Reset on clear
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    const contentSections = document.querySelectorAll('.intro, .historic, .challenges, .about-card, .Rich, .vision, .section');
                    contentSections.forEach(section => {
                        section.style.backgroundColor = '';
                        section.style.border = 'none';
                        section.style.padding = '';
                    });
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
    // 5. NAVIGATION - Set active link
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
    // 11. BRAND LOGO CLICK
    // =====================================================
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('🏠 Returning to Home page...', 'primary');
        });
    }

    // =====================================================
    // 12. SCROLL TO TOP BUTTON
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

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // =====================================================
    // 13. SECTION ANIMATION ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('.intro, .historic, .challenges, .about-card, .Rich, .vision, .section, .stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });

    // =====================================================
    // 14. STATISTICS COUNTER ANIMATION
    // =====================================================
    const statNumbers = document.querySelectorAll('.stats .row > div > div > div:first-child');
    
    statNumbers.forEach(stat => {
        const originalText = stat.textContent.trim();
        const isPercentage = originalText.includes('%');
        const isPlus = originalText.includes('+');
        const numValue = parseInt(originalText.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numValue)) {
            let current = 0;
            const target = numValue;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            
            stat.textContent = '0' + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                const displayValue = Math.floor(current);
                stat.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
            }, duration / steps);
        }
    });

    // =====================================================
    // 15. TIMELINE INTERACTION
    // =====================================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.style.transition = 'all 0.3s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = '#f8f9fa';
            this.style.borderRadius = '8px';
            this.style.padding = '10px 15px';
            this.style.borderLeft = '4px solid #0a58ca';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '';
            this.style.borderRadius = '';
            this.style.padding = '';
            this.style.borderLeft = '';
        });
        
        item.addEventListener('click', function() {
            const year = this.querySelector('span')?.textContent || 'Unknown year';
            const desc = this.querySelector('p')?.textContent || '';
            showAlert(`📅 ${year}\n${desc.substring(0, 100)}${desc.length > 100 ? '...' : ''}`, 'info');
        });
    });

    // =====================================================
    // 16. KEYBOARD SHORTCUTS
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
        
        // Ctrl+Shift+A - Show about info
        if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
            e.preventDefault();
            showAlert('📖 Egbema Oil Kingdom\nA legacy of rich heritage and prosperity in the Niger Delta.', 'primary');
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
    // 17. SHOW ALERT FUNCTION
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
        .intro, .historic, .challenges, .about-card, .Rich, .vision, .section, .stats {
            transition: all 0.3s ease;
        }
        .timeline-item {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // =====================================================
    // 18. CONSOLE WELCOME MESSAGE
    // =====================================================
    console.log('%c📖 Egbema About Page', 'font-size: 20px; font-weight: bold; color: #0a58ca;');
    console.log('%cDeveloped by: Engr. Kenneth Iyke Amadi', 'font-size: 14px; color: #6c757d;');
    console.log('%c+234 7038716096', 'font-size: 12px; color: #6c757d;');
    console.log('%c📌 Keyboard Shortcuts: Ctrl+Shift+S (Search), Ctrl+Shift+A (About info), Esc (Close alerts)', 'font-size: 13px; color: #198754;');

    // =====================================================
    // 19. IMAGE ERROR HANDLING
    // =====================================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect fill="%23e9ecef" width="200" height="150"/%3E%3Ctext x="100" y="75" font-family="Arial" font-size="14" fill="%236c757d" text-anchor="middle" dy=".3em"%3E🏛️%3C/text%3E%3Ctext x="100" y="95" font-family="Arial" font-size="12" fill="%236c757d" text-anchor="middle"%3EAbout Image%3C/text%3E%3C/svg%3E';
            this.style.objectFit = 'contain';
            this.style.padding = '10px';
            this.style.background = '#f8f9fa';
            this.style.borderRadius = '8px';
        });
    });

    // =====================================================
    // 20. PAGE VISIBILITY API
    // =====================================================
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('📖 About page is now visible');
        }
    });

    // =====================================================
    // 21. NAVBAR TOGGLER - Mobile menu feedback
    // =====================================================
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            console.log(expanded ? '📱 Mobile menu closed' : '📱 Mobile menu opened');
        });
    }

    // =====================================================
    // 22. QUICK NAVIGATION - Jump to sections
    // =====================================================
    const navSection = document.createElement('div');
    navSection.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;
        display: none;
        flex-direction: column;
        gap: 8px;
    `;
    
    const sectionNames = [
        { name: 'Introduction', selector: '.intro' },
        { name: 'History', selector: '.historic' },
        { name: 'Challenges', selector: '.challenges' },
        { name: 'Culture', selector: '.Rich' },
        { name: 'Vision', selector: '.vision' },
        { name: 'Stats', selector: '.stats' }
    ];
    
    sectionNames.forEach(item => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #6c757d;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        `;
        dot.title = item.name;
        
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.background = '#0a58ca';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#6c757d';
        });
        
        dot.addEventListener('click', function() {
            const target = document.querySelector(item.selector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Highlight the section
                target.style.backgroundColor = '#e3f2fd';
                target.style.borderRadius = '8px';
                target.style.padding = '15px';
                setTimeout(() => {
                    target.style.backgroundColor = '';
                    target.style.borderRadius = '';
                    target.style.padding = '';
                }, 2000);
            }
        });
        
        navSection.appendChild(dot);
    });
    
    document.body.appendChild(navSection);
    
    // Show/hide quick nav on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            navSection.style.display = 'flex';
        } else {
            navSection.style.display = 'none';
        }
    });

    // =====================================================
    // 23. ADD "READ MORE" FUNCTIONALITY
    // =====================================================
    const paragraphs = document.querySelectorAll('.historic p, .challenges p, .Rich p, .about-card p');
    paragraphs.forEach(p => {
        if (p.textContent.length > 200) {
            const originalText = p.textContent;
            const truncated = originalText.substring(0, 200) + '...';
            
            // Store original and truncated
            p.dataset.full = originalText;
            p.dataset.truncated = truncated;
            p.textContent = truncated;
            
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'btn btn-link btn-sm p-0 ms-2';
            readMoreBtn.textContent = 'Read more';
            readMoreBtn.style.cssText = `
                color: #0a58ca;
                text-decoration: none;
                font-weight: 500;
            `;
            
            let isExpanded = false;
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                isExpanded = !isExpanded;
                p.textContent = isExpanded ? p.dataset.full : p.dataset.truncated;
                this.textContent = isExpanded ? 'Read less' : 'Read more';
                // Re-append button
                p.parentNode.insertBefore(readMoreBtn, p.nextSibling);
            });
            
            p.parentNode.insertBefore(readMoreBtn, p.nextSibling);
        }
    });

    console.log('✅ All JavaScript functionality loaded successfully!');
});