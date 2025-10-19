import React from 'react';
import { HistoricalData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface SapFlowChartProps {
    data: HistoricalData[];
}

const SapFlowChart: React.FC<SapFlowChartProps> = ({ data }) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                    <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                    <YAxis unit=" L/min" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} domain={[0, 15]} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#3E3E3E',
                            border: '1px solid #FF9A5C',
                            borderRadius: '0.5rem',
                        }}
                        labelStyle={{ color: '#ffffff' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="flowRate"
                        name="Flow Rate"
                        stroke="#FF9A5C"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SapFlowChart;