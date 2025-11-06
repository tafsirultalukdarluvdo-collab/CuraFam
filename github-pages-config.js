// GitHub Pages compatible database (LocalStorage + Firebase)
class GitHubPagesDatabase {
    constructor() {
        this.isGitHubPages = window.location.hostname.includes('github.io');
        this.firebaseConfig = {
            apiKey: "your-api-key",
            authDomain: "curafam-db.firebaseapp.com",
            databaseURL: "https://curafam-db-default-rtdb.firebaseio.com",
            projectId: "curafam-db"
        };
    }

    // Use Firebase for GitHub Pages, LocalStorage for local
    async saveDoctor(doctorData) {
        if (this.isGitHubPages) {
            return this.saveToFirebase('doctors', doctorData);
        } else {
            return this.saveToLocal('doctors', doctorData);
        }
    }

    async getAllDoctors() {
        if (this.isGitHubPages) {
            return this.getFromFirebase('doctors');
        } else {
            return this.getFromLocal('doctors');
        }
    }

    saveToLocal(collection, data) {
        const existing = JSON.parse(localStorage.getItem(collection) || '[]');
        existing.push({...data, id: Date.now(), createdAt: new Date()});
        localStorage.setItem(collection, JSON.stringify(existing));
        return existing[existing.length - 1];
    }

    getFromLocal(collection) {
        return JSON.parse(localStorage.getItem(collection) || '[]');
    }

    async saveToFirebase(collection, data) {
        // Firebase implementation for GitHub Pages
        const response = await fetch(`${this.firebaseConfig.databaseURL}/${collection}.json`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, createdAt: new Date().toISOString()})
        });
        return response.json();
    }

    async getFromFirebase(collection) {
        const response = await fetch(`${this.firebaseConfig.databaseURL}/${collection}.json`);
        const data = await response.json();
        return data ? Object.values(data) : [];
    }
}

window.GitHubPagesDatabase = GitHubPagesDatabase;