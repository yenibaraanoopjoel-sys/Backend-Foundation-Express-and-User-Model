import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a readable stream from buffer
    const stream = Readable.from(req.file.buffer);

    // Upload to Cloudinary using stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'post_covers',
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 630, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ 
            message: 'Error uploading to Cloudinary',
            error: error.message 
          });
        }

        res.status(200).json({
          message: 'Image uploaded successfully',
          secure_url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format
        });
      }
    );

    stream.pipe(uploadStream);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Server error during upload',
      error: error.message 
    });
  }
};
