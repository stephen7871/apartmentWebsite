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
import axios from 'axios';
import { createPost } from '../../actions/posts';
import ComboBox from './ComboBox';




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



const Roomate = ({ currentId, setCurrentId, user, setUser }) => {
  
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));

  const [postData, setPostData] = useState({title: '', selectedFile: '', tags: '', description: '', username: '', max: '', min: '', wanttolive: '', collegename: ''});

  const [switched, setSwitched] = useState(false);
  const [isShowap, setIsShownap] = useState(true);
  const [isShowro, setIsShownro] = useState(false);
  const [isShowroap, setIsShownroap] = useState(false);
  const [selectval, setSelectval] = React.useState('');
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    console.log(user+" user");
  }, []);
  
  
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);


  const dispatch = useDispatch();
  const classstyle = useStyles();
  const classesslide = useStyler();
  const classselect = useStyles();


  const fileSelected = event => {
    const file = event.target.files
    setImage(file)
  }

  const clear = () => {
    setCurrentId(0);
    setPostData({description: '', username: '', max: '', min: '', wanttolive: ''});
  };

  const onchangeprice = (e) => {
    // e.preventDefault();
    //   setPostData({ ...postData, pricepermonth: e.target.value})
    let input = e.target.value ;
    if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
    setPostData({ ...postData, pricepermonth: e.target.value})
    }
    } 
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const formdata = new FormData();
         
      for ( let i = 0; i < image.length; i++ ) {
       formdata.append( "imagecropped", image[ i ], image[ i ].name );
     }
     const collegesel = await JSON.parse(localStorage.getItem("autoselectval"));
         //   // {photos: formdata, address: postData.address, nbedrooms: nbedroomss, pricepermonth: postData.pricepermonth, description: postData.description,username: user?.username, typeofplace: selectval, nroomates: roomatenum, typeofpost: 'Apartment and Roomate', collegename: collegesel.title},
     formdata.append("max", postData.max)
     formdata.append("min", postData.min)
     formdata.append("pricepermonth", postData.pricepermonth)
     formdata.append("description", postData.description)
     formdata.append("username", user?.username)
     formdata.append("wanttolive", postData.wanttolive)
     formdata.append("typeofpost", "Looking for a Roomate")
     formdata.append("collegename", collegesel.title)
      await axios.post("http://127.0.0.1:5001/posts", formdata, { headers: {
       'accept': 'application/json',
       'Content-Type': 'multipart/form-data'
     }})


      
    // const { data } = await axios.post(
        
    //     "/posts",
    //     {description: postData.description, max: postData.max, min: postData.min, wanttolive: postData.wanttolive,username: user?.username, typeofpost: "Looking for a Roomate", collegename: collegesel.title},
    //     config
    //   );
    if (currentId === 0) {
      //dispatch(createPost({ ...postData, username: user, max: postData.max}));
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
  };
  const roomateClick = event => {
    setIsShownro(true);
    setIsShownap(false);
    setIsShownroap(false);
  };
  const roomateapartmentClick = event => {
    setIsShownroap(true);
    setIsShownro(false);
    setIsShownap(false);
  };

  

  // if (!user) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to create a listing.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  return (
    
   
  <form className={classes.form} onSubmit={handleSubmit}>

  <div className={classes.control}>
    <label htmlFor='min' >min price range</label>
    <TextField name="min" variant="outlined"  fullWidth value={postData.min} onChange={(e) => setPostData({ ...postData, min: e.target.value})} />
  </div>
  {/* <div>
    <Scrolebar/>
  </div> */}
  <div className={classes.control}>
    <label htmlFor='max'>max price range</label>
    <TextField name="max" variant="outlined"  fullWidth value={postData.max} onChange={(e) => setPostData({ ...postData, max: e.target.value})} />
  </div>
  <div className={classes.control}>
    <label htmlFor='wanttolive'>where are you looking to move</label>
    <TextField name="wanttolive" variant="outlined"  fullWidth value={postData.wanttolive} onChange={(e) => setPostData({ ...postData, wanttolive: e.target.value})} />
  </div>
  <div className={classes.control}>
  <label htmlFor='wanttolive'>tag a college</label>
  </div>
  <ComboBox/>

  <div className={classes.control}>
    <label htmlFor='wanttolive'>add photosss</label>
    <div>
    <div className="container-buttons">

    <input multiple onChange={fileSelected} type="file" accept="image/*"></input>

          
              </div>
          </div>
  </div>
  <div className={classes.control}>
    <label htmlFor='description'>any other things to add</label>
    <textarea id='description' required rows='5' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}></textarea>
  </div>
  
  <div className={classes.actions}>
     <button>Add listingt</button> 
  </div>
</form>
)
}

export default Roomate;
