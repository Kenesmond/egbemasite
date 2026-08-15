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
                // Search through elite profiles
                const profiles = document.querySelectorAll('.grid > div');
                let found = 0;
                
                profiles.forEach(profile => {
                    const name = profile.querySelector('h5')?.textContent?.toLowerCase() || '';
                    const role = profile.querySelector('strong')?.textContent?.toLowerCase() || '';
                    const desc = profile.querySelectorAll('p')[1]?.textContent?.toLowerCase() || '';
                    const fullText = name + ' ' + role + ' ' + desc;
                    
                    if (fullText.includes(query.toLowerCase())) {
                        profile.style.display = 'block';
                        profile.style.border = '2px solid #0a58ca';
                        profile.style.borderRadius = '8px';
                        profile.style.padding = '10px';
                        profile.style.backgroundColor = '#f0f8ff';
                        found++;
                    } else {
                        profile.style.display = 'none';
                    }
                });
                
                if (found > 0) {
                    showAlert(`Found ${found} elite profile(s) matching "${query}"`, 'success');
                } else {
                    showAlert(`No elite profiles found matching "${query}"`, 'info');
                    // Reset display
                    profiles.forEach(profile => {
                        profile.style.display = 'block';
                        profile.style.border = 'none';
                        profile.style.backgroundColor = 'transparent';
                    });
                }
            }
        });

        // Reset search on clear
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                if (this.value.trim() === '') {
                    const profiles = document.querySelectorAll('.grid > div');
                    profiles.forEach(profile => {
                        profile.style.display = 'block';
                        profile.style.border = 'none';
                        profile.style.backgroundColor = 'transparent';
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
            if (page === 'Blog') {
                showAlert('📝 Opening Blog...', 'info');
                // Uncomment for actual navigation:
                // window.open('https://kenesmond.blogspot.com', '_blank');
            } else {
                showAlert('📄 ' + page + ' page - Coming soon!', 'info');
            }
        });
    });

    // =====================================================
    // 11. ELITE PROFILE CARDS - Click to view details
    // =====================================================
    const profileCards = document.querySelectorAll('.grid > div');
    profileCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.style.transition = 'all 0.3s ease';
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            this.style.borderRadius = '12px';
            this.style.padding = '10px';
            this.style.backgroundColor = '#f8f9fa';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderRadius = '0';
            this.style.padding = '0';
            this.style.backgroundColor = 'transparent';
        });
        
        // Click to view details
        card.addEventListener('click', function() {
            const name = this.querySelector('h5')?.textContent || 'Unknown';
            const position = this.querySelector('strong')?.textContent || 'Position not specified';
            const role = this.querySelectorAll('p')[1]?.textContent || 'Role not specified';
            
            showAlert(
                `👤 ${name}\n${position}\n${role}`,
                'info'
            );
            
            // Add highlight effect
            this.style.backgroundColor = '#e3f2fd';
            this.style.border = '2px solid #0a58ca';
            this.style.borderRadius = '8px';
            this.style.padding = '10px';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.border = 'none';
                this.style.borderRadius = '0';
                this.style.padding = '0';
            }, 2000);
        });
    });

    // =====================================================
    // 12. BRAND LOGO CLICK
    // =====================================================
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('🏠 Returning to Home page...', 'primary');
        });
    }

    // =====================================================
    // 13. SCROLL TO TOP BUTTON
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
    // 14. PROFILE COUNTER
    // =====================================================
    const totalProfiles = document.querySelectorAll('.grid > div').length;
    const eliteHeader = document.querySelector('.elite h2');
    if (eliteHeader) {
        eliteHeader.textContent = `Meet the Personels of Egbema 16 Communities (${totalProfiles} profiles)`;
    }

    // =====================================================
    // 15. KEYBOARD SHORTCUTS
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
        
        // Ctrl+Shift+E - Show elite count
        if (e.ctrlKey && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
            e.preventDefault();
            showAlert(`👥 Total elite profiles: ${totalProfiles}`, 'primary');
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
    // 16. SHOW ALERT FUNCTION
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
        .grid > div {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // =====================================================
    // 17. CONSOLE WELCOME MESSAGE
    // =====================================================
    console.log('%c👤 Egbema Elites Page', 'font-size: 20px; font-weight: bold; color: #0a58ca;');
    console.log(`%cTotal Elite Profiles: ${totalProfiles}`, 'font-size: 14px; color: #198754;');
    console.log('%cDeveloped by: Engr. Kenneth Iyke Amadi', 'font-size: 14px; color: #6c757d;');
    console.log('%c+234 7038716096', 'font-size: 12px; color: #6c757d;');
    console.log('%c📌 Keyboard Shortcuts: Ctrl+Shift+S (Search), Ctrl+Shift+E (Elite count), Esc (Close alerts)', 'font-size: 13px; color: #0dcaf0;');

    // =====================================================
    // 18. IMAGE ERROR HANDLING
    // =====================================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e9ecef" width="200" height="200"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="16" fill="%236c757d" text-anchor="middle" dy=".3em"%3E👤%3C/text%3E%3Ctext x="100" y="130" font-family="Arial" font-size="12" fill="%236c757d" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
            this.style.objectFit = 'contain';
            this.style.padding = '10px';
            this.style.background = '#f8f9fa';
            this.style.width = '150px';
            this.style.height = '150px';
        });
    });

    // =====================================================
    // 19. PAGE VISIBILITY API
    // =====================================================
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('👤 Elites page is now visible');
        }
    });

    // =====================================================
    // 20. NAVBAR TOGGLER - Mobile menu feedback
    // =====================================================
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            console.log(expanded ? '📱 Mobile menu closed' : '📱 Mobile menu opened');
        });
    }

    // =====================================================
    // 21. FILTER ELITES BY CATEGORY (Administrator, Engineer, etc.)
    // =====================================================
    // Create category filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.style.cssText = `
        margin: 20px 0;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    `;
    filterContainer.innerHTML = `
        <button class="btn btn-outline-primary btn-sm filter-btn active" data-filter="all">All</button>
        <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="administrator">Administrators</button>
        <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="civil servant">Civil Servants</button>
        <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="public servant">Public Servants</button>
        <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="engineer">Engineers</button>
    `;
    
    // Insert after the elite header
    const eliteSection = document.querySelector('.elite');
    if (eliteSection) {
        eliteSection.after(filterContainer);
    }

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const profiles = document.querySelectorAll('.grid > div');
            
            profiles.forEach(profile => {
                const roleText = profile.querySelectorAll('p')[1]?.textContent?.toLowerCase() || '';
                const positionText = profile.querySelector('strong')?.textContent?.toLowerCase() || '';
                const fullText = roleText + ' ' + positionText;
                
                if (filter === 'all' || fullText.includes(filter)) {
                    profile.style.display = 'block';
                } else {
                    profile.style.display = 'none';
                }
            });
            
            showAlert(`Showing: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`, 'info');
        });
    });

    // =====================================================
    // 22. PRINT FUNCTIONALITY
    // =====================================================
    // Add print button
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-secondary btn-sm';
    printBtn.innerHTML = '<i class="bi bi-printer"></i> Print Profiles';
    printBtn.style.cssText = `
        margin: 20px 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;
    
    const gridSection = document.querySelector('.grid');
    if (gridSection) {
        gridSection.parentNode.insertBefore(printBtn, gridSection);
    }
    
    printBtn.addEventListener('click', function() {
        window.print();
    });

    console.log('✅ All JavaScript functionality loaded successfully!');
});