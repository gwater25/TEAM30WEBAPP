import React from 'react';
import { Status } from '../types';

interface SystemStatusProps {
    status: Status;
}

const statusConfig = {
    [Status.OPERATIONAL]: { text: 'Operational', color: 'bg-success' },
    [Status.WARNING]: { text: 'Warning', color: 'bg-warning' },
    [Status.ERROR]: { text: 'Error', color: 'bg-error' },
    [Status.INITIALIZING]: { text: 'Initializing...', color: 'bg-info' },
    [Status.OFFLINE]: { text: 'Offline', color: 'bg-gray-500' },
};

const SystemStatus: React.FC<SystemStatusProps> = ({ status }) => {
    const config = statusConfig[status];
    const isBlinking = status === Status.ERROR;

    return (
        <div className="bg-base-200/50 p-4 rounded-2xl shadow-lg flex items-center justify-center space-x-4 border border-base-100">
            <div className="flex items-center space-x-3">
                 <div className={`relative w-4 h-4 rounded-full ${config.color}`}>
                    <div className={`absolute top-0 left-0 w-4 h-4 rounded-full ${config.color} ${isBlinking ? 'animate-pulse' : 'animate-pulse-slow'} opacity-75`}></div>
                </div>
                <span className="text-lg font-bold text-gray-200">SYSTEM STATUS:</span>
            </div>
            <span className="text-xl font-bold text-gray-100 tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>{config.text}</span>
        </div>
    );
};

export default SystemStatus;
