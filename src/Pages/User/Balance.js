import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Balance(){

const navigate = useNavigate()
const [totalBalance, setTotalBalance] = React.useState(0);
const [totalTransactions, setTotalTransactions] = React.useState(0);
const [totalUnitsAvailable, setTotalUnitsAvailable] = React.useState(0);
const [yourAccounts, setYourAccounts] = React.useState(0);
const [totalDonors, setTotalDonors] = React.useState(0);


React.useEffect(() => {
  let accountId = localStorage.getItem('accountId');
  axios.post('http://localhost:8080/api/getrequests')
   .then(res => {
     setTotalTransactions(res.data.length);
   })
  .catch(err => {
    console.log(err);
  })
  axios({
    method:'post',
    url: `http://localhost:8080/api/getAccountDetails`,
    data: {
      accountId: accountId // Make sure `accountID` contains the account ID value
  }
})
.then(response => {
    console.log(response);
    setTotalBalance(response.data.balance);
})
.catch(error => {
    console.log(error);
})
}, []);



return (
  <Box sx={{ minWidth: 275, padding: '20px'  }}>
    <Typography variant="h5">Balance Page</Typography>
    <Grid container spacing={2} sx={{p:5}}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 200, maxWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Balance
            </Typography>
            <Typography variant="h5" component="div">
              {totalBalance}
            </Typography>
            <Typography variant="body2">
              <br />
              Total Money in Bank
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minWidth: 200, maxWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Transactions
            </Typography>
            <Typography variant="h5" component="div">
              {totalTransactions}
            </Typography>
            <Typography variant="body2">
              <br />
              Number of Transactions
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/UserDashboard')} size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 200, maxWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Number of Accounts
            </Typography>
            <Typography variant="h5" component="div">
              {yourAccounts}
            </Typography>
            <Typography variant="body2">
              <br />
              Types of Accounts
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 200, maxWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Spare UI Component
            </Typography>
            <Typography variant="h5" component="div">
              {totalUnitsAvailable}
            </Typography>
            <Typography variant="body2">
              <br />
              Whatever you wanna do
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Box>
)
}


export default Balance