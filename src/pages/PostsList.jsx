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
        <div className="flex min-h-screen bg-dark">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Posts Management</h1>
                    <p className="text-zinc-400 mt-2">Monitor and manage user posts</p>
                </header>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-zinc-500 text-center">Loading posts...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-zinc-500 text-center">No posts found</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="admin-card p-6 flex gap-6 hover:border-primary/30 transition-colors group">
                                {/* Post Image if exists */}
                                {post.image && (
                                    <div className="w-48 h-32 flex-shrink-0 bg-zinc-900 rounded-lg overflow-hidden border border-border">
                                        <img src={post.image} alt="Post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={post.user?.pic}
                                            alt={post.user?.name}
                                            className="w-8 h-8 rounded-full border border-border"
                                        />
                                        <div>
                                            <p className="text-white font-medium text-sm">{post.user?.name}</p>
                                            <p className="text-zinc-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 mb-4 text-sm leading-relaxed">{post.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                        <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-border">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            {post.comments.length} Comments
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors h-fit"
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
