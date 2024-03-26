// Popup.js

import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Modal} from 'react-bootstrap';
import cubeLoader from './Lotties/cube.json'
const Spaces = () => {
  const [loading ,setLoading ] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 5 seconds, set loading to false
    }, 5000);

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, []);

  return (
   <div>
   {loading ? (
        <Player src={cubeLoader} loop  autoplay style={{ height: '250px', width: '250px' }} />
      ) : (
        <div>
        <Player className='mt-5' src="https://lottie.host/4ba8afc4-b78f-4382-97c7-6ca8bde51487/4sNAMEuF3w.json" loop autoplay style={{ height: '250px', width: '250px' }} />
     <h5 className='text-center text-muted fw-bold'>You don't have create any Spaces.</h5>
     </div>
     )}
     
  
  
   </div>
  );
};

export default Spaces;
