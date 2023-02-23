import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import UserDetailsDisplay from './components/UserDetailsDisplay';
import UserCreate from './components/UserCreate';

function App() {
  return (
    <div className="App">
        <UserDetailsDisplay/>
      </div>
  );
}

export default App;
