import React, { useState } from 'react';

interface LogInputProps {
    onAddLog: (message: string) => void;
}

const LogInput: React.FC<LogInputProps> = ({ onAddLog }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isSubmitting) return;

        setIsSubmitting(true);
        onAddLog(message);
        setMessage('');
        
        setTimeout(() => {
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex items-start gap-2">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter manual log entry..."
                rows={2}
                className="flex-grow bg-base-300/60 border border-base-100 rounded-lg shadow-sm p-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm resize-none"
                disabled={isSubmitting}
            />
            <button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-stretch"
            >
                {isSubmitting ? '...' : 'Log'}
            </button>
        </form>
    );
};

export default LogInput;
