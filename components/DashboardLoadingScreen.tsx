import React from 'react';

interface DashboardLoadingScreenProps {
    progress: number;
    message: string;
    operatorName?: string;
}

const DashboardLoadingScreen: React.FC<DashboardLoadingScreenProps> = ({ progress, message, operatorName }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 text-gray-200 p-4">
            <div className="w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold text-gray-100" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Welcome, {operatorName || 'Operator'}
                </h1>
                <p className="text-lg text-primary mt-2 mb-12">
                    Preparing your dashboard...
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-base-200/50 rounded-full h-2.5 mb-4 border border-base-100">
                    <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Loading Message */}
                <p className="text-md text-gray-300 font-mono animate-pulse">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default DashboardLoadingScreen;
