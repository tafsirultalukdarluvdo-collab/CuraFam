// Add this to your frontend files for fallback
async function updateStatsWithFallback() {
    try {
        const response = await fetch('https://curafam.onrender.com/api/stats');
        if (response.ok) {
            const stats = await response.json();
            updateElement('publicTotalQuestions', stats.totalQuestions);
            updateElement('publicAnsweredQuestions', stats.answeredQuestions);
            updateElement('publicTotalDoctors', stats.totalDoctors);
            updateElement('publicSuccessRate', stats.successRate + '%');
        } else {
            // Fallback values
            updateElement('publicTotalQuestions', '0');
            updateElement('publicAnsweredQuestions', '0');
            updateElement('publicTotalDoctors', '0');
            updateElement('publicSuccessRate', '0%');
        }
    } catch (error) {
        console.error('API Error:', error);
        // Show fallback values
        updateElement('publicTotalQuestions', '0');
        updateElement('publicAnsweredQuestions', '0');
        updateElement('publicTotalDoctors', '0');
        updateElement('publicSuccessRate', '0%');
    }
}