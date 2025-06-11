import logo from './logo.svg';
import './App.css';

import AddToHomeScreen  from './AddToHomeScreen';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Routing from './quora/Routing';

function App() {
 

  return (
    <div className=' App'>
  
      <Routing/>
      <AddToHomeScreen/>
    </div>
  );
}

export default App;
