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
import { ThemeProvider, createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
//import { createPost } from '../../actions/posts';
import Autocomplete from '@mui/material/Autocomplete';
//import colleges from './collegedata.js';
//import ComboBox from './ComboBox';
import FileBase from 'react-file-base64';
import { createPost }  from '../../actions/posts.js';
import colleges from './collegedata';
import ComboBox from './ComboBox';
import axios from 'axios';
import { CREATE } from '../../constants/actionTypes';
//const theme = createMuiTheme();

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



const Selling = ({ currentId, setCurrentId, user, setUser}) => {
    const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));

    const [postData, setPostData] = useState({address: '', nbedrooms: '', typeofplace: '', pricepermonth: '', nroomates: '', collegename: '', photos: '', description: '', username: ''});
  
    const [switched, setSwitched] = useState(false);
    const [isShowap, setIsShownap] = useState(true);
    const [isShowro, setIsShownro] = useState(false);
    const [isShowroap, setIsShownroap] = useState(false);
    const [selectval, setSelectval] = React.useState('');
    const [roomatenum, setroomatenum] = React.useState('');
    const [addresss, setAddresss] = React.useState('');
    const[nbedroomss,setNbedroomss ] = React.useState('')
    const [pricepermonthh, setPricepermonthh] = React.useState('');
    const [photoss, setPhotoss] = React.useState('');
    const [descriptionn, setDescriptionn] = React.useState('');
  
   
    const [image, setImage] = React.useState(null);

    useEffect(() => {
      //console.log(user?.username + "user");
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
      setPostData({address: '', nbedrooms: '', typeofplace: '', pricepermonth: '', nroomates: '', collegename: '', photos: '', description: '', username: '', typeofpost: '', selectval: '', roomatenum: ''});
    };
  
    const handleselectChange = (event) => {
        setSelectval(event.target.value);
      };

      const handlenbedroomsChange = (event) => {
        setNbedroomss(event.target.value);
      };
      const handlePhoto = (e) => {
        setPostData({...postData, photo: e.target.files[0]});
    }

      const handleselectromate = (event) => {
        setroomatenum(event.target.value);
      };
    
    const axioshandlesubmit = async (e) => {
  
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
      // console.log("postdata.addres " + postData.nbedrooms); 
      // console.log("postdata.pricepermonth " + postData.pricepermonth);
      // console.log("postdata.photos " + postData.photos);
      // console.log("postdata.description " + postData.description);
      const collegesel = await JSON.parse(localStorage.getItem("autoselectval"));
      formdata.append("address", postData.address)
        formdata.append("nbedrooms", nbedroomss)
        formdata.append("pricepermonth", postData.pricepermonth)
        formdata.append("description", postData.description)
        formdata.append("username", user?.username)
        formdata.append("typeofplace", selectval)
        formdata.append("typeofpost", 'Renting')
        formdata.append("collegename", collegesel.title)
         await axios.post("http://127.0.0.1:5001/posts", formdata, { headers: {
					'accept': 'application/json',
					'Content-Type': 'multipart/form-data'
				}})
      // const { data } = await axios.post(
      //   "/posts",
      //   {address: postData.address, nbedrooms: nbedroomss, pricepermonth: postData.pricepermonth, description: postData.description,username: user?.username, typeofplace: selectval, typeofpost: 'Renting', collegename: collegesel.title},
      //   config
      // );
      // dispatch({ type: CREATE, payload: data });
     
      //console.log(collegesel.title + " college name");
      if (currentId === 0) {
        //dispatch(createPost({ ...postData, username: user?.username, typeofplace: selectval, nroomates: roomatenum, typeofpost: 'Aparment', collegename: collegesel.title}));
       // console.log(postData);
        clear();
      } else {
        
        clear();
      }
    };
    const onchangeprice = (e) => {
      // e.preventDefault();
      //   setPostData({ ...postData, pricepermonth: e.target.value})
      let input = e.target.value ;
      if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
      setPostData({ ...postData, pricepermonth: e.target.value})
      }
      } 

    return(

        <form className={classes.form} onSubmit={handleSubmit}>
  <div className={classes.control}>
    <label htmlFor='title'>address</label>
    <input type='text' required id='address' value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value })}/>
  </div>


  <div className={classes.control}>
    <label htmlFor='min' >number of bedrooms</label>
    <div>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={nbedroomss}
          onChange={handlenbedroomsChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  </div>

  <div className={classes.control}>
    <label htmlFor='min' >house or apartment</label>
    <div>
      <FormControl className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectval}
          onChange={handleselectChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"House"}>House</MenuItem>
          <MenuItem value={"Apartment"}>Apartment</MenuItem>
          <MenuItem value={"Condo"}>Condo</MenuItem>
          <MenuItem value={"TownHouse"}>TownHouse</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  </div>
  {/* <div>
    <Scrolebar/>
  </div> */}
  <div className={classes.control}>
    <label htmlFor='max'>price per month</label>
    <TextField name="pricepermonth"
    variant="outlined" inputProps={{pattern: "[0-9]*",}} fullWidth value={postData.pricepermonth} onChange={onchangeprice} />
    {/* <TextField name="max" variant="outlined"  fullWidth value={postData.max} onChange={(e) => setPostData({ ...postData, max: e.target.value})} /> */}
  </div>
  
  <div className={classes.control}>
    <label htmlFor='college'>Tag a college Location</label>
    </div>
    <ComboBox/>
    
  {/* </div> */}
  <div className={classes.control}>
    <label htmlFor='wanttolive'>add photos</label>
    <div>
    {/* <FileBase type="file" name="photos" accept=".png, .jpg, .jpeg" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, photos: base64 })} /> */}


    <input multiple onChange={fileSelected} type="file" accept="image/*"></input>

    </div>
  </div>
  <div className={classes.control}>
    <label htmlFor='description'>any other things to add</label>
    <textarea id='description' required rows='5' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}></textarea>
  </div>
  <div className={classes.actions}>
    <button>Add listing</button>
  </div>
</form>
    );
}
export default Selling;





