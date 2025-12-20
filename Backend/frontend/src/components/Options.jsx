import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';

import { SocketContext } from '../SocketContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px 20px',
  border: '2px solid black',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  const copyToClipboard = () => {
    if (me) {
      navigator.clipboard.writeText(me);
      alert("ID Copied: " + me); // Testing ke liye alert, baad mein hata sakte ho
    } else {
      alert("ID abhi tak mili nahi h, thoda wait karo!");
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container sx={{ width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
            
            <Grid item xs={12} md={6} sx={{ p: '20px' }}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ mb: 2 }} />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                startIcon={<Assignment fontSize="large" />}
                onClick={copyToClipboard} // Direct click par function call
                sx={{ mt: '20px' }}
              >
                Copy Your ID
              </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={{ p: '20px' }}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth sx={{ mb: 2 }} />
              
              {callAccepted && !callEnded ? (
                <Button 
                  variant="contained" 
                  color="error" 
                  startIcon={<PhoneDisabled fontSize="large" />} 
                  fullWidth 
                  onClick={leaveCall} 
                  sx={{ mt: '20px' }}
                >
                  Hang Up
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<Phone fontSize="large" />} 
                  fullWidth 
                  onClick={() => callUser(idToCall)} 
                  sx={{ mt: '20px' }}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Sidebar;