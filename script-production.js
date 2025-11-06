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

// Update homepage statistics from MongoDB API
async function updateStats() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`);
        if (response.ok) {
            const stats = await response.json();
            
            // Update all statistics elements
            updateElement('totalDoctors', stats.totalDoctors);
            updateElement('publicTotalDoctors', stats.totalDoctors);
            updateElement('totalQuestions', stats.totalQuestions);
            updateElement('publicTotalQuestions', stats.totalQuestions);
            updateElement('answeredQuestions', stats.answeredQuestions);
            updateElement('publicAnsweredQuestions', stats.answeredQuestions);
            
            const successRate = stats.totalQuestions > 0 ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100) : 0;
            updateElement('successRate', successRate + '%');
            updateElement('publicSuccessRate', successRate + '%');
            
            console.log('Stats updated from MongoDB:', stats);
        } else {
            updateStatsFromLocal();
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
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
function hideLoading(element) {
    if (element) {
        element.disabled = false;
    }
}