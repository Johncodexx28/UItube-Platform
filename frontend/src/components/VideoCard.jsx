import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useVideoContext } from '../context/VideoContext';

const VideoCard = ({ video }) => {
  const { isSaved, saveVideo, unsaveVideo } = useVideoContext();
  const saved = isSaved(video.id);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    if (saved) {
      unsaveVideo(video.id);
    } else {
      saveVideo(video);
    }
  };

  return (
    <Link to={`/video/${video.id}`} className="flex flex-col gap-2 group cursor-pointer">
      <div className="relative aspect-video rounded-xl bg-gray-200 overflow-hidden">
        <img 
          src={video.thumbnailUrl || 'https://via.placeholder.com/640x360.png?text=Video+Thumbnail'} 
          alt={video.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.duration || '10:00'}
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="shrink-0 pt-1">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            {video.teacherName ? video.teacherName[0] : 'T'}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600">
            {video.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 hover:text-gray-800">
            <Link to={`/teacher/${video.teacherId}`} onClick={e => e.stopPropagation()}>
              {video.teacherName}
            </Link>
          </p>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.createdAt || '2 days ago'}</span>
          </div>
        </div>
        <button 
          onClick={handleSaveToggle}
          className="text-gray-400 hover:text-blue-600 p-1"
          title={saved ? "Remove from Watch Later" : "Save to Watch Later"}
        >
          {saved ? <BookmarkCheck className="h-5 w-5 text-blue-600" /> : <Bookmark className="h-5 w-5" />}
        </button>
      </div>
    </Link>
  );
};

export default VideoCard;
