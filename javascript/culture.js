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
                // Search through culture content
                const contentSections = document.querySelectorAll('.culture, .kingdom, .festival, .attire');
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
                    const contentSections = document.querySelectorAll('.culture, .kingdom, .festival, .attire');
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
    // 11. VIDEO PLAYER CONTROLS
    // =====================================================
    const video = document.querySelector('video');
    if (video) {
        // Add video controls enhancements
        const videoContainer = video.parentElement;
        videoContainer.style.position = 'relative';
        videoContainer.style.borderRadius = '12px';
        videoContainer.style.overflow = 'hidden';
        videoContainer.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        
        // Add video title overlay
        const videoTitle = document.createElement('div');
        videoTitle.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 20px;
            color: white;
            background: rgba(0,0,0,0.6);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(4px);
        `;
        videoTitle.textContent = '🎵 Egbema Cultural Song';
        videoContainer.appendChild(videoTitle);
        
        video.addEventListener('play', function() {
            videoTitle.style.opacity = '1';
            setTimeout(() => {
                videoTitle.style.opacity = '0';
            }, 3000);
        });
        
        video.addEventListener('pause', function() {
            videoTitle.style.opacity = '1';
        });

        // Video error handling
        video.addEventListener('error', function() {
            showAlert('⚠️ Video could not be loaded. Please check the file path.', 'warning');
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f8f9fa;
                padding: 40px;
                border-radius: 12px;
                color: #6c757d;
                font-size: 16px;
            `;
            errorMsg.innerHTML = '<i class="bi bi-music-note-beamed me-2"></i> Cultural video preview (file not found)';
            video.parentNode.replaceChild(errorMsg, video);
        });

        // Add video controls info
        console.log('🎵 Video element found and initialized');
    }

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
    // 14. SECTION ANIMATION ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('.culture, .kingdom, .festival, .attire');
    
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
    // 15. CULTURE FACT CARDS (Dynamic creation)
    // =====================================================
    const cultureFacts = [
        { icon: '🎭', title: 'Masquerade Tradition', desc: 'Ekpo, Mmawu, Okroshi, and Owu masquerades represent ancestral spirits during festivals.' },
        { icon: '🌾', title: 'New Yam Festival', desc: 'Igwaji festival celebrates the harvest season and unites all 16 communities.' },
        { icon: '🥁', title: 'Talking Drum', desc: 'The traditional drum communicates messages and accompanies ceremonial dances.' },
        { icon: '💃', title: 'Cultural Dance', desc: 'Egbema traditional dances tell stories of bravery, love, and community unity.' }
    ];

    const cultureSection = document.querySelector('.culture');
    if (cultureSection) {
        const factsContainer = document.createElement('div');
        factsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
            padding: 20px;
        `;
        
        cultureFacts.forEach(fact => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
                border: 1px solid #e9ecef;
            `;
            card.innerHTML = `
                <div style="font-size: 40px; margin-bottom: 10px;">${fact.icon}</div>
                <h5 style="font-weight: 600; color: #0a58ca;">${fact.title}</h5>
                <p style="font-size: 14px; color: #6c757d; margin: 0;">${fact.desc}</p>
            `;
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            });
            
            card.addEventListener('click', function() {
                const title = this.querySelector('h5').textContent;
                const desc = this.querySelector('p').textContent;
                showAlert(`📌 ${title}\n${desc}`, 'info');
            });
            
            factsContainer.appendChild(card);
        });
        
        cultureSection.after(factsContainer);
    }

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
        
        // Ctrl+Shift+C - Show culture facts
        if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            const randomFact = cultureFacts[Math.floor(Math.random() * cultureFacts.length)];
            showAlert(`📚 Culture Fact: ${randomFact.title}\n${randomFact.desc}`, 'primary');
        }

        // Space key - Toggle video playback
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === ' ' && video) {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
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
        .culture, .kingdom, .festival, .attire {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // =====================================================
    // 18. CONSOLE WELCOME MESSAGE
    // =====================================================
    console.log('%c🎭 Egbema Culture Page', 'font-size: 20px; font-weight: bold; color: #0a58ca;');
    console.log('%cDeveloped by: Engr. Kenneth Iyke Amadi', 'font-size: 14px; color: #6c757d;');
    console.log('%c+234 7038716096', 'font-size: 12px; color: #6c757d;');
    console.log('%c📌 Keyboard Shortcuts: Ctrl+Shift+S (Search), Ctrl+Shift+C (Culture Fact), Space (Play/Pause video), Esc (Close alerts)', 'font-size: 13px; color: #198754;');

    // =====================================================
    // 19. IMAGE ERROR HANDLING
    // =====================================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"%3E%3Crect fill="%23e9ecef" width="200" height="150"/%3E%3Ctext x="100" y="75" font-family="Arial" font-size="14" fill="%236c757d" text-anchor="middle" dy=".3em"%3E🎨%3C/text%3E%3Ctext x="100" y="95" font-family="Arial" font-size="12" fill="%236c757d" text-anchor="middle"%3ECulture Image%3C/text%3E%3C/svg%3E';
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
            console.log('🎭 Culture page is now visible');
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
    // 22. ADD CULTURAL QUOTE (Dynamic)
    // =====================================================
    const quotes = [
        '"Our culture is our identity, passed down through generations."',
        '"The drum speaks the language of our ancestors."',
        '"Festivals unite us, reminding us of our shared heritage."',
        '"In every dance, we tell a story of our people."'
    ];

    const cultureHeader = document.querySelector('.culture h2');
    if (cultureHeader) {
        const quoteDiv = document.createElement('div');
        quoteDiv.style.cssText = `
            font-style: italic;
            color: #6c757d;
            padding: 15px 20px;
            background: #f8f9fa;
            border-radius: 12px;
            margin: 15px 0;
            border-left: 4px solid #0a58ca;
            font-size: 16px;
            transition: all 0.5s ease;
        `;
        quoteDiv.id = 'cultureQuote';
        quoteDiv.textContent = quotes[0];
        cultureHeader.after(quoteDiv);

        // Rotate quotes every 10 seconds
        let quoteIndex = 0;
        setInterval(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            const quoteElement = document.getElementById('cultureQuote');
            if (quoteElement) {
                quoteElement.style.opacity = '0';
                setTimeout(() => {
                    quoteElement.textContent = quotes[quoteIndex];
                    quoteElement.style.opacity = '1';
                }, 300);
            }
        }, 10000);

        // Add click to change quote
        quoteDiv.addEventListener('click', function() {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            this.style.opacity = '0';
            setTimeout(() => {
                this.textContent = quotes[quoteIndex];
                this.style.opacity = '1';
            }, 300);
            showAlert('📜 New cultural quote displayed', 'info');
        });
    }

    console.log('✅ All JavaScript functionality loaded successfully!');
});