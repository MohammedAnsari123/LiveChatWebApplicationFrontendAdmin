import React, { useEffect, useState } from 'react';
import API from '../api';
import Sidebar from '../components/Sidebar';
import { MessageSquare, Trash2, Image as ImageIcon } from 'lucide-react';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await API.get('/admin/posts');
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await API.delete(`/admin/posts/${id}`);
                setPosts(posts.filter((post) => post._id !== id));
            } catch (error) {
                console.error("Failed to delete post", error);
                alert("Failed to delete post");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Posts Management</h1>
                    <p className="text-slate-400 mt-2">Monitor and manage user posts</p>
                </header>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-slate-400">Loading posts...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-slate-400">No posts found</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex gap-6">
                                {/* Post Image if exists */}
                                {post.image && (
                                    <div className="w-48 h-32 flex-shrink-0 bg-slate-700 rounded-lg overflow-hidden">
                                        <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={post.user?.pic}
                                            alt={post.user?.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <p className="text-white font-medium text-sm">{post.user?.name}</p>
                                            <p className="text-slate-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 mb-4">{post.content}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-4 h-4" />
                                            {post.comments.length} Comments
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors h-fit"
                                    title="Delete Post"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostsList;
