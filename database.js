// Updated Database class to use MongoDB API
class DatabaseAPI {
    constructor() {
        this.baseURL = window.location.origin;
    }

    async addQuestion(questionData) {
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
        try {
            const response = await fetch(`${this.baseURL}/api/questions`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    }

    async addDoctor(doctorData) {
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