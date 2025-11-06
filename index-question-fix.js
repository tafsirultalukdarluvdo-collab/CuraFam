// Add this to index.html question form handler
document.getElementById('questionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const questionData = {
        type: document.getElementById('questionType').value,
        title: document.getElementById('questionTitle').value,
        patientName: document.getElementById('patientName').value,
        description: document.getElementById('questionDesc').value,
        age: document.getElementById('patientAge').value
    };
    
    // Basic validation
    if (!questionData.patientName || !questionData.title || !questionData.description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    try {
        const API_BASE = 'https://curafam.onrender.com';
        const response = await fetch(`${API_BASE}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        });
        
        if (response.ok) {
            const question = await response.json();
            alert('আপনার প্রশ্ন সফলভাবে জমা হয়েছে! শীঘ্রই ডাক্তারদের কাছ থেকে উত্তর পাবেন।');
            
            this.reset();
            closeModal('askQuestionModal');
            
            // Refresh stats and questions
            if (typeof loadQuestions === 'function') loadQuestions();
            if (typeof loadPublicStats === 'function') loadPublicStats();
        } else {
            const errorData = await response.json();
            alert('প্রশ্ন জমা দিতে সমস্যা হয়েছে: ' + (errorData.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error submitting question:', error);
        alert('প্রশ্ন জমা দিতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।');
    }
});