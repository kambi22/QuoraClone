import React from 'react';
import Button from '@mui/material/Button';

const MyApp = ({ toggleTheme }) => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      {/* Other Material-UI components */}
    </div>
  );
};

export default MyApp;
