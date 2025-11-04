// Local Database Class for CuraFam Medical Platform
class LocalDatabase {
    constructor() {
        this.storageKeys = {
            doctors: 'curafam_doctors',
            questions: 'curafam_questions',
            settings: 'curafam_settings'
        };
        
        this.initializeDatabase();
    }

    // Initialize database with empty arrays if not exists
    initializeDatabase() {
        if (!localStorage.getItem(this.storageKeys.doctors)) {
            localStorage.setItem(this.storageKeys.doctors, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(this.storageKeys.questions)) {
            localStorage.setItem(this.storageKeys.questions, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(this.storageKeys.settings)) {
            localStorage.setItem(this.storageKeys.settings, JSON.stringify({
                initialized: true,
                version: '1.0.0',
                createdAt: new Date().toISOString()
            }));
        }
    }

    // Doctor Management Methods
    addDoctor(doctorData) {
        try {
            const doctors = this.getAllDoctors();
            
            // Generate unique ID
            const newDoctor = {
                id: this.generateId(),
                ...doctorData,
                registeredAt: new Date().toISOString(),
                status: 'active'
            };
            
            doctors.push(newDoctor);
            localStorage.setItem(this.storageKeys.doctors, JSON.stringify(doctors));
            
            return { success: true, doctor: newDoctor };
        } catch (error) {
            console.error('Error adding doctor:', error);
            return { success: false, error: error.message };
        }
    }

    getAllDoctors() {
        try {
            const doctors = localStorage.getItem(this.storageKeys.doctors);
            return doctors ? JSON.parse(doctors) : [];
        } catch (error) {
            console.error('Error getting doctors:', error);
            return [];
        }
    }

    getDoctorById(id) {
        const doctors = this.getAllDoctors();
        return doctors.find(doctor => doctor.id === id);
    }

    getDoctorsByType(type) {
        const doctors = this.getAllDoctors();
        return doctors.filter(doctor => doctor.type === type);
    }

    updateDoctor(id, updateData) {
        try {
            const doctors = this.getAllDoctors();
            const doctorIndex = doctors.findIndex(doctor => doctor.id === id);
            
            if (doctorIndex === -1) {
                return { success: false, error: 'Doctor not found' };
            }
            
            doctors[doctorIndex] = {
                ...doctors[doctorIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.storageKeys.doctors, JSON.stringify(doctors));
            return { success: true, doctor: doctors[doctorIndex] };
        } catch (error) {
            console.error('Error updating doctor:', error);
            return { success: false, error: error.message };
        }
    }

    deleteDoctor(id) {
        try {
            const doctors = this.getAllDoctors();
            const filteredDoctors = doctors.filter(doctor => doctor.id !== id);
            
            localStorage.setItem(this.storageKeys.doctors, JSON.stringify(filteredDoctors));
            return { success: true };
        } catch (error) {
            console.error('Error deleting doctor:', error);
            return { success: false, error: error.message };
        }
    }

    // Question Management Methods
    addQuestion(questionData) {
        try {
            const questions = this.getAllQuestions();
            
            const newQuestion = {
                id: this.generateId(),
                ...questionData,
                askedAt: new Date().toISOString(),
                status: 'pending',
                answer: null,
                answeredBy: null,
                answeredAt: null
            };
            
            questions.push(newQuestion);
            localStorage.setItem(this.storageKeys.questions, JSON.stringify(questions));
            
            return { success: true, question: newQuestion };
        } catch (error) {
            console.error('Error adding question:', error);
            return { success: false, error: error.message };
        }
    }

    getAllQuestions() {
        try {
            const questions = localStorage.getItem(this.storageKeys.questions);
            return questions ? JSON.parse(questions) : [];
        } catch (error) {
            console.error('Error getting questions:', error);
            return [];
        }
    }

    getQuestionById(id) {
        const questions = this.getAllQuestions();
        return questions.find(question => question.id === id);
    }

    getQuestionsByType(type) {
        const questions = this.getAllQuestions();
        return questions.filter(question => question.type === type);
    }

    getAnsweredQuestions() {
        const questions = this.getAllQuestions();
        return questions.filter(question => question.answer);
    }

    getPendingQuestions() {
        const questions = this.getAllQuestions();
        return questions.filter(question => !question.answer);
    }

    answerQuestion(questionId, answerData) {
        try {
            const questions = this.getAllQuestions();
            const questionIndex = questions.findIndex(q => q.id === questionId);
            
            if (questionIndex === -1) {
                return { success: false, error: 'Question not found' };
            }
            
            questions[questionIndex] = {
                ...questions[questionIndex],
                answer: answerData.answer,
                answeredBy: answerData.doctorName,
                answeredAt: new Date().toISOString(),
                status: 'answered'
            };
            
            localStorage.setItem(this.storageKeys.questions, JSON.stringify(questions));
            return { success: true, question: questions[questionIndex] };
        } catch (error) {
            console.error('Error answering question:', error);
            return { success: false, error: error.message };
        }
    }

    updateQuestion(id, updateData) {
        try {
            const questions = this.getAllQuestions();
            const questionIndex = questions.findIndex(question => question.id === id);
            
            if (questionIndex === -1) {
                return { success: false, error: 'Question not found' };
            }
            
            questions[questionIndex] = {
                ...questions[questionIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.storageKeys.questions, JSON.stringify(questions));
            return { success: true, question: questions[questionIndex] };
        } catch (error) {
            console.error('Error updating question:', error);
            return { success: false, error: error.message };
        }
    }

    deleteQuestion(id) {
        try {
            const questions = this.getAllQuestions();
            const filteredQuestions = questions.filter(question => question.id !== id);
            
            localStorage.setItem(this.storageKeys.questions, JSON.stringify(filteredQuestions));
            return { success: true };
        } catch (error) {
            console.error('Error deleting question:', error);
            return { success: false, error: error.message };
        }
    }

    // Search and Filter Methods
    searchQuestions(searchTerm, type = null) {
        const questions = this.getAllQuestions();
        let filteredQuestions = questions;
        
        // Filter by type if specified
        if (type && type !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.type === type);
        }
        
        // Search in title and content
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredQuestions = filteredQuestions.filter(q => 
                q.title.toLowerCase().includes(term) || 
                q.content.toLowerCase().includes(term) ||
                (q.answer && q.answer.toLowerCase().includes(term))
            );
        }
        
        // Sort by date (newest first)
        return filteredQuestions.sort((a, b) => new Date(b.askedAt) - new Date(a.askedAt));
    }

    searchDoctors(searchTerm, type = null) {
        const doctors = this.getAllDoctors();
        let filteredDoctors = doctors;
        
        // Filter by type if specified
        if (type && type !== 'all') {
            filteredDoctors = filteredDoctors.filter(d => d.type === type);
        }
        
        // Search in name and specialization
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredDoctors = filteredDoctors.filter(d => 
                d.name.toLowerCase().includes(term) || 
                d.specialization.toLowerCase().includes(term) ||
                d.email.toLowerCase().includes(term)
            );
        }
        
        return filteredDoctors;
    }

    // Statistics Methods
    getStatistics() {
        const doctors = this.getAllDoctors();
        const questions = this.getAllQuestions();
        
        return {
            doctors: {
                total: doctors.length,
                human: doctors.filter(d => d.type === 'human').length,
                animal: doctors.filter(d => d.type === 'animal').length,
                active: doctors.filter(d => d.status === 'active').length
            },
            questions: {
                total: questions.length,
                human: questions.filter(q => q.type === 'human').length,
                animal: questions.filter(q => q.type === 'animal').length,
                answered: questions.filter(q => q.answer).length,
                pending: questions.filter(q => !q.answer).length
            },
            storage: this.getStorageInfo()
        };
    }

    getStorageInfo() {
        try {
            const doctorsData = localStorage.getItem(this.storageKeys.doctors) || '[]';
            const questionsData = localStorage.getItem(this.storageKeys.questions) || '[]';
            const settingsData = localStorage.getItem(this.storageKeys.settings) || '{}';
            
            const totalSize = new Blob([doctorsData + questionsData + settingsData]).size;
            const maxSize = 5 * 1024 * 1024; // 5MB typical localStorage limit
            
            return {
                used: totalSize,
                max: maxSize,
                percentage: Math.round((totalSize / maxSize) * 100),
                usedMB: (totalSize / (1024 * 1024)).toFixed(2),
                maxMB: (maxSize / (1024 * 1024)).toFixed(2)
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return {
                used: 0,
                max: 5242880,
                percentage: 0,
                usedMB: '0.00',
                maxMB: '5.00'
            };
        }
    }

    // Utility Methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    exportData() {
        try {
            const data = {
                doctors: this.getAllDoctors(),
                questions: this.getAllQuestions(),
                settings: JSON.parse(localStorage.getItem(this.storageKeys.settings) || '{}'),
                exportedAt: new Date().toISOString(),
                version: '1.0.0'
            };
            
            return { success: true, data };
        } catch (error) {
            console.error('Error exporting data:', error);
            return { success: false, error: error.message };
        }
    }

    importData(importData) {
        try {
            if (importData.doctors) {
                localStorage.setItem(this.storageKeys.doctors, JSON.stringify(importData.doctors));
            }
            
            if (importData.questions) {
                localStorage.setItem(this.storageKeys.questions, JSON.stringify(importData.questions));
            }
            
            if (importData.settings) {
                localStorage.setItem(this.storageKeys.settings, JSON.stringify(importData.settings));
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, error: error.message };
        }
    }

    clearAllData() {
        try {
            localStorage.removeItem(this.storageKeys.doctors);
            localStorage.removeItem(this.storageKeys.questions);
            localStorage.removeItem(this.storageKeys.settings);
            
            this.initializeDatabase();
            return { success: true };
        } catch (error) {
            console.error('Error clearing data:', error);
            return { success: false, error: error.message };
        }
    }

    // Backup and Restore Methods
    createBackup() {
        const exportResult = this.exportData();
        if (exportResult.success) {
            const backupData = JSON.stringify(exportResult.data);
            const backupKey = `curafam_backup_${new Date().toISOString().split('T')[0]}`;
            
            try {
                localStorage.setItem(backupKey, backupData);
                return { success: true, backupKey };
            } catch (error) {
                return { success: false, error: 'Storage full - cannot create backup' };
            }
        }
        
        return exportResult;
    }

    getBackups() {
        const backups = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('curafam_backup_')) {
                const date = key.replace('curafam_backup_', '');
                backups.push({ key, date });
            }
        }
        
