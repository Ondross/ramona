import React from 'react';
import './App.css';
import Playback from './components/playback/playback.tsx'
import data from './database/data'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Playback
          notes={["C4", "C4", "D4", "D4", "F4", "F4", "E4", "E4"]}
          listeners={[data.user(data.currentUser())]}
        />
      </header>
    </div>
  );
}

export default App;
