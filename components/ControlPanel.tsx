import React from 'react';

interface ControlPanelProps {
    onRecalibrate: () => void;
    onShutdown: () => void;
    isDisabled: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onRecalibrate, onShutdown, isDisabled }) => {
    const buttonBaseClasses = "font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const RecalibrateIcon = () => (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" /></svg>
    );

    const ShutdownIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
    );


    return (
        <div className="bg-base-200/50 p-4 rounded-2xl shadow-lg border border-base-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <h3 className="text-lg font-bold text-gray-300 col-span-1">Operator Controls</h3>
                <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row sm:justify-end gap-4">
                    <button 
                        onClick={onRecalibrate} 
                        disabled={isDisabled}
                        className={`${buttonBaseClasses} bg-info/80 hover:bg-info text-base-300 w-full sm:w-auto`}
                    >
                        <RecalibrateIcon />
                        Recalibrate System
                    </button>
                    <button 
                        onClick={onShutdown} 
                        disabled={isDisabled}
                        className={`${buttonBaseClasses} bg-error/90 hover:bg-error text-white w-full sm:w-auto`}
                    >
                        <ShutdownIcon />
                        Emergency Shut Off
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
