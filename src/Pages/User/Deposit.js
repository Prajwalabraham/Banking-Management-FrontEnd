import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function Deposit() {
    const [accountID,setAccountID]=React.useState("");
    const [name,setName]=React.useState("");
    const [balance,setBalance]=React.useState("");
    const [accountNumber, setAccountNumber] = React.useState(0);
    const [accountType, setAccountType] = React.useState("");
    const [amount,setAmount]=React.useState("");
    const [message,setMessage]=React.useState("");
    const [success,setSuccess]=React.useState(false);
    const [error,setError]=React.useState(false);
    const [loading,setLoading]=React.useState(false);

  const navigate=useNavigate();

  const fetchDetails = async ()=> {
    setLoading(true);
    axios({
        method:'post',
        url: `http://localhost:8080/api/getAccountDetails`,
        data: {
          accountId: accountID // Make sure `accountID` contains the account ID value
      }
    })
    .then(response => {
        console.log(response);
        setName(response.data.name);
        setBalance(response.data.balance);
        setAccountNumber(response.data.accountId);
        setAccountType(response.data.accountType);
    })
    .catch(error => {
        console.log(error);
    })
    setLoading(false)
  }


  const deposit=async()=>{
    setLoading(true);
    await axios({
      method:'post',
      url: 'http://localhost:8080/api/deposit',
      data: {
        accountId:accountID,
        depositAmount:amount
      }
    })
    .then(response => {
      console.log(response);
      if (response.status===200) {
        setSuccess(true);
        setError(false); 
        setAmount('')
        setAccountID('')
        setName('');
        setBalance('');
        setAccountNumber('');
        setAccountType('');
      }
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    })
    setLoading(false);
  }

  React.useEffect(()=>{
    if(success){

        }
    }, [])

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
          Amount Successfully Deposited!
        </Alert>
      </Snackbar>
        <Box
          sx={{
            p:5,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
          }}
        >
            {loading? <LinearProgress sx={{mt:0, width:'100%'}} />:null}
                
            <Paper 
              sx={{
                borderRadius:'25px',
                p:5
              }}
              elevation={3}
            >
                <Typography variant="h4" color="default">Deposits</Typography>
                <Grid
                  container
                  spacing={2}
                >
                <Grid item xs={12} sm={8} md={4} lg={3} xl={2}>
                    <TextField
                        id="accountID"
                        label="Account ID"
                        placeholder="Enter Account ID"
                        value={accountID}
                        onChange={(e)=>setAccountID(e.target.value)}
                        sx={{
                        mt:5,
                        width: '100%'
                        }}
                    />      
                    </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
                    <Button onClick={fetchDetails}  sx={{mt:5}} variant="contained" color="primary">
                        Fetch Details
                    </Button>
                </Grid>  
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6" color="initial">Account Number: {accountNumber}</Typography>
                  <Typography variant="h6" color="initial">Account Type: {accountType}</Typography>
                  <Typography variant="h6" color="initial">Name: {name}</Typography>
                  <Typography variant="h6" color="initial">Balance: {balance}</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={4} lg={3} xl={2}>
                    <TextField
                        id="amount"
                        label="Amount"
                        sx={{
                            width:'100%'
                        }}
                        placeholder="Enter Amount to Deposit"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3} xl={2}>
                    <Button onClick={deposit} sx={{mt:0, width:'100%', height:'100%'}} variant="contained" color="primary">
                        Deposit
                    </Button>
                </Grid>
              </Grid>
            </Paper>
        </Box>
    </>
  )
}

export default Deposit