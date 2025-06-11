import React, { useState, useEffect } from 'react';
import { Button, Snackbar } from '@mui/material';
import { Modal, Toast } from 'react-bootstrap';
const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (showPopup) {
      setTimeout(handleClosePopup, 25000); // Auto-close after 5 seconds
    }
  }, [showPopup]);


  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default behavior
      event.preventDefault();
      // Store the event for later use
      window.deferredPrompt = event;
      // Update UI to notify the user they can add to home screen
      setDeferredPrompt(event)
      setIsInstalled(true)
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt().then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
      setDeferredPrompt(null); // Reset deferredPrompt
    }
  };

  return (
    <div>
      {isInstalled ? (
        <div>
          <Toast show={showPopup} onClose={handleClosePopup} className='position-fixed bottom-0 end-0 m-3' style={{ zIndex: '1' }}>
            <Toast.Header>
              <img className='me-1' src="favicon.ico" alt="icon" style={{ height: '30px', width: '30px' }} />
              <h5 className='me-auto'>Quora</h5>
            </Toast.Header>
            <Toast.Body>
              <div className="d-flex">
                <h5>Add To Home Screen</h5>
                <Button onClick={handleAddToHomeScreen} className='ms-auto' variant='contained' >Add</Button>
              </div>
            </Toast.Body>
          </Toast>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default AddToHomeScreen;