        return backups.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    restoreBackup(backupKey) {
        try {
            const backupData = localStorage.getItem(backupKey);
            if (!backupData) {
                return { success: false, error: 'Backup not found' };
            }
            
            const data = JSON.parse(backupData);
            return this.importData(data);
        } catch (error) {
            console.error('Error restoring backup:', error);
            return { success: false, error: error.message };
        }
    }

    // Validation Methods
    validateDoctor(doctorData) {
        const errors = [];
        
        if (!doctorData.name || doctorData.name.trim().length < 2) {
            errors.push('নাম কমপক্ষে ২ অক্ষরের হতে হবে');
        }
        
        if (!doctorData.email || !this.isValidEmail(doctorData.email)) {
            errors.push('বৈধ ইমেইল ঠিকানা প্রয়োজন');
        }
        
        if (!doctorData.phone || doctorData.phone.length < 10) {
            errors.push('বৈধ ফোন নম্বর প্রয়োজন');
        }
        
        if (!doctorData.specialization || doctorData.specialization.trim().length < 2) {
            errors.push('বিশেষত্ব উল্লেখ করুন');
        }
        
        if (!doctorData.type || !['human', 'animal'].includes(doctorData.type)) {
            errors.push('চিকিৎসার ধরন নির্বাচন করুন');
        }
        
        // Check for duplicate email
        const existingDoctors = this.getAllDoctors();
        if (existingDoctors.some(d => d.email === doctorData.email)) {
            errors.push('এই ইমেইল দিয়ে ইতিমধ্যে নিবন্ধন হয়েছে');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    validateQuestion(questionData) {
        const errors = [];
        
        if (!questionData.title || questionData.title.trim().length < 5) {
            errors.push('প্রশ্নের শিরোনাম কমপক্ষে ৫ অক্ষরের হতে হবে');
        }
        
        if (!questionData.content || questionData.content.trim().length < 10) {
            errors.push('প্রশ্নের বিস্তারিত কমপক্ষে ১০ অক্ষরের হতে হবে');
        }
        
        if (!questionData.type || !['human', 'animal'].includes(questionData.type)) {
            errors.push('প্রশ্নের ধরন নির্বাচন করুন');
        }
        
        if (!questionData.patientName || questionData.patientName.trim().length < 2) {
            errors.push('রোগীর নাম প্রয়োজন');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Performance optimization methods
    cleanupOldData(daysOld = 365) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);
            
            const questions = this.getAllQuestions();
            const filteredQuestions = questions.filter(q => 
                new Date(q.askedAt) > cutoffDate
            );
            
            localStorage.setItem(this.storageKeys.questions, JSON.stringify(filteredQuestions));
            
            return {
                success: true,
                removed: questions.length - filteredQuestions.length
            };
        } catch (error) {
            console.error('Error cleaning up old data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize global database instance
if (typeof window !== 'undefined') {
    window.LocalDatabase = LocalDatabase;
}