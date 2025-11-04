// Simple data sync for CuraFam
(function() {
    const SYNC_URL = 'https://api.jsonbin.io/v3/b/673d2e8bad19ca34f8c8f8a1';
    
    // Load shared data
    async function loadSharedData() {
        try {
            const response = await fetch(SYNC_URL + '/latest');
            if (response.ok) {
                const data = await response.json();
                if (data.record && data.record.questions) {
                    localStorage.setItem('curafam_questions', JSON.stringify(data.record.questions));
                }
                if (data.record && data.record.doctors) {
                    localStorage.setItem('curafam_doctors', JSON.stringify(data.record.doctors));
                }
            }
        } catch (e) {
            console.log('Using local data');
        }
    }
    
    // Save to shared storage
    async function saveSharedData() {
        try {
            const questions = JSON.parse(localStorage.getItem('curafam_questions') || '[]');
            const doctors = JSON.parse(localStorage.getItem('curafam_doctors') || '[]');
            
            await fetch(SYNC_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questions, doctors })
            });
        } catch (e) {
            console.log('Could not sync data');
        }
    }
    
    // Override existing functions
    if (window.localDB) {
        const origAdd = window.localDB.addQuestion;
        window.localDB.addQuestion = function(data) {
            const result = origAdd.call(this, data);
            saveSharedData();
            return result;
        };
        
        const origReg = window.localDB.registerDoctor;
        window.localDB.registerDoctor = function(data) {
            const result = origReg.call(this, data);
            saveSharedData();
            return result;
        };
    }
    
    // Load data on page load
    loadSharedData();
    
    // Refresh every 30 seconds
    setInterval(loadSharedData, 30000);
})();
