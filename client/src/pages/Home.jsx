import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2c3e50' }}>
        Welcome to PostHub
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '2rem' }}>
        Create and share amazing posts with cover images
      </p>
      
      {!isAuthenticated ? (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link 
            to="/register" 
            className="btn btn-primary" 
            style={{ width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="btn btn-secondary" 
            style={{ width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Login
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link 
            to="/dashboard" 
            className="btn btn-primary" 
            style={{ width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            View Dashboard
          </Link>
          <Link 
            to="/create-post" 
            className="btn btn-secondary" 
            style={{ width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem' }}
          >
            Create Post
          </Link>
        </div>
      )}

      <div style={{ marginTop: '4rem', maxWidth: '800px', margin: '4rem auto 0' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>📝 Create Posts</h3>
            <p style={{ color: '#7f8c8d' }}>Write and publish your thoughts with ease</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>🖼️ Upload Images</h3>
            <p style={{ color: '#7f8c8d' }}>Add beautiful cover images to your posts</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>☁️ Cloud Storage</h3>
            <p style={{ color: '#7f8c8d' }}>Images stored securely on Cloudinary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
