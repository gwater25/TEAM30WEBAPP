
import React from 'react';
import { LogEntry, LogLevel } from '../types';

interface LogViewerProps {
    logs: LogEntry[];
}

const levelConfig = {
    [LogLevel.INFO]: { color: 'text-info', label: 'INFO' },
    [LogLevel.WARN]: { color: 'text-warning', label: 'WARN' },
    [LogLevel.ERROR]: { color: 'text-error', label: 'ERR ' },
    [LogLevel.USER]: { color: 'text-secondary', label: 'USER' },
};

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    return (
        <div className="h-64 bg-base-300/60 rounded-lg p-3 overflow-y-auto font-mono text-sm flex flex-col-reverse">
            <div className="space-y-1">
                {logs.length === 0 && (
                     <div className="text-gray-500 text-center pt-20">Awaiting system logs...</div>
                )}
                {logs.map((log, index) => {
                    const config = levelConfig[log.level];
                    return (
                        <div key={index} className="flex items-start">
                            <span className="text-gray-500 mr-2">
                                {log.timestamp.toLocaleTimeString()}
                            </span>
                            <span className={`font-bold mr-2 ${config.color}`}>
                                [{config.label}]
                            </span>
                            <span className="flex-1 text-gray-300">{log.message}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogViewer;