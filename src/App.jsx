import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import TemperaturaApp from './components/TemperaturaApp';

function App() {
  return (
    <div className="App">
      <Router> {}
        <TemperaturaApp />
      </Router>
    </div>
  );
}

export default App;