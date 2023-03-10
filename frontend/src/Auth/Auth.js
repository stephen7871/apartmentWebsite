import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Navbar from '../Navbar/Navbar.js'
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import { Navigate, useNavigate } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', username: '', password: '', confirmPassword: '' };

const SignUp = (props) => {
  const [hasError, setError] = React.useState(false);
  const [acountExist, setAcountExist] = React.useState(false);
///added useloalStorage
function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

  const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      return getStorageValue(key, defaultValue);
    });
  
    useEffect(() => {
      // storing input name
      localStorage.setItem(key, JSON.stringify(value));
      
    }, [key, value]);
  
    return [value, setValue];
  };

  const [form, setForm] = useState(initialState);
  //const [form, setForm] = useLocalStorage("form",initialState);

  
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.email)
    if(form.email.includes('@gmail.com')){
      if (isSignup) {
        dispatch(signup(form, navigate, props.user, props.setUser));
      } else {
        dispatch(signin(form, navigate, props.user, props.setUser));
      }

    }else{
      setError(true)
    }
      
  };

  


  const handleChange = (e) =>{

  setForm({ ...form, [e.target.name]: e.target.value })
  // localStorage.setItem("name", JSON.stringify(form));
  
    
  }

  //bellow added the value part of <Input value={form} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
   //           <Input value={form}  name="lastName" label="Last Name" handleChange={handleChange} half />

  return (
    <>
    <div className={classes.head}>Stephen's Blog site</div>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        { hasError && (
          <Alert severity="error">please use an username that ends with @gmail.com </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
            
              <Input value={form} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input value={form}  name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default SignUp;

