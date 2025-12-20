import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@mui/material'; 
import { styled } from '@mui/material/styles';


import { SocketContext } from '../SocketContext';

const MyVideo = styled('video')(({ theme }) => ({
    width: '550px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  }));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  

  return (
    <Grid container sx={{ justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
      
      {stream && (
        <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <MyVideo playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </Paper>
      )}

      {callAccepted && !callEnded && (
        <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <MyVideo playsInline ref={userVideo} autoPlay />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;