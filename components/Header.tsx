import React from 'react';

interface HeaderProps {
    operatorName?: string;
    onLogout: () => void;
}

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ operatorName, onLogout }) => {
    return (
        <header className="border-b-2 border-primary/20 pb-4 flex justify-between items-start">
            <div>
                <h1 className="text-4xl font-bold text-gray-100" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    SAP EXTRACTION PROTOTYPE
                </h1>
                <p className="text-lg text-gray-400 mt-1">Real-Time Monitoring Dashboard</p>
                {operatorName && (
                    <p className="text-md text-gray-300 mt-2">
                        Welcome, <span className="font-bold text-primary">{operatorName}</span>
                    </p>
                )}
            </div>
            {operatorName && (
                 <button 
                    onClick={onLogout}
                    className="mt-2 font-semibold py-2 px-4 rounded-lg flex items-center justify-center bg-base-200/60 hover:bg-base-200 text-gray-300 hover:text-primary transition-all duration-300"
                >
                    <LogoutIcon />
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;