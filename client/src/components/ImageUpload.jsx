import React, { useState } from 'react';
import api from '../utils/api';

const ImageUpload = ({ onImageUploaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only image files (JPEG, PNG, GIF, WEBP) are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedImage(file);
    setError(null);
    setUploadSuccess(false);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image upload to server
  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Upload to backend
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Get the Cloudinary URL
      const imageUrl = response.data.secure_url;
      
      setUploadSuccess(true);
      
      // Pass the URL to parent component
      onImageUploaded(imageUrl);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  // Remove selected image
  const handleRemove = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setUploadSuccess(false);
    setError(null);
    onImageUploaded(null);
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">Cover Image (Optional)</label>
      
      {!previewUrl ? (
        <div className="image-upload-input-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="image-upload-input"
          />
        </div>
      ) : (
        <div className="image-preview-container">
          <img src={previewUrl} alt="Preview" className="image-preview" />
          
          <div className="image-preview-actions">
            {!uploadSuccess ? (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="btn-upload"
              >
                {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
              </button>
            ) : (
              <div className="upload-success">
                ✓ Image uploaded successfully!
              </div>
            )}
            
            <button
              type="button"
              onClick={handleRemove}
              className="btn-remove"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default ImageUpload;
