import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import { TextField, Typography, Paper,Button, Grid  } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import useStyles from './styles';
import Scrolebar from './Scrolebar';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Apartment from './Apartment';
import Selling from './Selling';
import Roomate from './Roomate';
import { createPost } from '../../actions/posts';
import Sublease from './Sublease';



const btn = makeStyles((theme) => ({
  backGround: {
    bgcolor: 'blue',
    color: 'white',

  }
  
}));

const opentop = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));




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


//import FileBase from 'react-file-base64';



const NewMeetupForm = ({ currentId, setCurrentId, user, setUser }) => {
  
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const opent = opentop();
  const [postData, setPostData] = useState({title: '', selectedFile: '', tags: '', description: '', username: '', max: '', min: '', wanttolive: ''});

  const [switched, setSwitched] = useState(false);
  const [isShowap, setIsShownap] = useState(true);
  const [isShowro, setIsShownro] = useState(false);
  const [isShowroap, setIsShownroap] = useState(false);
  const [isShownSub, setIsShownSub]  = useState(false);
  const [selectval, setSelectval] = React.useState('');
  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem("userInfo")
      )
    );
  }, []);

  // useEffect(() => {
    
  //   console.log(user+" user");
  // }, []);
  
  
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);


  const dispatch = useDispatch();
  const classstyle = useStyles();
  const classesslide = useStyler();
  const classselect = useStyles();


  const clear = () => {
    setCurrentId(0);
    setPostData({title: '', selectedFile: '', tags: '', description: '', username: '', max: '', min: '', wanttolive: ''});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, username: user, max: postData.max}));
      //console.log(postData);
      clear();
    } else {
      
      clear();
    }
  };

  const handleselectChange = (event) => {
    setSelectval(event.target.value);
  };

  const apartmentClick = event => {
    setIsShownap(true);
    setIsShownro(false);
    setIsShownroap(false);
    setIsShownSub(false);
  };
  const roomateClick = event => {
    setIsShownro(true);
    setIsShownap(false);
    setIsShownroap(false);
    setIsShownSub(false);
  };
  const roomateapartmentClick = event => {
   
    setIsShownro(false);
    setIsShownap(false);
    setIsShownroap(true);
    setIsShownSub(false);
  };

  const SubleaseClick = event => {
    setIsShownro(false);
    setIsShownap(false);
    setIsShownroap(false);
    setIsShownSub(true);
  };
  

  // if (!username) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign IIn to create your own memories and like other's memories.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  return (
    
    <>

   
    <div className={opent.formControl} style={{width: '100%', 
    marginTop: '30%', 
    marginLeft: '60%'}} >
      <Card >
        <div style={{textAlign: 'center'}}>
      <Tooltip title="selling an apartment or house" arrow>
    <Button className={opent.formControl}  style={{width: '20%'}} variant="contained" color="primary" onClick={apartmentClick}>Make a Listing?</Button>
    </Tooltip>
    <Tooltip title="Need to sublease an apartment" arrow>
    <Button className={opent.formControl} style={{width: '20%'}} variant="contained" color="primary" onClick={SubleaseClick}>List a SubLease?</Button>
    </Tooltip>
    <Tooltip title="looking for roomates and an apartment" arrow>
    <Button className={opent.formControl}  style={{width: '20%'}} variant="contained" color="primary" onClick={roomateClick}>Need a place?</Button>
    </Tooltip>
    <Tooltip title="have an apartment and looking for roomates" arrow>
    <Button className={opent.formControl} style={{width: '20%'}} variant="contained" color="primary" onClick={roomateapartmentClick}>Need a Roomate?</Button>
    </Tooltip>
    </div>
    
{/* 👇️ show elements on click */}
{isShowap && (
  <Selling currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
)}
{isShowroap && (
  <Apartment currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
)}

{isShowro && (
 <Roomate currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
 
  )}
{isShownSub && (
  <Sublease currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
)}
  </Card>
  </div>

  </>
  
  );
}

export default NewMeetupForm;
