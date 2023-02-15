import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import classes from '../NewMeetupForm.module.css';
import { TextField, Typography, Paper,Button, Grid  } from '@material-ui/core';

import InputBase from '@material-ui/core/InputBase';

import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
//
//import colleges from './collegedata.js';
//import ComboBox from './ComboBox';

import ComboBoxFirst from './ComboBoxFirst';


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyler = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));



const FirstPage = ({ currentId, setCurrentId, user, setUser}) => {

    const navigate = useNavigate()
    const [address, setAddress] = React.useState('');
    const [college, setCollege] = React.useState('');
    

    

    const handleSubmitaddress = async (e) => {
        localStorage.setItem("firstaddress", JSON.stringify(address));
        localStorage.setItem("firstcollege", JSON.stringify(""));
        navigate("/Home/Blog");
      }
  

    return(
        <form className={classes.form} onSubmit={handleSubmitaddress}>
        <div className={classes.control}>
          <label htmlFor='title'>Search by address</label>
          <input type='text' required id='address' value={address} onChange={(e) => setAddress( e.target.value)}/>
          <div onClick={handleSubmitaddress}>
        <Button>search</Button>
    </div>
        </div>


       <div>or</div>
      
      
        <div className={classes.control}>
          <label htmlFor='college'>Search by college Location</label>
          </div>

          <ComboBoxFirst/>
          </form>
    );
}
export default FirstPage;