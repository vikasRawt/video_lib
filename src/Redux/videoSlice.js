import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  bookmarks: []
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videos.push({ ...action.payload, id: Math.random().toString(36).substr(2, 9) });
    },
    toggleBookmark: (state, action) => {
      const videoIndex = state.bookmarks.findIndex(video => video.id === action.payload.id);
      if (videoIndex === -1) {
        state.bookmarks.push(action.payload);
      } else {
        state.bookmarks = state.bookmarks.filter(video => video.id !== action.payload.id);
      }
    }
  }
});

export const { addVideo, toggleBookmark } = videoSlice.actions;
export default videoSlice.reducer;
