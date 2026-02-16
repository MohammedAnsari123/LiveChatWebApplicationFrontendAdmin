import React, { useEffect, useState } from 'react';
import API from '../api';
import Sidebar from '../components/Sidebar';
import { Search, MoreVertical, Trash2, Shield } from 'lucide-react';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users from new admin logic endpoint
                const { data } = await API.get(`/admin/users?search=${search}`);
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [search]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await API.delete(`/admin/users/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-dark">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
                        <p className="text-zinc-400 mt-2">Manage and view all registered users</p>
                    </div>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-zinc-900 text-white pl-10 pr-4 py-2.5 rounded-lg border border-zinc-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                </header>

                <div className="admin-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="admin-table-header">User</th>
                                    <th className="admin-table-header">Email</th>
                                    <th className="admin-table-header">Role</th>
                                    <th className="admin-table-header">Status</th>
                                    <th className="admin-table-header">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-zinc-500">Loading users...</td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-zinc-500">No users found</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                            <td className="admin-table-cell">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.pic}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover border border-zinc-600"
                                                    />
                                                    <span className="text-white font-medium">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="admin-table-cell">{user.email}</td>
                                            <td className="admin-table-cell">
                                                {user.isAdmin ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <Shield className="w-3 h-3" />
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                        User
                                                    </span>
                                                )}
                                            </td>
                                            <td className="admin-table-cell">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="admin-table-cell">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
