// Updated Database class to use MongoDB API
class DatabaseAPI {
    constructor() {
        this.baseURL = window.location.origin;
        // Fallback to localStorage if server is not running
        this.useLocalStorage = false;
    }
    
    async checkServerConnection() {
        try {
            const response = await fetch(`${this.baseURL}/api/stats`);
            return response.ok;
        } catch (error) {
            this.useLocalStorage = true;
            return false;
        }
    }

    async addQuestion(questionData) {
        if (this.useLocalStorage || !(await this.checkServerConnection())) {
            // Fallback to localStorage
            const questions = JSON.parse(localStorage.getItem('curafam_questions') || '[]');
            const newQuestion = {
                _id: Date.now().toString(),
                ...questionData,
                createdAt: new Date().toISOString()
            };
            questions.unshift(newQuestion);
            localStorage.setItem('curafam_questions', JSON.stringify(questions));
            return newQuestion;
        }
        
        try {
            const response = await fetch(`${this.baseURL}/api/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding question:', error);
            throw error;
        }
    }

    async getQuestions() {
        if (this.useLocalStorage || !(await this.checkServerConnection())) {
            return JSON.parse(localStorage.getItem('curafam_questions') || '[]');
        }
        
        try {
            const response = await fetch(`${this.baseURL}/api/questions`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching questions:', error);
            return JSON.parse(localStorage.getItem('curafam_questions') || '[]');
        }
    }

    async addDoctor(doctorData) {
        if (this.useLocalStorage || !(await this.checkServerConnection())) {
            const doctors = JSON.parse(localStorage.getItem('curafam_doctors') || '[]');
            const newDoctor = {
                _id: Date.now().toString(),
                ...doctorData,
                createdAt: new Date().toISOString()
            };
            doctors.push(newDoctor);
            localStorage.setItem('curafam_doctors', JSON.stringify(doctors));
            return newDoctor;
        }
        
        try {
            const response = await fetch(`${this.baseURL}/api/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding doctor:', error);
            throw error;
        }
    }

    async getDoctors() {
        try {
            const response = await fetch(`${this.baseURL}/api/doctors`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return [];
        }
    }

    async getStats() {
        if (this.useLocalStorage || !(await this.checkServerConnection())) {
            const questions = JSON.parse(localStorage.getItem('curafam_questions') || '[]');
            const doctors = JSON.parse(localStorage.getItem('curafam_doctors') || '[]');
            const answeredQuestions = questions.filter(q => q.answer);
            const successRate = questions.length > 0 ? Math.round((answeredQuestions.length / questions.length) * 100) : 0;
            return {
                totalQuestions: questions.length,
                answeredQuestions: answeredQuestions.length,
                totalDoctors: doctors.length,
                successRate
            };
        }
        
        try {
            const response = await fetch(`${this.baseURL}/api/stats`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { totalQuestions: 0, answeredQuestions: 0, totalDoctors: 0, successRate: 0 };
        }
    }

    async answerQuestion(questionId, answer, answeredBy) {
        try {
            const response = await fetch(`${this.baseURL}/api/questions/${questionId}/answer`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer, answeredBy })
            });
            return await response.json();
        } catch (error) {
            console.error('Error answering question:', error);
            throw error;
        }
    }
}