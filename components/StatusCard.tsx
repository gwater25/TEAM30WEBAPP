
import React from 'react';

interface StatusCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon, label, value, unit }) => {
    return (
        <div className="bg-base-200/50 p-6 rounded-2xl shadow-lg flex items-center space-x-4 border border-base-100 transition-all duration-300 hover:bg-base-200 hover:shadow-primary/20">
            <div className="bg-primary/20 text-primary p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-100">
                    {value} <span className="text-lg text-gray-400 font-normal">{unit}</span>
                </p>
            </div>
        </div>
    );
};

export default StatusCard;
