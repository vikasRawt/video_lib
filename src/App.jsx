import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import VideosLibrary from './components/VideosLibrary.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <VideosLibrary/>
      </div>
    </Provider>
  );
};

export default App;
