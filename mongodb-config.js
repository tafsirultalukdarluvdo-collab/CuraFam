// MongoDB Configuration
const { MongoClient } = require('mongodb');

class MongoDatabase {
    constructor() {
        this.uri = 'mongodb://localhost:27017'; // Local MongoDB
        // For cloud: 'mongodb+srv://username:password@cluster.mongodb.net'
        this.dbName = 'curafam_db';
        this.client = null;
        this.db = null;
    }

    async connect() {
        try {
            this.client = new MongoClient(this.uri);
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            console.log('MongoDB connected successfully');
            return true;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            return false;
        }
    }

    // Doctor registration
    async registerDoctor(doctorData) {
        try {
            const collection = this.db.collection('doctors');
            const result = await collection.insertOne({
                ...doctorData,
                registeredAt: new Date(),
                deviceInfo: this.getDeviceInfo()
            });
            return result.insertedId;
        } catch (error) {
            console.error('Doctor registration error:', error);
            throw error;
        }
    }

    // Get all doctors from all devices
    async getAllDoctors() {
        try {
            const collection = this.db.collection('doctors');
            const doctors = await collection.find({}).toArray();
            return doctors;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            return [];
        }
    }

    // Get doctors by device
    async getDoctorsByDevice(deviceId) {
        try {
            const collection = this.db.collection('doctors');
            const doctors = await collection.find({ 
                'deviceInfo.deviceId': deviceId 
            }).toArray();
            return doctors;
        } catch (error) {
            console.error('Error fetching doctors by device:', error);
            return [];
        }
    }

    // Get device info
    getDeviceInfo() {
        return {
            deviceId: this.generateDeviceId(),
            userAgent: navigator.userAgent,
            timestamp: new Date(),
            ip: 'auto-detected'
        };
    }

    generateDeviceId() {
        return localStorage.getItem('deviceId') || 
               (() => {
                   const id = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                   localStorage.setItem('deviceId', id);
                   return id;
               })();
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
        }
    }
}

module.exports = MongoDatabase;