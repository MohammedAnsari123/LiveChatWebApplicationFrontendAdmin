import React, { useEffect, useState } from 'react';
import API from '../api';
import Sidebar from '../components/Sidebar';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Users, MessageSquare, FileText, Activity } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Poll for active users every 5 seconds
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="flex h-screen items-center justify-center bg-dark text-zinc-400">Loading...</div>;

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']; // Emerald, Blue, Amber, Red

    const userData = [
        { name: 'Active Users', value: stats?.activeUsers || 0 },
        { name: 'Inactive Users', value: stats?.inactiveUsers || 0 },
    ];

    const contentData = [
        { name: 'Posts', amount: stats?.totalPosts || 0 },
        { name: 'Messages', amount: stats?.totalMessages || 0 },
        { name: 'Chats', amount: stats?.totalChats || 0 },
    ];

    const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
        <div className="admin-card p-6 hover:border-primary/50 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgClass} border border-white/5`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                </div>
                <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-zinc-400 text-sm font-medium">{title}</p>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-dark">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                        <p className="text-zinc-400 mt-2">Real-time statistics and platform analysis</p>
                    </div>
                </header>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers}
                        icon={Users}
                        colorClass="text-emerald-500"
                        bgClass="bg-emerald-500/10"
                    />
                    <StatCard
                        title="Active Users"
                        value={stats?.activeUsers}
                        icon={Activity}
                        colorClass="text-blue-500"
                        bgClass="bg-blue-500/10"
                    />
                    <StatCard
                        title="Total Messages"
                        value={stats?.totalMessages}
                        icon={MessageSquare}
                        colorClass="text-violet-500"
                        bgClass="bg-violet-500/10"
                    />
                    <StatCard
                        title="Total Posts"
                        value={stats?.totalPosts}
                        icon={FileText}
                        colorClass="text-amber-500"
                        bgClass="bg-amber-500/10"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Activity Pie Chart */}
                    <div className="admin-card p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">User Activity Status</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {userData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Content Distribution Bar Chart */}
                    <div className="admin-card p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Content Overview</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={contentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#71717a"
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#71717a"
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                                        cursor={{ fill: '#27272a', opacity: 0.4 }}
                                    />
                                    <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
