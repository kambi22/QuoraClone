import logo from './logo.svg';
import './App.css';

import Quora from './quora/Routing';
import AddToHomeScreen  from './AddToHomeScreen';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
  
      <Quora/>
      <AddToHomeScreen/>
    </div>
  );
}

export default App;
