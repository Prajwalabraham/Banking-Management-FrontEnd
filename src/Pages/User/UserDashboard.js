import React from 'react'
import Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserDashboard() {

  const navigate = useNavigate()
  React.useEffect(() => {
    let user = localStorage.getItem('username')
    if (!user) {
      navigate('/')
    }
  }, []);



  const [Name, setName] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [accountType, setAccountType] = React.useState('savings');
  const [Address, setAddress] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState(0);
  const [deposit, setDeposit] = React.useState(accountType === 'savings' ? 500 : 1000);

  React.useEffect(() => {
    setDeposit(accountType === 'savings' ? 500 : 1000);
  }, [accountType]);
  
  const [success,setSuccess]=React.useState(false);
  const handleRequestSubmit = () => {
      let data = {
          name:Name,
          phone:Phone,
          address:Address,
          accountType:accountType,
          balance:deposit,
          username: localStorage.getItem('username')
      }
      console.log(data);
      axios({
          method:'post',
          url: 'http://localhost:8080/api/createAccount',
          data: data
      })
      .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setAccountNumber(response.data.accountId);
            localStorage.setItem('accountId',response.data.accountId);
            setSuccess(true);
          }
      })
      .catch((error) => {
          alert(error.message)
          console.log(error);
      })
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

return (
  <>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%', background:'#4BB543' }}>
          Account Created Successfully!
          Account Number: {accountNumber}
        </Alert>
      </Snackbar>
  <Box sx={{p:5}}>
      <Paper elevation={2} sx={{
      p:5,
      height:'90%',
      borderRadius:10
    }}>
      <Box sx={{
          textAlign:'center'
      }}>
          <Typography variant="h4" color="initial">Acoount Opening Form</Typography>
          <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4} >
                  <TextField
                  id="name"
                  label="Full Name"
                  required
                  value={Name}
                  onChange={(e)=>setName(e.target.value)}
                  sx={{
                      width:'100%',
                      mt:3,
                  }}
                  />
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
                  <TextField
                  id="phone"
                  label="Phone"
                  value={Phone}
                  required
                  onChange={(e)=>setPhone(e.target.value)}
                  sx={{
                      width:'100%',
                      mt:3,
                  }}
                  />
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
                  <TextField
                  id="address"
                  label="Address"
                  required
                  placeholder="Enter your address"
                  value={Address}
                  multiline
                  onChange={(e)=>setAddress(e.target.value)}
                  sx={{
                      width:'100%',
                      mt:3,
                  }}
                  />
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
                  <div style={{ display: 'flex', alignItems: 'center', padding:'20px' }}>
                      <div style={{ flex: 1 }}>
                      <FormControl fullWidth>
                      <InputLabel id="account-type-label">Account Type</InputLabel>
                      <Select
                          labelId="account-type-label"
                          id="Account-type"
                          value={accountType}
                          label="Account Type"
                          onChange={(e) => setAccountType(e.target.value)}
                          sx={{
                          width: '100%',
                          }}
                      >
                          <MenuItem value="savings">Savings</MenuItem >
                          <MenuItem value="current">Current</MenuItem >
                      </Select>
                      </FormControl>  
                      </div>
                  </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
                  <TextField
                  id="deposit"
                  required
                  label="Initial Deposit"
                  value={deposit}
                  type="number"
                  sx={{
                      width:'100%',
                      mt:3,
                  }}
                  />
              </Grid>
          </Grid>
          <Button
            onClick={handleRequestSubmit}
            sx={{
                width:'100%',
                mt:2,
                height:'55px',
                borderRadius:10,
            }} 
            variant="outlined">
            Create
          </Button>
      </Box>
    </Paper>
  </Box>
  </>    
)
}

export default UserDashboard