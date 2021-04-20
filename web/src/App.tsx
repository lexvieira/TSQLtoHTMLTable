import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserJson from './pages/UserJson';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>
          Return Data with Json and TSQL
        </h2>
        <UserJson />
      </header>
    </div>
  );
}

export default App;
