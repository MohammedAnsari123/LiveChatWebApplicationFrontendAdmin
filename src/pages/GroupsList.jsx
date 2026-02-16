import React, { useEffect, useState } from 'react';
import API from '../api';
import Sidebar from '../components/Sidebar';
import { Users, Hash } from 'lucide-react';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data } = await API.get('/admin/groups');
                setGroups(data);
            } catch (error) {
                console.error("Failed to fetch groups", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="flex min-h-screen bg-dark">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Groups Management</h1>
                    <p className="text-zinc-400 mt-2">View all active group chats</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-zinc-500">Loading groups...</p>
                    ) : groups.length === 0 ? (
                        <p className="text-zinc-500">No groups found</p>
                    ) : (
                        groups.map((group) => (
                            <div key={group._id} className="admin-card p-6 hover:border-primary/50 transition-colors cursor-default group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                        <Hash className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{group.chatName}</h3>
                                        <p className="text-zinc-500 text-xs">Created {new Date(group.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-400">Members</span>
                                        <span className="text-white font-medium bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">{group.users.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-400">Admin</span>
                                        <span className="text-emerald-400 font-medium">{group.groupAdmin?.name || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupsList;
