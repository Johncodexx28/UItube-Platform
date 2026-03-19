import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [savedVideos, setSavedVideos] = useState([]);

  const saveVideo = (video) => {
    if (!savedVideos.find(v => v.id === video.id)) {
      setSavedVideos([...savedVideos, video]);
    }
  };

  const unsaveVideo = (videoId) => {
    setSavedVideos(savedVideos.filter(v => v.id !== videoId));
  };

  const isSaved = (videoId) => savedVideos.some(v => v.id === videoId);

  return (
    <VideoContext.Provider value={{ savedVideos, saveVideo, unsaveVideo, isSaved }}>
      {children}
    </VideoContext.Provider>
  );
};
