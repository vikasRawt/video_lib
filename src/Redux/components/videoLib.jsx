import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVideo, toggleBookmark } from '../videoSlice';

const VideoLibrary = () => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.video.videos);
  const bookmarks = useSelector(state => state.video.bookmarks);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const handleAddVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          dispatch(addVideo({ name: file.name, url: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleBookmark = (video) => {
    dispatch(toggleBookmark(video));
  };

  const filteredVideos = showBookmarksOnly ? bookmarks : videos;

  return (
    <div className="p-4">
      <div className="mb-4">
        <input type="file" accept="video/*" onChange={handleAddVideo} className="mb-2"/>
        <label className="ml-2">
          <input
            type="checkbox"
            checked={showBookmarksOnly}
            onChange={() => setShowBookmarksOnly(!showBookmarksOnly)}
          />
          Show Bookmarked Videos Only
        </label>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <li key={video.id} className="p-4 border rounded">
            <span>{video.name}</span>
            <div>
              <button onClick={() => setSelectedVideo(video)} className="btn btn-primary mr-2">Play</button>
              <button onClick={() => handleToggleBookmark(video)}>
                {bookmarks.find((bookmark) => bookmark.id === video.id) ? 'Unbookmark' : 'Bookmark'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <video controls src={selectedVideo.url} className="w-full"/>
            <button onClick={() => setSelectedVideo(null)} className="mt-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
