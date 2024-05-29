import React, { useState } from "react";
import { connect } from "react-redux";
import { addVideo, toggleBookmark } from "../store/actions/videoAction.js";

const VideoLibrary = ({ videos, bookmarks, addVideo, toggleBookmark }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const handleAddVideo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      addVideo({ name: file.name, url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleToggleBookmark = (video) => {
    toggleBookmark(video);
  };

  const filteredVideos = showBookmarksOnly ? bookmarks : videos;

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Video Library</h1>
      </div>
      <input type="file" accept="video/*" onChange={handleAddVideo} />
      <label>
        <input
          type="checkbox"
          checked={showBookmarksOnly}
          onChange={() => setShowBookmarksOnly(!showBookmarksOnly)}
        />
        Show Bookmarked Videos Only
      </label>
      <ul>
        {filteredVideos.map((video, index) => (
          <li key={index}>
            <span>{video.name}</span>
            <button onClick={() => setSelectedVideo(video)}>Play</button>
            <button onClick={() => handleToggleBookmark(video)}>
              {bookmarks.some((item) => item.id === video.id)
                ? "Unbookmark"
                : "Bookmark"}
            </button>
          </li>
        ))}
      </ul>
      {selectedVideo && (
        <div>
          <video controls src={selectedVideo.url} />
          <button onClick={() => setSelectedVideo(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  videos: state.video.videos,
  bookmarks: state.video.bookmarks,
});

const mapDispatchToProps = (dispatch) => ({
  addVideo: (video) => dispatch(addVideo(video)),
  toggleBookmark: (video) => dispatch(toggleBookmark(video)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoLibrary);
