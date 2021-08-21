import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as Linked } from 'react-router-dom';
import { storeToken } from './Auth';

const URL = 'http://localhost:8000/api';

const useStyles = makeStyles((theme) => ({
  
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  
  
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [username, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState([]);
  
  // checking if user logged in or not 

  

  // functions for storing the form values
  function FirstN(event) {
    setFname(event.target.value);
  }
  function LastN(event) {
    setLname(event.target.value);
  }
  function UserN(event) {
    setUname(event.target.value);
  }
  function EmailN(event) {
    setEmail(event.target.value);
  }
  function PassW(event) {
    setPassword(event.target.value);
  }

  const userdata = {
      "first_name": firstname,
      "last_name": lastname,
      "username": username,
      "email": email,
      "password": password      
    }


  // handle signup
  function HandleSubmit(e){
    e.preventDefault();
    fetch(`${URL}/auth/register/`, {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {"Content-type": "application/json", "Accept": "application/json"}
      }).then(res=>res.json())
              .then((r)=>{

                setResponse(r);
                if(r.token){storeToken(r.token)}              
              }).catch(err=>console.log(err))
    
    
    
    setFname('');
    setLname('');
    setUname('');
    setEmail('');
    setPassword('');
    

  }
  
  if(response.response==='successfully registered new user'){
    window.location.replace('/feeds');
  } 

  return (
    <>

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={HandleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={FirstN}
                autoComplete="fname"
                name="firstName"
                value={firstname}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={LastN}
                value={lastname}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={UserN}
                value={username}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                // name="email"
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={EmailN}
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={PassW}
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Linked to='/signin'>
                {"Already have an account? Sign in"}
              </Linked>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    </>
  );
  


}
