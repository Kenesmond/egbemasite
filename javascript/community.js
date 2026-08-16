document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SET CURRENT YEAR IN FOOTER =====
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== COMMUNITIES DATA FOR SEARCH/FILTER =====
    const communities = [
        { name: 'Mmahu', category: 'Cultural Hub', location: 'Central Egbema' },
        { name: 'Abacheke', category: 'Hunting', location: 'Northern Egbema' },
        { name: 'Obiakpu', category: 'Blacksmithing', location: 'Eastern Egbema' },
        { name: 'Umuorji', category: 'Agriculture', location: 'Southern Egbema' },
        { name: 'Obeakpu', category: 'Agriculture', location: 'Western Egbema' },
        { name: 'Abaezi', category: 'Agriculture', location: 'Western Egbema' },
        { name: 'Opuoma', category: 'Arts & Crafts', location: 'Central Egbema' },
        { name: 'Obokofia', category: 'Arts & Crafts', location: 'Eastern Egbema' },
        { name: 'Ofuruola', category: 'Medicine', location: 'Western Egbema' },
        { name: 'Mgbara', category: 'Fishing', location: 'Northern Egbema' },
        { name: 'Ekugba', category: 'Agriculture', location: 'Central Egbema' },
        { name: 'Etekwuru', category: 'Trade', location: 'Southern Egbema' },
        { name: 'Umudike', category: 'Warrior', location: 'Eastern Egbema' },
        { name: 'Okwuzi', category: 'Fishing', location: 'Eastern Egbema' },
        { name: 'Mgbede', category: 'Salt Making', location: 'Western Egbema' },
        { name: 'Aggah', category: 'Arts & Crafts', location: 'Central Egbema' },
        { name: 'Egbema Central', category: 'Administrative', location: 'Central Egbema' }
    ];

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.querySelector('input[type="search"]');
    const communityCards = document.querySelectorAll('.row > div');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = this.value.toLowerCase().trim();
            
            communityCards.forEach((card, index) => {
                const communityName = card.querySelector('h4')?.textContent?.toLowerCase() || '';
                const communityText = card.textContent?.toLowerCase() || '';
                
                if (searchTerm === '' || communityName.includes(searchTerm) || communityText.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Add a subtle highlight animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.3s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide "no results" message
            let visibleCards = document.querySelectorAll('.row > div[style*="display: block"]');
            let noResultsMsg = document.querySelector('.no-results-message');
            
            if (visibleCards.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results-message alert alert-warning text-center';
                    noResultsMsg.innerHTML = '<i class="bi bi-search me-2"></i> No communities found matching "<strong>' + searchTerm + '</strong>"';
                    document.querySelector('.row').appendChild(noResultsMsg);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }

    // ===== SMOOTH SCROLL FOR COMMUNITY CARDS =====
    communityCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });

    // ===== ADD CSS ANIMATIONS =====
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .row > div {
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease forwards;
        }
        
        .row > div:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
        }
        
        .no-results-message {
            width: 100%;
            padding: 2rem;
            margin: 1rem 0;
            border-radius: 12px;
            background: #f8f9fa;
            border-left: 5px solid #f5c542;
        }
        
        /* Search input enhancement */
        input[type="search"] {
            transition: all 0.3s ease;
        }
        
        input[type="search"]:focus {
            border-color: #f5c542;
            box-shadow: 0 0 0 3px rgba(245, 197, 66, 0.2);
        }
        
        /* Community card stats highlight */
        .row > div p strong {
            color: #0b2b3b;
        }
        
        /* Responsive grid improvements */
        @media (max-width: 768px) {
            .row > div {
                padding: 1.2rem !important;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ===== COMMUNITY CATEGORY FILTER (optional enhancement) =====
    // Create filter buttons if they don't exist
    const comTitle = document.querySelector('.com');
    if (comTitle && !document.querySelector('.filter-buttons')) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons d-flex flex-wrap gap-2 mb-4 justify-content-center';
        filterContainer.innerHTML = `
            <button class="btn btn-outline-primary filter-btn active" data-filter="all">All Communities</button>
            <button class="btn btn-outline-primary filter-btn" data-filter="Agriculture">🌾 Agriculture</button>
            <button class="btn btn-outline-primary filter-btn" data-filter="Fishing">🎣 Fishing</button>
            <button class="btn btn-outline-primary filter-btn" data-filter="Arts & Crafts">🎨 Arts & Crafts</button>
            <button class="btn btn-outline-primary filter-btn" data-filter="Trade">🏪 Trade</button>
            <button class="btn btn-outline-primary filter-btn" data-filter="Cultural Hub">🏛️ Cultural Hub</button>
        `;
        comTitle.parentNode.insertBefore(filterContainer, comTitle.nextSibling);
        
        // Add filter button styles
        const filterStyle = document.createElement('style');
        filterStyle.textContent = `
            .filter-btn {
                border-radius: 30px;
                padding: 0.4rem 1.5rem;
                font-weight: 500;
                border-color: #d0dce8;
                color: #2a4a5a;
                transition: all 0.3s ease;
            }
            .filter-btn:hover {
                background: #f5c542;
                border-color: #f5c542;
                color: #0b1a26;
                transform: translateY(-2px);
            }
            .filter-btn.active {
                background: #f5c542;
                border-color: #f5c542;
                color: #0b1a26;
                font-weight: 600;
            }
        `;
        document.head.appendChild(filterStyle);
        
        // Filter button click handlers
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const cards = document.querySelectorAll('.row > div');
                
                cards.forEach(card => {
                    const cardText = card.textContent || '';
                    if (filter === 'all' || cardText.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Clear search input if filter is applied
                if (searchInput) {
                    searchInput.value = '';
                }
            });
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f5c542;
        color: #0b1a26;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(245, 197, 66, 0.4);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    document.body.appendChild(backToTop);
    
    // Add hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(245, 197, 66, 0.6)';
    });
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(245, 197, 66, 0.4)';
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== COMMUNITY STATS COUNTER (animated) =====
    // Animate the "16 Communities" stat if it exists
    const statNumbers = document.querySelectorAll('.stat-number, .stats .stat-number, .stat-item .stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const text = stat.textContent.trim();
            const numMatch = text.match(/(\d+)/);
            if (numMatch) {
                const target = parseInt(numMatch[1]);
                const suffix = text.replace(numMatch[0], '');
                let current = 0;
                const increment = Math.max(1, Math.floor(target / 30));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, 30);
            }
        });
    }

    // ===== KEYBOARD SHORTCUT: CTRL + / to focus search =====
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c🏛️ Egbema Oil Kingdom - Communities Page', 'font-size: 20px; font-weight: bold; color: #f5c542;');
    console.log('%c📌 17 Communities | 🌍 Imo & Rivers States', 'font-size: 14px; color: #2a4a5a;');
    console.log('%c🔍 Press Ctrl+/ to search', 'font-size: 12px; color: #666;');

    // ===== RESPONSIVE GRID ENHANCEMENT =====
    // Ensure cards are properly displayed on all screen sizes
    function adjustGrid() {
        const cards = document.querySelectorAll('.row > div');
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
        
        cards.forEach(card => {
            if (isMobile) {
                card.style.flex = '0 0 100%';
                card.style.maxWidth = '100%';
            } else if (isTablet) {
                card.style.flex = '0 0 45%';
                card.style.maxWidth = '45%';
            } else {
                card.style.flex = '0 0 30%';
                card.style.maxWidth = '30%';
            }
        });
    }
    
    window.addEventListener('resize', adjustGrid);
    adjustGrid();

    console.log('%c✅ Communities page loaded successfully!', 'font-size: 12px; color: #2e7d5e;');
});