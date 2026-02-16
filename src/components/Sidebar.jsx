import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/posts', icon: MessageSquare, label: 'Posts' },
        { path: '/groups', icon: Users, label: 'Groups' },
    ];

    return (
        <div className="h-screen w-64 bg-sidebar border-r border-border text-zinc-300 flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
            <div className="p-6 flex items-center gap-3 border-b border-border">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-white tracking-tight">
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 p-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
