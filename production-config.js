// Production Configuration
const PRODUCTION_CONFIG = {
    // Replace with your actual production API URL
    API_URL: 'https://your-backend-api.herokuapp.com',
    
    // Alternative hosting options:
    // Render: 'https://your-app-name.onrender.com'
    // Railway: 'https://your-app-name.up.railway.app'
    // Vercel: 'https://your-app-name.vercel.app'
    
    // MongoDB Atlas connection (already configured in server.js)
    MONGODB_URI: 'mongodb+srv://tafsirultalukdarluvdo_db_user:zQ9SiqkGQK7gCebT@cluster0.ggkbd2f.mongodb.net/curafam',
    
    // CORS settings for production
    ALLOWED_ORIGINS: [
        'https://your-domain.com',
        'https://your-github-pages.github.io'
    ]
};

// Auto-detect environment and set API base
const getApiBase = () => {
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:3005';
    } else {
        return PRODUCTION_CONFIG.API_URL;
    }
};

// Export for use in other files
window.PRODUCTION_CONFIG = PRODUCTION_CONFIG;
window.getApiBase = getApiBase;