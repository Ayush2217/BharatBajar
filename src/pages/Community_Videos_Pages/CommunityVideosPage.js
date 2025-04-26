// CommunityVideosPage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';
import Sidebar from './Sidebar';
import '../../styles/CommunityVideosPage.css';

const CommunityVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const videoRefs = useRef([]); // Store video references for HLS

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/videos');
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    videos.forEach((video, index) => {
      const videoElement = videoRefs.current[index];
      if (videoElement) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(video.playback_url);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          videoElement.src = video.playback_url;
        }
      }
    });
  }, [videos]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file to upload.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('video', selectedFile);

      await axios.post('http://127.0.0.1:8000/videos/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      alert("Upload successful! Video will be processed and available shortly.");
      setSelectedFile(null);
      setUploadProgress(0);
      setIsUploading(false);
      fetchVideos(); // Refresh video feed after upload
    } catch (error) {
      console.error('Error uploading video:', error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const categories = [
    'Electronics', 'General', 'Programming', 'Education', 'Live', 'Comedy',
    'Tech Reviews', 'Gaming', 'Music', 'Movies'
  ];

  return (
    <div className="community-videos-page">
      <Sidebar />
      <div className="main-content">
        {/* Top Categories Bar */}
        <div className="top-categories-bar">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              {category}
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            style={{ marginTop: '10px' }}
          />
          <button className="cta-button" onClick={handleVideoUpload} disabled={isUploading}>
            {isUploading ? `Uploading... (${uploadProgress}%)` : 'Upload Video'}
          </button>

          {/* Progress Slider */}
          {isUploading && (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                {uploadProgress}%
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for videos" />
        </div>

        {/* Video Feed */}
        <div className="video-feed">
          {videos.map((video, index) => (
            <div className="video-card" key={index}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                controls
                style={{ width: '100%', backgroundColor: 'black' }}
              >
                {Hls.isSupported() ? null : (
                  <source src={video.playback_url} type="application/vnd.apple.mpegurl" />
                )}
                Your browser does not support the video tag.
              </video>
              <h4>Video {index + 1}</h4>
              <p>Views: {Math.floor(Math.random() * 1000) + 1}K</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityVideosPage;
