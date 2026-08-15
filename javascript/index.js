document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =============================================
    // 1. MOBILE MENU - Collapse on link click
    // =============================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarMain');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is a dropdown toggle - don't collapse if it is
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Check if the link has dropdown-menu (parent) - don't collapse for dropdown items
            if (this.closest('.dropdown-menu')) {
                return;
            }

            // If navbar is expanded (mobile view), collapse it
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    // Fallback: toggle the class
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // =============================================
    // 2. LOGIN BUTTON - Modal or alert
    // =============================================
    const loginBtn = document.querySelector('.btn-primary[type="button"]');
    if (loginBtn) {
        // Check if it's the login button (contains "Login" text)
        if (loginBtn.textContent.trim().includes('Login')) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a simple login modal dynamically
                const existingModal = document.querySelector('#loginModal');
                if (existingModal) {
                    existingModal.remove();
                }

                const modalHTML = `
                    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content" style="background: #0b1a2e; color: #fff; border-radius: 1.5rem; border: 1px solid #1e2f42;">
                                <div class="modal-header" style="border-bottom: 1px solid #1e2f42;">
                                    <h5 class="modal-title" id="loginModalLabel" style="color: #facc15;">
                                        <i class="bi bi-person-circle me-2"></i>Login to Egbema
                                    </h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="loginForm">
                                        <div class="mb-3">
                                            <label for="loginEmail" class="form-label" style="color: rgba(255,255,255,0.7);">Email address</label>
                                            <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com" 
                                                   style="background: rgba(255,255,255,0.08); border: 1px solid #1e2f42; color: #fff; border-radius: 1rem;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="loginPassword" class="form-label" style="color: rgba(255,255,255,0.7);">Password</label>
                                            <input type="password" class="form-control" id="loginPassword" placeholder="Enter your password"
                                                   style="background: rgba(255,255,255,0.08); border: 1px solid #1e2f42; color: #fff; border-radius: 1rem;">
                                        </div>
                                        <div class="mb-3 form-check">
                                            <input type="checkbox" class="form-check-input" id="rememberMe" style="border-color: #1e2f42;">
                                            <label class="form-check-label" for="rememberMe" style="color: rgba(255,255,255,0.6);">Remember me</label>
                                        </div>
                                        <button type="submit" class="btn w-100" style="background: #facc15; color: #0b1a2e; font-weight: 600; border-radius: 2rem; padding: 0.6rem;">
                                            <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                                        </button>
                                    </form>
                                    <div class="text-center mt-3">
                                        <a href="#" style="color: rgba(255,255,255,0.5); font-size: 0.9rem; text-decoration: none;">Forgot password?</a>
                                        <span style="color: rgba(255,255,255,0.2); margin: 0 0.5rem;">|</span>
                                        <a href="#" style="color: rgba(255,255,255,0.5); font-size: 0.9rem; text-decoration: none;">Create account</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                document.body.insertAdjacentHTML('beforeend', modalHTML);
                
                // Initialize and show the modal
                const modalElement = document.querySelector('#loginModal');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();

                // Handle login form submission
                const loginForm = document.querySelector('#loginForm');
                if (loginForm) {
                    loginForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const email = document.querySelector('#loginEmail').value;
                        const password = document.querySelector('#loginPassword').value;
                        
                        if (email && password) {
                            // Simple demo feedback
                            alert(`Welcome back! (Demo login)\nEmail: ${email}`);
                            modal.hide();
                            // Optionally change button text
                            loginBtn.innerHTML = `<i class="bi bi-person-check me-1"></i>Logged In`;
                            loginBtn.style.background = '#2ecc71';
                            loginBtn.style.color = '#fff';
                            loginBtn.disabled = true;
                        } else {
                            alert('Please enter both email and password.');
                        }
                    });
                }

                // Clean up modal when hidden
                modalElement.addEventListener('hidden.bs.modal', function() {
                    if (document.querySelector('#loginModal')) {
                        document.querySelector('#loginModal').remove();
                    }
                });
            });
        }
    }

    // =============================================
    // 3. SEARCH BUTTON - Enhanced search functionality
    // =============================================
    const searchForm = document.querySelector('.d-flex[role="search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const query = searchInput.value.trim();
            
            if (query === '') {
                alert('Please enter a search term.');
                return;
            }

            // Simple search simulation
            const searchResults = performSearch(query);
            if (searchResults.length > 0) {
                let resultMessage = `🔍 Search results for "${query}":\n\n`;
                searchResults.forEach((result, index) => {
                    resultMessage += `${index + 1}. ${result}\n`;
                });
                alert(resultMessage);
            } else {
                alert(`No results found for "${query}".\nTry searching: oil, farming, community, history, culture, elite`);
            }
            
            searchInput.value = '';
        });

        // Also handle Enter key separately (already handled by form submit)
        const searchInput = searchForm.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchForm.dispatchEvent(new Event('submit'));
                }
            });
        }
    }

    // =============================================
    // 4. SEARCH FUNCTION - Simulated search data
    // =============================================
    function performSearch(query) {
        const searchableContent = [
            'Oil wells in Egbema Kingdom',
            'Farming communities and agriculture',
            'History and origin of Egbema',
            'Egbema culture and traditions',
            'Egbema elite members and leaders',
            'Contact Egbema Oil Kingdom',
            'Oil drilling equipment and rigs',
            'Palm oil production',
            'Niger Delta oil exploration',
            'Egbema community development',
            'Traditional farming tools',
            'Oil and gas innovation',
            'Ancestral farming traditions',
            'Egbema oil discovery 1956',
            'Pipeline network and infrastructure',
            'Egbema farmers cooperative',
            'Cultural bridge oil and farming'
        ];

        const lowerQuery = query.toLowerCase();
        return searchableContent.filter(item => 
            item.toLowerCase().includes(lowerQuery)
        );
    }

    // =============================================
    // 5. FOOTER - Dynamic Year
    // =============================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =============================================
    // 6. CARD INTERACTIONS - Click to show details
    // =============================================
    const equipmentCards = document.querySelectorAll('.equipment-card');
    const farmingCards = document.querySelectorAll('.farming-card');

    // Equipment cards
    equipmentCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on badge
            if (e.target.closest('.badge')) return;
            
            const title = this.querySelector('h5')?.textContent || 'Equipment';
            const desc = this.querySelector('p')?.textContent || 'No description';
            const badge = this.querySelector('.badge')?.textContent || 'Active';
            
            alert(`🛢️ ${title}\n\n${desc}\n\nStatus: ${badge}`);
        });
    });

    // Farming cards
    farmingCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.badge')) return;
            
            const title = this.querySelector('h5')?.textContent || 'Tool';
            const desc = this.querySelector('p')?.textContent || 'No description';
            const badge = this.querySelector('.badge')?.textContent || 'Available';
            
            alert(`🌿 ${title}\n\n${desc}\n\nUsage: ${badge}`);
        });
    });

    // =============================================
    // 7. STATS ANIMATION - Simple counter effect
    // =============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if we should animate (visible on page load)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                // Only animate if it's a number with + or other suffix
                const numMatch = text.match(/(\d+)/);
                if (numMatch) {
                    const targetNum = parseInt(numMatch[1]);
                    const suffix = text.replace(/\d+/, '');
                    animateNumber(el, targetNum, suffix);
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => {
        observer.observe(el);
    });

    function animateNumber(element, target, suffix = '') {
        const duration = 1000;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutQuad)
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * target);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(update);
    }

    // =============================================
    // 8. DROPDOWN - Fix for Bootstrap dropdowns
    // =============================================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Bootstrap handles this, but we prevent default if needed
            // This ensures dropdown works properly with our other handlers
        });
    });

    // =============================================
    // 9. CONSOLE INFO - Developer credit
    // =============================================
    console.log('%c Egbema Oil Kingdom ', 'background: #0b1a2e; color: #facc15; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 4px;');
    console.log('%c Developed by: Engr. Kenneth Iyke Amadi ', 'background: #1a3148; color: #fff; font-size: 12px; padding: 4px 8px; border-radius: 4px;');
    console.log('%c +234 7038716096 ', 'color: #facc15; font-size: 12px;');

    // =============================================
    // 10. KEYBOARD SHORTCUTS
    // =============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+L or Alt+L - Open Login
        if ((e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L')) || 
            (e.altKey && (e.key === 'l' || e.key === 'L'))) {
            e.preventDefault();
            if (loginBtn) {
                loginBtn.click();
            }
        }
        
        // Ctrl+Shift+S or Alt+S - Focus Search
        if ((e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S')) || 
            (e.altKey && (e.key === 's' || e.key === 'S'))) {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Escape - Close any open modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modal = bootstrap.Modal.getInstance(openModal);
                if (modal) {
                    modal.hide();
                }
            }
        }
    });

    // =============================================
    // 11. SMOOTH SCROLL FOR NAV LINKS (same page)
    // =============================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // =============================================
    // 12. RESPONSIVE MENU - Fix for overlapping
    // =============================================
    function handleMenuOverflow() {
        if (window.innerWidth <= 768) {
            const navBar = document.querySelector('.navbar .container-fluid');
            if (navBar) {
                // Ensure the toggler and brand are properly positioned
                const brand = navBar.querySelector('.navbar-brand');
                const toggler = navBar.querySelector('.navbar-toggler');
                if (brand && toggler) {
                    // No extra styling needed - Bootstrap handles it
                }
            }
        }
    }

    // Run on load and resize
    handleMenuOverflow();
    window.addEventListener('resize', handleMenuOverflow);

    console.log('✅ Egbema Oil Kingdom loaded successfully!');
});
