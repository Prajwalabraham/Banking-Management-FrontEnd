import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Close() {

    const navigate = useNavigate()
    const handleClick = () => {
        let accountId = localStorage.getItem('accountId');
        axios
          .delete(`http://localhost:8080/api/accounts/${accountId}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              localStorage.removeItem('username');
            }
            // Redirect to the desired page
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
            // Handle error
          });
      };
      

  return (
    <Box sx={{ p:5, borderRadius:'25px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper sx={{ p: 2, borderRadius:'25px', width: '100%', textAlign: 'center'}}>
            <Typography variant="h5" color="initial">Are you sure you want to close your account?</Typography>
            <Box sx={{p:2}}>
            </Box>
            <Button onClick={handleClick} variant="contained" color="secondary">
              Close Account
            </Button>
        </Paper>
    </Box>
  )
}

export default Close