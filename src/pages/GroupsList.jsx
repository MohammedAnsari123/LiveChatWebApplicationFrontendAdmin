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
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Groups Management</h1>
                    <p className="text-slate-400 mt-2">View all active group chats</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p className="text-slate-400">Loading groups...</p>
                    ) : groups.length === 0 ? (
                        <p className="text-slate-400">No groups found</p>
                    ) : (
                        groups.map((group) => (
                            <div key={group._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-blue-500/10">
                                        <Hash className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{group.chatName}</h3>
                                        <p className="text-slate-400 text-sm">Created {new Date(group.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Members</span>
                                        <span className="text-white font-medium bg-slate-700 px-2 py-1 rounded">{group.users.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Admin</span>
                                        <span className="text-blue-400 font-medium">{group.groupAdmin?.name || 'N/A'}</span>
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
