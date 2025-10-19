import React, { useState } from 'react';

interface LoginProps {
    onLogin: (name: string, password: string) => Promise<string | null>;
    onSignUp: (name: string, password: string) => Promise<string | null>;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUp }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError(null);
        setName('');
        setPassword('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        let authError: string | null = null;
        if (isLoginMode) {
            authError = await onLogin(name, password);
        } else {
            authError = await onSignUp(name, password);
        }
        
        setIsLoading(false);
        if (authError) {
            setError(authError);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
            <div className="w-full max-w-md">
                <div className="bg-base-200/50 backdrop-blur-sm border border-base-100 rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            SAP EXTRACTION PROTOTYPE
                        </h1>
                        <p className="text-gray-400">
                            {isLoginMode ? 'Operator Authentication Required' : 'Create a New Operator Account'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-400">
                                    Operator Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full bg-base-100/50 border border-base-100 rounded-md shadow-sm py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="password"  className="text-sm font-medium text-gray-400">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full bg-base-100/50 border border-base-100 rounded-md shadow-sm py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="mt-4 text-center text-sm text-error">{error}</p>
                        )}

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
                            </button>
                        </div>
                    </form>

                     <div className="mt-6 text-center">
                        <p className="text-sm">
                            <button onClick={toggleMode} className="font-medium text-primary/80 hover:text-primary focus:outline-none">
                               {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;