// MongoDB API only - no localStorage
class DatabaseAPI {
    constructor() {
        this.baseURL = window.location.origin;
    }

    async addQuestion(questionData) {
        const response = await fetch(`${this.baseURL}/api/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionData)
        });
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }

    async getQuestions() {
        const response = await fetch(`${this.baseURL}/api/questions`);
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }

    async addDoctor(doctorData) {
        const response = await fetch(`${this.baseURL}/api/doctors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctorData)
        });
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }

    async getDoctors() {
        const response = await fetch(`${this.baseURL}/api/doctors`);
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }

    async getStats() {
        const response = await fetch(`${this.baseURL}/api/stats`);
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }

    async answerQuestion(questionId, answer, answeredBy) {
        const response = await fetch(`${this.baseURL}/api/questions/${questionId}/answer`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer, answeredBy })
        });
        if (!response.ok) throw new Error('Server error');
        return await response.json();
    }
}