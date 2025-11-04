// Auto Sync for CuraFam
(function() {
    console.log('🚀 Auto-sync loading...');
    
    // Simple cross-device sync
    function syncData() {
        const questions = JSON.parse(localStorage.getItem('curafam_questions') || '[]');
        
        // Use URL hash for sharing
        if (questions.length > 0) {
            const lastQuestion = questions[0];
            const shareData = btoa(JSON.stringify([lastQuestion]));
            
            // Update URL without reload
            if (window.location.hash !== '#q=' + shareData) {
                history.replaceState(null, null, '#q=' + shareData);
            }
        }
        
        // Load from URL hash
        if (window.location.hash.startsWith('#q=')) {
            try {
                const hashData = window.location.hash.substring(3);
                const sharedQuestions = JSON.parse(atob(hashData));
                
                const localQuestions = JSON.parse(localStorage.getItem('curafam_questions') || '[]');
                
                // Merge questions
                sharedQuestions.forEach(newQ => {
                    if (!localQuestions.find(q => q.id === newQ.id)) {
                        localQuestions.unshift(newQ);
                    }
                });
                
                localStorage.setItem('curafam_questions', JSON.stringify(localQuestions));
                console.log('✅ Questions synced from URL');
                
                // Update UI
                if (typeof loadRecentQA === 'function') {
                    loadRecentQA();
                }
            } catch (e) {
                console.log('Could not load shared data');
            }
        }
    }
    
    // Override addQuestion
    if (window.localDB) {
        const origAdd = window.localDB.addQuestion;
        window.localDB.addQuestion = function(data) {
            const result = origAdd.call(this, data);
            setTimeout(syncData, 500);
            return result;
        };
    }
    
    // Auto sync every 5 seconds
    setInterval(syncData, 5000);
    
    // Sync on load
    setTimeout(syncData, 1000);
    
    console.log('✅ Auto-sync active');
})();
