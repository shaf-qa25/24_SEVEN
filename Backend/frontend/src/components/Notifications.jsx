import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">{call.name || 'Unknown'} is calling:</Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={answerCall}
          sx={{ ml: 2 }}
        >
          Answer Call
        </Button>
      </Box>
      )}
    </>
  );
};

export default Notifications;