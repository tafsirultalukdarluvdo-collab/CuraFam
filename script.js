// Global variables

// LocalDatabase class for managing local storage
class LocalDatabase {
    constructor() {
        this.doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        this.questions = JSON.parse(localStorage.getItem('questions') || '[]');
    }

    getAllDoctors() {
        return this.doctors;
    }

    getAllQuestions() {
        return this.questions;
    }

    addDoctor(doctor) {
        this.doctors.push(doctor);
        localStorage.setItem('doctors', JSON.stringify(this.doctors));
    }

    addQuestion(question) {
        this.questions.push(question);
        localStorage.setItem('questions', JSON.stringify(this.questions));
    }

    updateQuestion(id, updatedQuestion) {
        const index = this.questions.findIndex(q => q.id === id);
        if (index !== -1) {
            this.questions[index] = { ...this.questions[index], ...updatedQuestion };
            localStorage.setItem('questions', JSON.stringify(this.questions));
        }
    }
}

// Global variables
let database;
let isDarkMode = false;

// API configuration for production
const API_BASE = 'https://curafam.onrender.com';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    database = new LocalDatabase();
    updateStats();
    
    // Auto refresh stats every 30 seconds
    setInterval(updateStats, 30000);
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
    
    // Add click handlers for all buttons
    addClickHandlers();
});

// Add click handlers for buttons and links
function addClickHandlers() {
    // Service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('h3').textContent;
            if (text.includes('প্রশ্ন') || text.includes('Ask')) {
                window.location.href = 'ask-question.html';
            } else if (text.includes('ব্রাউজ') || text.includes('Browse')) {
                window.location.href = 'browse-qa.html';
            } else if (text.includes('জরুরি') || text.includes('Emergency')) {
                window.location.href = 'emergency.html';
            }
        });
    });
    
    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            if (text.includes('প্রশ্ন') || text.includes('Ask')) {
                window.location.href = 'ask-question.html';
            } else if (text.includes('ব্রাউজ') || text.includes('Browse')) {
                window.location.href = 'browse-qa.html';
            } else if (text.includes('জরুরি') || text.includes('Emergency')) {
                window.location.href = 'emergency.html';
            }
        });
    });
    
    // Doctor buttons
    document.querySelectorAll('.doctor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            if (text.includes('লগইন') || text.includes('Login')) {
                window.location.href = 'doctor-portal.html';
            } else if (text.includes('রেজিস্ট্রেশন') || text.includes('Register')) {
                window.location.href = 'doctor-register-quick.html';
            }
        });
    });
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Three dot menu toggle
function toggleThreeDotMenu() {
    const dropdown = document.querySelector('.three-dot-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Add three dot menu click handler
document.addEventListener('DOMContentLoaded', function() {
    const threeDotBtn = document.querySelector('.three-dot-btn');
    if (threeDotBtn) {
        threeDotBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleThreeDotMenu();
        });
    }
});

// Close three dot menu when clicking outside
document.addEventListener('click', function(event) {
    const threeDotMenu = document.querySelector('.three-dot-menu');
    const dropdown = document.getElementById('threeDotDropdown');
    
    if (!threeDotMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Dark mode toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update button text
    const darkModeBtn = document.querySelector('.three-dot-dropdown a[onclick="toggleDarkMode()"]');
    if (darkModeBtn) {
        darkModeBtn.innerHTML = isDarkMode ? '☀️ লাইট মোড' : '🌙 ডার্ক মোড';
    }
}

// Share website
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'CuraFam - আপনার পরিবারের স্বাস্থ্য সেবা',
            text: 'বিনামূল্যে চিকিৎসা পরামর্শ পান মানুষ ও পশুর জন্য',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('ওয়েবসাইটের লিংক কপি হয়েছে!');
        }).catch(() => {
            // Fallback if clipboard API is not available
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('ওয়েবসাইটের লিংক কপি হয়েছে!');
        });
    }
}

// Admin login modal
function showAdminLogin() {
    document.getElementById('adminModal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.getElementById('adminLoginForm').reset();
}

// Admin login form handler
document.addEventListener('DOMContentLoaded', function() {
    const adminForm = document.getElementById('adminLoginForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            // Check credentials
            if (username === '01341860370' && password === 'luvdo1468') {
                alert('অ্যাডমিন লগইন সফল হয়েছে!');
                closeAdminModal();
                // Redirect to admin panel
                window.location.href = 'check-data.html';
            } else {
                alert('ভুল ইউজারনেম বা পাসওয়ার্ড!');
            }
        });
    }
});

