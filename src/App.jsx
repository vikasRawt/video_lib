import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import VideoLibrary from './Redux/components/videoLib.jsx';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <VideoLibrary/>
      </div>
    </Provider>
  );
}

export default App;
