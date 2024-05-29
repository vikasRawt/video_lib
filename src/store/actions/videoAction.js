export const addVideo = (video) => ({
    type: 'ADD_VIDEO',
    payload: { ...video, id: Math.random().toString(36).substr(2, 9) }
  });
  
  export const toggleBookmark = (video) => ({
    type: 'TOGGLE_BOOKMARK',
    payload: video
  });
  