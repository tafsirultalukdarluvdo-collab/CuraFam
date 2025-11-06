// Public hosting configuration
const config = {
    // For local development
    local: {
        apiUrl: 'http://localhost:3005',
        mongoUrl: 'mongodb://localhost:27017/curafam'
    },
    
    // For public hosting (Heroku, Vercel, etc.)
    production: {
        apiUrl: process.env.API_URL || 'https://your-app.herokuapp.com',
        mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/curafam'
    }
};

// Auto detect environment
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const currentConfig = isProduction ? config.production : config.local;

// Export config
window.APP_CONFIG = currentConfig;