// Update homepage statistics from MongoDB API
async function updateStats() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const stats = await response.json();
            
            // Update all statistics elements
            updateElement('totalDoctors', stats.totalDoctors);
            updateElement('publicTotalDoctors', stats.totalDoctors);
            updateElement('totalQuestions', stats.totalQuestions);
            updateElement('publicTotalQuestions', stats.totalQuestions);
            updateElement('answeredQuestions', stats.answeredQuestions);
            updateElement('publicAnsweredQuestions', stats.answeredQuestions);
            
            // Calculate and update success rate
            const successRate = stats.totalQuestions > 0 ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100) : 0;
            updateElement('successRate', successRate + '%');
            updateElement('publicSuccessRate', successRate + '%');
            
            console.log('Stats updated from MongoDB:', stats);
        } else {
            console.error('Failed to fetch stats from API');
            // Fallback to local database
            updateStatsFromLocal();
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to local database
        updateStatsFromLocal();
    }
}

// Fallback function for local database
function updateStatsFromLocal() {
    if (database) {
        const doctors = database.getAllDoctors();
        const questions = database.getAllQuestions();
        const answeredQuestions = questions.filter(q => q.answer);
        
        updateElement('totalDoctors', doctors.length);
        updateElement('publicTotalDoctors', doctors.length);
        updateElement('totalQuestions', questions.length);
        updateElement('publicTotalQuestions', questions.length);
        updateElement('answeredQuestions', answeredQuestions.length);
        updateElement('publicAnsweredQuestions', answeredQuestions.length);
        
        const successRate = questions.length > 0 ? Math.round((answeredQuestions.length / questions.length) * 100) : 0;
        updateElement('successRate', successRate + '%');
        updateElement('publicSuccessRate', successRate + '%');
    }
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9+\-\s()]+$/;
    return re.test(phone) && phone.length >= 10;
}

function validateBMDCNumber(bmdc) {
    // Basic validation for BMDC number (should be numeric and reasonable length)
    const re = /^[0-9]+$/;
    return re.test(bmdc) && bmdc.length >= 4 && bmdc.length <= 10;
}

// Show loading state
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading"></div> লোড হচ্ছে...';
        element.disabled = true;
    }
}

// Hide loading state
function hideLoading(element, originalText = 'সাবমিট করুন') {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

// Health type selection dropdown
function createHealthTypeDropdown(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <select id="healthTypeSelect" style="padding: 0.8rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; width: 100%;">
                <option value="human">👨 মানুষের স্বাস্থ্য</option>
                <option value="animal">🐶 পশুর স্বাস্থ্য</option>
            </select>
        `;
    }
}

// Get selected health type
function getSelectedHealthType() {
    const select = document.getElementById('healthTypeSelect');
    return select ? select.value : 'human';
}e
function hideLoading(element, originalText = 'সাবমিট করুন') {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}e
function hideLoading(element, originalText) {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

// Show message to user
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(messageDiv, main.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'আজ';
    } else if (diffDays === 2) {
        return 'গতকাল';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} দিন আগে`;
    } else {
        return date.toLocaleDateString('bn-BD');
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Check if user is on mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Handle back button for single page navigation
window.addEventListener('popstate', function(event) {
    // Handle browser back/forward buttons if needed
    console.log('Navigation state changed');
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Service Worker registration for PWA (if needed in future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics and error tracking (placeholder)
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // In production, send error to analytics service
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes modals
    if (event.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="block"]');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Close dropdowns
        const dropdown = document.querySelector('.three-dot-dropdown.show');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Export data functionality (for admin)
function exportData() {
    if (!database) return;
    
    const data = {
        doctors: database.getAllDoctors(),
        questions: database.getAllQuestions(),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `curafam-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Initialize tooltips (if using a tooltip library)
function initializeTooltips() {
    // Placeholder for tooltip initialization
    console.log('Tooltips initialized');
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Console welcome message
console.log('%cCuraFam Medical Platform', 'color: #2c5530; font-size: 20px; font-weight: bold;');
console.log('%cআপনার পরিবারের স্বাস্থ্য সেবা', 'color: #4a7c59; font-size: 14px;');
console.log('Version: 1.0.0');
console.log('Developed with ❤️ for healthcare accessibility');