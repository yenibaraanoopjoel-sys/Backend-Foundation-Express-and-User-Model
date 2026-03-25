import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import ImageUpload from '../components/ImageUpload';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUploaded = (imageUrl) => {
    setCoverImageUrl(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create post with coverImage URL (if uploaded)
      const postData = {
        title: formData.title,
        content: formData.content,
        coverImage: coverImageUrl || null
      };

      const response = await api.post('/posts', postData);
      
      toast.success('Post created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: ''
      });
      setCoverImageUrl(null);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Create post error:', error);
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter post title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder="Write your post content..."
            rows="8"
          />
        </div>
        
        {/* Image Upload Component */}
        <ImageUpload onImageUploaded={handleImageUploaded} />
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
