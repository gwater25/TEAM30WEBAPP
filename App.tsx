import React, { useState, useEffect } from 'react';
import { MachineStatus, LogEntry, HistoricalData, Status, User, LogLevel } from './types';
import { mockDataService } from './services/mockDataService';
import { dbService } from './services/dbService';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import SystemStatus from './components/SystemStatus';
import MetricGauge from './components/MetricGauge';
import LogViewer from './components/LogViewer';
import SapFlowChart from './components/SapFlowChart';
import Login from './components/Login';
import LogInput from './components/LogInput';
import LoadingScreen from './components/LoadingScreen';
import DashboardLoadingScreen from './components/DashboardLoadingScreen';


const App: React.FC = () => {
    // Initial App Load State
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('Initializing System...');
    
    // Post-Login Dashboard Initialization State
    const [isInitializingDashboard, setIsInitializingDashboard] = useState(false);
    const [dashboardLoadingProgress, setDashboardLoadingProgress] = useState(0);
    const [dashboardLoadingMessage, setDashboardLoadingMessage] = useState('Authenticating...');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [machineStatus, setMachineStatus] = useState<MachineStatus>({
        status: Status.INITIALIZING,
        temperature: 0,
        pressure: 0,
        sapFlowRate: 0,
        tankLevel: 0,
        extractorRPM: 0,
    });
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

    // Effect for the initial application loading screen
    useEffect(() => {
        const steps = [
            { progress: 20, message: 'Connecting to monitoring services...' },
            { progress: 45, message: 'Calibrating all system sensors...' },
            { progress: 65, message: 'Verifying data stream integrity...' },
            { progress: 90, message: 'Loading historical logs from DB...' },
            { progress: 100, message: 'Interface ready. Stand by.' },
        ];

        const timeouts: ReturnType<typeof setTimeout>[] = [];
        let delay = 500;

        timeouts.push(setTimeout(() => {
            setLoadingProgress(10);
        }, 100));

        steps.forEach((step) => {
            delay += 600 + Math.random() * 250;
            timeouts.push(setTimeout(() => {
                setLoadingProgress(step.progress);
                setLoadingMessage(step.message);
            }, delay));
        });

        timeouts.push(setTimeout(() => {
            setIsLoading(false);
        }, delay + 500));

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);
    
    // Effect for the post-login dashboard loading screen
    useEffect(() => {
        if (!isInitializingDashboard) return;

        const steps = [
            { progress: 25, message: 'Establishing secure data link...' },
            { progress: 50, message: 'Syncing operator profile...' },
            { progress: 80, message: 'Loading real-time data feeds...' },
            { progress: 100, message: 'Initialization complete.' },
        ];

        const timeouts: ReturnType<typeof setTimeout>[] = [];
        let delay = 500;

        timeouts.push(setTimeout(() => setDashboardLoadingProgress(10), 100));

        steps.forEach((step) => {
            delay += 700 + Math.random() * 200;
            timeouts.push(setTimeout(() => {
                setDashboardLoadingProgress(step.progress);
                setDashboardLoadingMessage(step.message);
            }, delay));
        });

        timeouts.push(setTimeout(() => {
            setIsInitializingDashboard(false);
            setIsAuthenticated(true);
        }, delay + 500));

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [isInitializingDashboard]);


    useEffect(() => {
        setLogs(dbService.getAllLogs());
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !currentUser) return;
        
        const dataStream = mockDataService.startDataStream(currentUser.name, (newStatus, newLog, newHistorical) => {
            setMachineStatus(newStatus);
            if (newLog) {
                dbService.addLog(newLog);
                setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 49)]);
            }
            setHistoricalData(newHistorical);
        });

        return () => {
            dataStream.stop();
        };
    }, [isAuthenticated, currentUser]);
    
    const handleLogin = (name: string, password: string): Promise<string | null> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = dbService.getUsers();
                const user = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === password);
                if (user) {
                    setCurrentUser(user);
                    setIsInitializingDashboard(true);
                    resolve(null);
                } else {
                    resolve('Invalid credentials. Please try again.');
                }
            }, 500);
        });
    };

    const handleSignUp = (name: string, password: string): Promise<string | null> => {
         return new Promise(resolve => {
            setTimeout(() => {
                const newUser = { name, password };
                const result = dbService.addUser(newUser);
                if (result.success) {
                    setCurrentUser(newUser);
                    setIsInitializingDashboard(true);
                    resolve(null);
                } else {
                    resolve(result.error || 'An unknown error occurred.');
                }
            }, 500);
        });
    }
    
    const handleAddLog = (message: string) => {
        if (!currentUser) return;
        const newLog: LogEntry = {
            timestamp: new Date(),
            level: LogLevel.USER,
            message: `[OPERATOR] ${message}`,
            operatorName: currentUser.name,
        };
        dbService.addLog(newLog);
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 49)]);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setMachineStatus({
            status: Status.OFFLINE,
            temperature: 0,
            pressure: 0,
            sapFlowRate: 0,
            tankLevel: 0,
            extractorRPM: 0,
        });
        setLogs([]);
        setHistoricalData([]);
    };

    const ThermometerIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10a4 4 0 104 0z" /></svg>
    );
    const GaugeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 0V4m0 16v-4m-4-8H4m16 0h-4M8 12H4m16 0h-4" /></svg>
    );
    const FlowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
    );
    const RpmIcon = () => (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );

    if (isLoading) {
        return <LoadingScreen progress={loadingProgress} message={loadingMessage} />;
    }

    if (isInitializingDashboard) {
        return <DashboardLoadingScreen 
            progress={dashboardLoadingProgress} 
            message={dashboardLoadingMessage}
            operatorName={currentUser?.name}
        />;
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} onSignUp={handleSignUp} />;
    }

    return (
        <>
            <div className="min-h-screen bg-base-300 text-gray-200 p-4 lg:p-8">
                <div className="container mx-auto">
                    <Header operatorName={currentUser?.name} onLogout={handleLogout} />
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                        <div className="lg:col-span-4">
                           <SystemStatus status={machineStatus.status} />
                        </div>
                        
                        <StatusCard icon={<ThermometerIcon />} label="Core Temperature" value={machineStatus.temperature.toFixed(1)} unit="°C" />
                        <StatusCard icon={<GaugeIcon />} label="System Pressure" value={machineStatus.pressure.toFixed(2)} unit="bar" />
                        {/* FIX: Corrected a typo from `machine` to `machineStatus` to correctly reference the state variable. */}
                        <StatusCard icon={<FlowIcon />} label="Sap Flow Rate" value={machineStatus.sapFlowRate.toFixed(2)} unit="L/min" />
                        <StatusCard icon={<RpmIcon />} label="Extractor RPM" value={machineStatus.extractorRPM.toFixed(0)} unit="RPM" />

                        <div className="md:col-span-2 lg:col-span-2 bg-base-200/50 p-6 rounded-2xl shadow-lg border border-base-100 flex flex-col items-center justify-center">
                            <h3 className="text-xl font-bold text-gray-300 mb-4 self-start">Main Sap Tank Level</h3>
                            <MetricGauge value={machineStatus.tankLevel} />
                        </div>

                        <div className="md:col-span-2 lg:col-span-2 bg-base-200/50 p-6 rounded-2xl shadow-lg border border-base-100 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-300 mb-4">Live Event Log</h3>
                            <LogViewer logs={logs} />
                            <LogInput onAddLog={handleAddLog} />
                        </div>
                        
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-base-200/50 p-6 rounded-2xl shadow-lg border border-base-100">
                            <h3 className="text-xl font-bold text-gray-300 mb-4">Sap Flow Rate (Last 30s)</h3>
                            <SapFlowChart data={historicalData} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default App;