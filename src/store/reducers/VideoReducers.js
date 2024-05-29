const initialState = {
    videos: [],
    bookmarks: []
  };
  
  const videoReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_VIDEO':
        return {
          ...state,
          videos: [...state.videos, action.payload]
        };
      case 'TOGGLE_BOOKMARK':
        const videoIndex = state.bookmarks.findIndex(video => video.id === action.payload.id);
        if (videoIndex === -1) {
          return {
            ...state,
            bookmarks: [...state.bookmarks, action.payload]
          };
        } else {
          const updatedBookmarks = state.bookmarks.filter(video => video.id !== action.payload.id);
          return {
            ...state,
            bookmarks: updatedBookmarks
          };
        }
      default:
        return state;
    }
  };
  
  export default videoReducer;
  