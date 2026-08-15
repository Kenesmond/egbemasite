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
                showAlert('Searching for: "' + query + '"', 'info');
                searchInput.value = '';
            }
        });
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
    // 4. NAVIGATION - Set active link
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
    // 5. DROPDOWN ITEMS
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
    // 6. DISABLED LINK
    // =====================================================
    const disabledLink = document.querySelector('.nav-link.disabled');
    if (disabledLink) {
        disabledLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('This link is currently disabled.', 'secondary');
        });
    }

    // =====================================================
    // 7. CONTACT FORM - VALIDATION & SUBMISSION
    // =====================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = contactForm.querySelector('textarea') || 
                           contactForm.querySelector('div:last-child')?.previousElementSibling;
        
        // Add textarea if not exists
        let messageField = contactForm.querySelector('textarea');
        if (!messageField) {
            const messageGroup = contactForm.querySelector('div:has(label:contains("Message"))');
            if (messageGroup) {
                const textarea = document.createElement('textarea');
                textarea.className = 'form-control';
                textarea.id = 'message';
                textarea.name = 'message';
                textarea.rows = 4;
                textarea.placeholder = 'Your Message';
                textarea.required = true;
                messageGroup.appendChild(textarea);
                messageField = textarea;
            }
        }

        // Add validation feedback elements
        const nameFeedback = nameInput?.closest('div')?.querySelector('.invalid-feedback') || 
                           createFeedback(nameInput, 'Please enter your full name.');
        const emailFeedback = emailInput?.closest('div')?.querySelector('.invalid-feedback') || 
                            createFeedback(emailInput, 'Please enter a valid email address.');

        // Add submit handler
        const submitBtn = contactForm.querySelector('button[type="submit"]') || 
                         contactForm.querySelector('button:last-child');
        
        if (submitBtn) {
            submitBtn.type = 'submit';
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const name = nameInput?.value?.trim() || '';
            const email = emailInput?.value?.trim() || '';
            const message = messageField?.value?.trim() || '';

            // Validate name
            if (name.length < 2) {
                isValid = false;
                nameInput?.classList.add('is-invalid');
                nameInput?.focus();
                showAlert('Please enter your full name.', 'warning');
                return;
            } else {
                nameInput?.classList.remove('is-invalid');
                nameInput?.classList.add('is-valid');
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                emailInput?.classList.add('is-invalid');
                emailInput?.focus();
                showAlert('Please enter a valid email address.', 'warning');
                return;
            } else {
                emailInput?.classList.remove('is-invalid');
                emailInput?.classList.add('is-valid');
            }

            // Validate message
            if (message.length < 10) {
                isValid = false;
                messageField?.classList.add('is-invalid');
                messageField?.focus();
                showAlert('Please enter a message (minimum 10 characters).', 'warning');
                return;
            } else {
                messageField?.classList.remove('is-invalid');
                messageField?.classList.add('is-valid');
            }

            if (isValid) {
                // Show success message
                showAlert('✅ Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                nameInput?.classList.remove('is-valid');
                emailInput?.classList.remove('is-valid');
                messageField?.classList.remove('is-valid');
                
                // Show success message in form
                const successDiv = document.querySelector('.success-message') || 
                                 createSuccessMessage('Your message has been sent successfully!');
                successDiv.style.display = 'block';
                setTimeout(() => {
                    successDiv.style.display = 'none';
                }, 5000);
            }
        });

        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                if (this.value.trim().length >= 2) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.value.trim())) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });
        }

        if (messageField) {
            messageField.addEventListener('input', function() {
                if (this.value.trim().length >= 10) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });
        }
    }

    // =====================================================
    // 8. NEWSLETTER SUBSCRIPTION
    // =====================================================
    const newsletterForm = document.getElementById('newsletterForm') || 
                          document.querySelector('footer form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const subscribeBtn = newsletterForm.querySelector('button[type="button"]') || 
                           newsletterForm.querySelector('button');
        
        if (subscribeBtn && subscribeBtn.type === 'button') {
            subscribeBtn.type = 'submit';
        }

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                showAlert('Please enter your email address.', 'warning');
                emailInput?.focus();
            } else if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                emailInput?.focus();
                emailInput?.select();
            } else {
                showAlert('🎉 Thank you for subscribing with: ' + email, 'success');
                emailInput.value = '';
                
                // Show success message
                const successMsg = newsletterForm.querySelector('.subscription-success') || 
                                 createSuccessMessage('Thank you for subscribing!', 'subscription-success');
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 4000);
            }
        });
    }

    // =====================================================
    // 9. SOCIAL ICONS (Bootstrap Icons)
    // =====================================================
    const socialIcons = document.querySelectorAll('.social-icon, .text-primary .bi, .text-primary ion-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const iconClass = this.querySelector('i')?.className || this.className || '';
            let platform = 'social media';
            
            if (iconClass.includes('twitter')) platform = 'Twitter/X';
            else if (iconClass.includes('facebook')) platform = 'Facebook';
            else if (iconClass.includes('github')) platform = 'GitHub';
            else if (iconClass.includes('instagram')) platform = 'Instagram';
            else if (iconClass.includes('youtube')) platform = 'YouTube';
            
            showAlert('🌐 Opening ' + platform + ' page...', 'primary');
            // Uncomment to open in new tab:
            // window.open('#', '_blank');
        });
    });

    // =====================================================
    // 10. FOOTER QUICK LINKS
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
    // 11. MAP FUNCTIONALITY - Update/Refresh Map
    // =====================================================
    const maps = document.querySelectorAll('iframe[src*="google.com/maps"]');
    
    // Add map controls
    maps.forEach((map, index) => {
        const container = map.parentElement;
        
        // Add map refresh button
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn btn-outline-primary btn-sm mt-2';
        refreshBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Refresh Map';
        refreshBtn.style.margin = '10px 0';
        
        refreshBtn.addEventListener('click', function() {
            // Store current src
            const currentSrc = map.src;
            // Reload map by resetting src
            map.src = '';
            setTimeout(() => {
                map.src = currentSrc;
                showAlert('🗺️ Map refreshed successfully!', 'success');
            }, 100);
        });
        
        container.appendChild(refreshBtn);

        // Add map center button
        const centerBtn = document.createElement('button');
        centerBtn.className = 'btn btn-outline-secondary btn-sm mt-2 ms-2';
        centerBtn.innerHTML = '<i class="bi bi-geo-alt"></i> Center Map';
        
        centerBtn.addEventListener('click', function() {
            // Reload to center
            const currentSrc = map.src;
            map.src = '';
            setTimeout(() => {
                map.src = currentSrc;
                showAlert('📍 Map centered on Egbema Oil Kingdom', 'info');
            }, 100);
        });
        
        container.appendChild(centerBtn);

        // Add map zoom controls info
        const mapInfo = document.createElement('div');
        mapInfo.className = 'text-muted small mt-2';
        mapInfo.innerHTML = '<i class="bi bi-info-circle"></i> Use mouse wheel to zoom, drag to pan';
        container.appendChild(mapInfo);
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
    // 14. KEYBOARD SHORTCUTS
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
    // 15. SHOW ALERT FUNCTION
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

    // =====================================================
    // 16. HELPER FUNCTIONS
    // =====================================================
    function createFeedback(input, message) {
        if (!input) return null;
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        input.closest('div')?.appendChild(feedback);
        return feedback;
    }

    function createSuccessMessage(message, className = 'success-message') {
        const div = document.createElement('div');
        div.className = `alert alert-success ${className}`;
        div.textContent = message;
        div.style.cssText = `
            margin: 15px 0;
            display: none;
            border-radius: 8px;
        `;
        
        // Find where to insert
        const form = document.getElementById('contactForm');
        if (form) {
            form.appendChild(div);
        } else {
            document.body.appendChild(div);
        }
        return div;
    }

    // =====================================================
    // 17. ADD CONTACT INFO ANIMATION
    // =====================================================
    const contactInfo = document.querySelector('.row > div:first-child');
    if (contactInfo) {
        contactInfo.style.transition = 'all 0.5s ease';
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            contactInfo.style.opacity = '1';
            contactInfo.style.transform = 'translateX(0)';
        }, 300);
    }

    // =====================================================
    // 18. CONSOLE WELCOME MESSAGE
    // =====================================================
    console.log('%c📞 Egbema Contact Page', 'font-size: 20px; font-weight: bold; color: #0a58ca;');
    console.log('%cDeveloped by: Engr. Kenneth Iyke Amadi', 'font-size: 14px; color: #6c757d;');
    console.log('%c+234 7038716096', 'font-size: 12px; color: #6c757d;');
    console.log('%c📌 Keyboard Shortcuts: Ctrl+Shift+S (Search), Esc (Close alerts)', 'font-size: 13px; color: #198754;');

    // =====================================================
    // 19. PAGE VISIBILITY API
    // =====================================================
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            console.log('📞 Contact page is now visible');
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
    // 21. MAP COORDINATES DISPLAY
    // =====================================================
    const mapCoords = {
        lat: 5.6686,
        lng: 7.0582,
        location: 'Egbema, Imo/Rivers States, Nigeria'
    };

    // Display coordinates
    const coordsDiv = document.createElement('div');
    coordsDiv.style.cssText = `
        background: #f8f9fa;
        padding: 10px 15px;
        border-radius: 8px;
        margin: 10px 0;
        font-size: 14px;
        color: #495057;
        text-align: center;
    `;
    coordsDiv.innerHTML = `
        <i class="bi bi-geo-alt-fill text-danger"></i> 
        <strong>Coordinates:</strong> ${mapCoords.lat}, ${mapCoords.lng} 
        | <strong>Location:</strong> ${mapCoords.location}
    `;
    
    // Insert after first map
    const firstMap = document.querySelector('iframe[src*="google.com/maps"]');
    if (firstMap && firstMap.parentElement) {
        firstMap.parentElement.insertBefore(coordsDiv, firstMap.nextSibling);
    }

    // =====================================================
    // 22. ADD "GET DIRECTIONS" BUTTON
    // =====================================================
    const directionsBtn = document.createElement('button');
    directionsBtn.className = 'btn btn-success btn-sm mt-2 ms-2';
    directionsBtn.innerHTML = '<i class="bi bi-map"></i> Get Directions';
    
    directionsBtn.addEventListener('click', function() {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${mapCoords.lat},${mapCoords.lng}`;
        window.open(url, '_blank');
        showAlert('🗺️ Opening Google Maps directions...', 'info');
    });

    // Add to map container
    const mapContainer = document.querySelector('.row > div:last-child');
    if (mapContainer) {
        const existingBtns = mapContainer.querySelectorAll('.btn');
        if (existingBtns.length > 0) {
            existingBtns[0].parentElement.appendChild(directionsBtn);
        }
    }

    console.log('✅ All JavaScript functionality loaded successfully!');
});