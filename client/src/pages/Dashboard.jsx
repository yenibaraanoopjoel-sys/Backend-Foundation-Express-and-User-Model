import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Fetch posts error:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>All Posts</h2>
        <Link to="/create-post" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet</p>
          <Link to="/create-post" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'inline-block', marginTop: '1rem' }}>
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {post.coverImage && (
                <img 
                  src={post.coverImage} 
                  alt={`Cover image for ${post.title}`}
                  className="post-cover-image"
                />
              )}
              
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content}
                </p>
                
                <div className="post-meta">
                  <span className="post-author">
                    By {post.author?.name || 'Unknown'}
                  </span>
                  <span className="post-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
