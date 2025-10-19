// --- BACKEND INTEGRATION POINT ---
// This entire file serves as a mock data service for frontend development and demonstration.
// In a production environment, this file and its logic should be completely replaced with
// a service that connects to a real-time backend endpoint (e.g., a WebSocket or Server-Sent Events stream).
// The `startDataStream` function would be replaced with logic to establish and manage that connection.

import { MachineStatus, LogEntry, HistoricalData, Status, LogLevel } from '../types';

let intervalId: number | null = null;
let currentStatus: MachineStatus = {
    status: Status.INITIALIZING,
    temperature: 5.0,
    pressure: 10.0,
    sapFlowRate: 0,
    tankLevel: 25,
    extractorRPM: 0,
};

let historicalData: HistoricalData[] = [];

type DataStreamCallback = (status: MachineStatus, log: LogEntry | null, historical: HistoricalData[]) => void;
let streamCallback: DataStreamCallback | null = null;

export interface MockDataStreamControls {
    stop: () => void;
}

const logMessages = {
    [LogLevel.INFO]: [
        'System check complete. All parameters nominal.',
        'Sap flow rate stabilized.',
        'Tank level sensor calibrated.',
        'Extractor RPM at optimal speed.',
        'Pressure valves operating normally.'
    ],
    [LogLevel.WARN]: [
        'Core temperature slightly elevated.',
        'Pressure fluctuation detected in pipe 3.',
        'Tank level approaching 85% capacity.',
        'Minor vibration detected in extractor motor.'
    ],
    [LogLevel.ERROR]: [
        'CRITICAL: Pressure exceeds safety limits!',
        'FATAL: Core temperature critical. Emergency measures needed.',
        'Main sap tank overflow detected!',
        'Extractor motor stalled. Immediate maintenance required.'
    ],
};

const generateRandomLog = (status: Status, operatorName: string): LogEntry | null => {
    const random = Math.random();
    if (random > 0.3) return null; // Only generate a log 70% of the time

    let level: LogLevel;
    if (status === Status.ERROR && Math.random() < 0.8) {
        level = LogLevel.ERROR;
    } else if (status === Status.WARNING && Math.random() < 0.6) {
        level = LogLevel.WARN;
    } else {
        level = LogLevel.INFO;
    }

    const messages = logMessages[level];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return { timestamp: new Date(), level, message, operatorName };
};

const updateStatus = () => {
    // Temperature
    currentStatus.temperature += (Math.random() - 0.48) * 0.5;
    currentStatus.temperature = Math.max(2, Math.min(15, currentStatus.temperature));

    // Pressure
    currentStatus.pressure += (Math.random() - 0.5) * 0.2;
    currentStatus.pressure = Math.max(8, Math.min(12.5, currentStatus.pressure));

    // Flow Rate & RPM
    if (currentStatus.status === Status.OPERATIONAL) {
        currentStatus.sapFlowRate += (Math.random() - 0.45) * 0.5;
        currentStatus.extractorRPM = 1200 + (Math.random() - 0.5) * 50;
    } else {
        currentStatus.sapFlowRate *= 0.8;
        currentStatus.extractorRPM *= 0.8;
    }
    currentStatus.sapFlowRate = Math.max(0, Math.min(15, currentStatus.sapFlowRate));
    currentStatus.extractorRPM = Math.max(0, currentStatus.extractorRPM);


    // Tank Level
    currentStatus.tankLevel += currentStatus.sapFlowRate * 0.01;
    currentStatus.tankLevel = Math.min(100, currentStatus.tankLevel);

    // Overall Status
    if (currentStatus.pressure > 12 || currentStatus.temperature > 12) {
        currentStatus.status = Status.ERROR;
    // FIX: Corrected typo from `current-Status.temperature` to `currentStatus.temperature`.
    } else if (currentStatus.pressure > 11.5 || currentStatus.temperature > 9 || currentStatus.tankLevel > 90) {
        currentStatus.status = Status.WARNING;
    } else if (currentStatus.sapFlowRate > 1){
        currentStatus.status = Status.OPERATIONAL;
    }

    // Historical Data
    const now = new Date();
    const timeLabel = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    historicalData.push({ time: timeLabel, flowRate: currentStatus.sapFlowRate });
    if (historicalData.length > 30) {
        historicalData.shift();
    }
};


export const mockDataService = {
    startDataStream: (
        operatorName: string,
        callback: DataStreamCallback
    ): MockDataStreamControls => {
        streamCallback = callback;
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Reset to initial state on start
        currentStatus = {
            status: Status.INITIALIZING,
            temperature: 5.0,
            pressure: 10.0,
            sapFlowRate: 0,
            tankLevel: 25,
            extractorRPM: 0,
        };
        historicalData = [];

        setTimeout(() => {
            currentStatus.status = Status.OPERATIONAL;
        }, 3000);

        intervalId = window.setInterval(() => {
            updateStatus();
            const newLog = generateRandomLog(currentStatus.status, operatorName);
            if (streamCallback) {
                streamCallback({ ...currentStatus }, newLog, [...historicalData]);
            }
        }, 1000);
        
        return {
            stop: () => {
                if(intervalId) clearInterval(intervalId);
                streamCallback = null;
            }
        }
    },
};