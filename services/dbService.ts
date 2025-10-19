import { User, LogEntry } from '../types';

const USERS_KEY = 'sap_extraction_users';
const LOGS_KEY = 'sap_extraction_logs';

// --- User Management ---

const defaultUser: User = { name: 'Mark Leis', password: '123' };

export const dbService = {
    getUsers: (): User[] => {
        try {
            const usersJson = localStorage.getItem(USERS_KEY);
            if (!usersJson) {
                // If no users exist, create the default admin and save it
                const initialUsers = [defaultUser];
                localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
                return initialUsers;
            }
            return JSON.parse(usersJson);
        } catch (error) {
            console.error("Error retrieving users from localStorage", error);
            // On error, reset to default
            const initialUsers = [defaultUser];
            localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
            return initialUsers;
        }
    },

    saveUsers: (users: User[]): void => {
        try {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        } catch (error) {
            console.error("Error saving users to localStorage", error);
        }
    },
    
    addUser: (newUser: User): { success: boolean, error?: string } => {
        const users = dbService.getUsers();
        const userExists = users.some(u => u.name.toLowerCase() === newUser.name.toLowerCase());
        if (userExists) {
            return { success: false, error: 'An account with this name already exists.' };
        }
        const updatedUsers = [...users, newUser];
        dbService.saveUsers(updatedUsers);
        return { success: true };
    },

    // --- Log Management ---

    getAllLogs: (): LogEntry[] => {
        try {
            const logsJson = localStorage.getItem(LOGS_KEY);
            if (!logsJson) {
                return [];
            }
            // Dates are stored as strings in JSON, so we need to convert them back
            const parsedLogs = JSON.parse(logsJson);
            return parsedLogs.map((log: any) => ({
                ...log,
                timestamp: new Date(log.timestamp),
            }));
        } catch (error) {
            console.error("Error retrieving logs from localStorage", error);
            return [];
        }
    },
    
    saveLogs: (logs: LogEntry[]): void => {
        try {
            localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
        } catch (error) {
            console.error("Error saving logs to localStorage", error);
        }
    },

    addLog: (newLog: LogEntry): void => {
        const logs = dbService.getAllLogs();
        const updatedLogs = [newLog, ...logs.slice(0, 499)]; // Keep up to 500 logs
        dbService.saveLogs(updatedLogs);
    }
};