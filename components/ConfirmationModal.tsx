import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-base-200 border border-base-100 rounded-2xl shadow-lg max-w-sm w-full p-6 text-center">
                <h3 className="text-xl font-bold text-gray-100 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {title}
                </h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="font-bold py-2 px-6 rounded-lg bg-base-100 hover:bg-base-100/70 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="font-bold py-2 px-6 rounded-lg bg-error text-white hover:bg-error/80 transition-colors"
                    >
                        Confirm Shutdown
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
