import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const play = () => {
    const a = new Audio('good/A3.mp3')
    a.play()
  }
  return (
    <div className="App" onClick={play}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
