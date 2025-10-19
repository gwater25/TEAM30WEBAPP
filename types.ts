// --- BACKEND INTEGRATION POINT ---
// This file defines the data structures and enumerations that form the contract
// between the frontend and the backend. The backend API and real-time data stream
// should return objects that conform to these interfaces to ensure compatibility.

export enum Status {
    OPERATIONAL = 'OPERATIONAL',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    INITIALIZING = 'INITIALIZING',
    OFFLINE = 'OFFLINE',
}

export interface MachineStatus {
    status: Status;
    temperature: number;
    pressure: number;
    sapFlowRate: number;
    tankLevel: number; // Percentage
    extractorRPM: number;
}

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    USER = 'USER'
}

export interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    message: string;
    operatorName?: string;
}

export interface HistoricalData {
    time: string;
    flowRate: number;
}

export interface User {
    name: string;
    password: string; // Note: In a real app, the password would never be stored or sent to the client.
}