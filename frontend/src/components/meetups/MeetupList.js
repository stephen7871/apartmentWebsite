import React,{useRef,useState,useEffect} from 'react';
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import InputBase from '@material-ui/core/InputBase';
import { Paper,Typography,TextField, Button, Box, Select, Form,  MenuItem, ListItemText, Label, InputLabel, FormLabel  } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import clas from './NewMeetupForm.module.css';
import PostChain from './PostChain'
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ComboBoxFirst from './firstpage/ComboBoxFirst';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setGoldPosts, setPosts } from './setpostactions.js';


import { MenuProps, useStyles } from "./utils";

import { useSelector } from 'react-redux';
import List from './List';
import FormControl from '@material-ui/core/FormControl';
import ComboBoxPostchain from './ComboBoxPostchain';
import { max } from 'moment';
import GoogleMaps from '../map/GoogleMaps';
import { blue } from '@material-ui/core/colors';
import { json } from 'react-router-dom';

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  color: 'grey',
  width: "120%",
  marginTop: '0%',
  position: 'fixed',
  backgroundColor: '#e3f2fd',
  height: '5rem',
};

const revealCommonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  width: "10%",
  backgroundColor: '#e3f2fd',
  height: '5rem',
};



const btn = makeStyles((theme) => ({
  backGround: {
    bgcolor: 'blue',
    color: 'white',

  }
  
}));

const opentop = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const btnPrice = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 80,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



  const MeetupList = ({ setCurrentId, user, currentId}) => {
    const dispatch = useDispatch();

    // const posts = [
    //   {_id:{"$oid":"6388c0673575850466268757"},
    //   photos:["https://stevenewbucket.s3.amazonaws.com/image-1669906534390.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534396.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534413.jpeg"],
    //   createdAt:{"$date":{"$numberLong":"1669903070354"}},
    //   address:"2100 Hillside Rd, Storrs, CT 06269",
    //   typeofplace:"Apartment",
    //   pricepermonth:"1000",
    //   nroomates:"1",
    //   collegename:" A. T. Still University ",
    //   description:"test",
    //   typeofpost:"Apartment and Roomate",
    //   username:"steve","__v":{"$numberInt":"0"}},

    //   {_id:{"$oid":"6388c0673575850466268757"},
    //   photos:["https://stevenewbucket.s3.amazonaws.com/image-1669906534390.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534396.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534413.jpeg"],
    //   createdAt:{"$date":{"$numberLong":"1669903070354"}},
    //   address:"2100 Hillside Rd, Storrs, CT 06269",
    //   typeofplace:"Apartment",
    //   pricepermonth:"1000",
    //   nroomates:"1",
    //   collegename:" A. T. Still University ",
    //   description:"test",
    //   typeofpost:"Apartment and Roomate",
    //   username:"steve","__v":{"$numberInt":"0"}},

    //   {_id:{"$oid":"6388c0673575850466268757"},
    //   photos:["https://stevenewbucket.s3.amazonaws.com/image-1669906534390.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534396.jpeg","https://stevenewbucket.s3.amazonaws.com/image-1669906534413.jpeg"],
    //   createdAt:{"$date":{"$numberLong":"1669903070354"}},
    //   address:"2100 Hillside Rd, Storrs, CT 06269",
    //   typeofplace:"Apartment",
    //   pricepermonth:"1000",
    //   nroomates:"1",
    //   collegename:" A. T. Still University ",
    //   description:"test",
    //   typeofpost:"Apartment and Roomate",
    //   username:"steve","__v":{"$numberInt":"0"}}
    
    // ]
   

    useEffect(() => {
      // Fetch gold posts
      // axios.get('http://127.0.0.1:5001/goldposts')
      //   .then(response => {
      //     const goldPosts = response.data;
      //     console.log(JSON.stringify(goldPosts)+ "goldPosts")
      //     dispatch(setGoldPosts(goldPosts));
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
  
      // Fetch silver posts
      axios.get('http://127.0.0.1:5001/posts')
        .then(response => {
          const posts = response.data;
          console.log(JSON.stringify(posts)+ "postsss")
          dispatch(setPosts(posts));
        })
        .catch(error => {
          console.error(error);
        });
    }, [dispatch]);


  // const goldPosts = useSelector(state => state.goldPosts);
  // console.log(goldPosts + "usestae gold");
  // const silverPosts = useSelector(state => state.silverPosts);
  const posts = useSelector((state) => state.posts);
     
   console.log(JSON.stringify(posts) + "posts");
    const initialList = [
      {looking: '',typeval: '', bedrooms: ''}
    ];
    

    
   
    
    const [counter, setCounter]= useState(0);
  const [changeStyleBtn, setChangeStyleBtn] = React.useState(false);
  const [inputText, setInputText] = useState("");
  const [bedroomsval, setBedroomsval] = React.useState("");
  const [lookingfor, setLookingfor] = React.useState("Looking for");
  const [typeofplaceval, setTypeofplaceval] = React.useState("Type");
  const [selected, setSelected] = useState([]);
  const [typeval, setTypeval] = useState([]);
  const [maxval, setMaxval] = React.useState('');
  const [minval, setMinval] = React.useState('');
  const [show, SetShow] = React.useState(false);
  const [showCollege, setShowCollege] =  React.useState(false);
  const [flag, setFlag] = React.useState(true);
  const [cflag, csetFlag] = React.useState(false)
  const [coll, setcoll] = useState('');
  const [list, setList] = React.useState({looking: '',typeval: '', bedrooms: ''});
  const [pricelist, setPricelist] = React.useState({min: '',max: ''});
  const [name, setName] = React.useState('');
  const [pclist, setPcist] =  React.useState({looking: '',typeval: '', bedrooms: ''});
  const [addlist, setAddlist] = React.useState([]);
  const [topost, setTopost] = React.useState({});
  const [address, setAddress] = React.useState('');
  const [addressSubmit, setAddressSubmit] = React.useState('');
  const [collegeSubmit, setCollegeSubmit] = React.useState('');
  const [firstAddress, setFirstAddress] = React.useState('');
 
 useEffect(async () => {
  setAddressSubmit(await JSON.parse(localStorage.getItem("firstaddress")));
  setAddress(await JSON.parse(localStorage.getItem("firstaddress")));
  setCollegeSubmit(await JSON.parse(localStorage.getItem("firstcollege")));
  console.log(JSON.stringify( await JSON.parse(localStorage.getItem("firstcollege")))+ " searchcollege in meetuplist");
}, [ ] );
  
// useEffect(async () => {
//   setAddressSubmit(await JSON.parse(localStorage.getItem("firstaddress")));
//   setAddress(await JSON.parse(localStorage.getItem("firstaddress")));
//   setCollegeSubmit(await JSON.parse(localStorage.getItem("firstcollege")));
//   console.log(JSON.stringify( await JSON.parse(localStorage.getItem("firstcollege")))+ " searchcollege in meetuplist");
// }, [ ] );

  const handleminvalChange = (event) => {
    setMinval(event.target.value);
  };

  const handlemaxvalChange = (event) => {
    setMaxval(event.target.value);
  };

  const handletypeChange = (event) => {
    setTypeofplaceval(event.target.value);
  };

  const handlelookingforChange = (event) => {
    setLookingfor(event.target.value);
  };
  
  const handlebednChange = (event) => {
    setBedroomsval(event.target.value);
  };

  const handleSubmitaddress = async (e) => {
    e?.preventDefault();
    setAddress(addressSubmit);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (cflag == true){
      setMaxval(pricelist.max);
      setMinval(pricelist.min);
      csetFlag(false);
      setFlag(true);
      console.log(maxval+ " maxval")
      if (flag == false){
        setMaxval(pricelist.max);
        setMinval(pricelist.min);
        setFlag(true);
        csetFlag(false);
        console.log(maxval+ " maxval")
      }

    }
    csetFlag(true);
    setFlag(false);
    
  }
  const comboSubmit = async (e) => {
    e.preventDefault();
    console.log(await JSON.parse(localStorage.getItem("firstcollegesecond"))+ " firstcollegesecond")
    setCollegeSubmit(await JSON.parse(localStorage.getItem("firstcollegesecond")));
    // console.log(coll +" coll")
    
    

      }

  const revealCollegeField = () =>{
    revealChangeStyleBtn();
    if (showCollege == true){
      setShowCollege(false);
    }
    if (showCollege == false){
      setShowCollege(true);
    }
  }

  const revealTextField = () =>{
    if (show == true){
      SetShow(false);
    }
    if (show == false){
      SetShow(true);
    }
  }
  const revealChangeStyleBtn = () =>{
    if (changeStyleBtn == true){
      setChangeStyleBtn(false);
    }
    if (changeStyleBtn == false){
      setChangeStyleBtn(true);
    }
  }
  // useEffect(() => {
    // storing input name
    //console.log(JSON.stringify(posts) + "meetuplist");
    
  // }, []);
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const opent = opentop();
  const classess = useStyles();
  
  const lookingforoptions = [
    "Apartment and Roomate",
    "Looking for a Roomate",
    "Renting",
  ];

  const typeoptions = [
    "House",
    "TownHouse",
    "Apartment",
    "Condo",
  ];
  const isAllSelected =
  lookingforoptions.length > 0 && selected.length === lookingforoptions.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === lookingforoptions.length ? [] : lookingforoptions);
      
      return;
    }
    setSelected(value);
    
    
  };



  const typeChange = (event) => {
    const value = event.target.value;
    console.log("changing type");
    if (value[value.length - 1] === "all") {
      setTypeval(typeval.length === typeoptions.length ? [] : typeoptions);
      return;
    }
    setTypeval(value);
    
  };

  


  
 

  // if (!user) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to create your own memories and like other's memories.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  const onchangeprice = (e) => {
    // e.preventDefault();
    //   setPostData({ ...postData, pricepermonth: e.target.value})
    let input = e.target.value ;
    if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
      setPricelist({ ...pricelist, max: e.target.value })}
    }

    const onchangepricemin = (e) => {
      // e.preventDefault();
      //   setPostData({ ...postData, pricepermonth: e.target.value})
      let input = e.target.value ;
      if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) ){
        setPricelist({ ...pricelist, min: e.target.value })}
      }
      

      const [open, setOpen] = React.useState(false);

      const handleTooltipClose = () => {
        setOpen(false);
      };
    
      const handleTooltipOpen = () => {
        setOpen(true);
      };
 
     
  return (
    <>
    {/* bellow added this fixed postion */}
    <div style={{ top: '10%',position: 'fixed', zIndex:'100'}}>
    <Box sx={{ ...commonStyles}}>


    <FormControl className={opent.formControl} >
    <div className={clas.control}>
    <div >
    <TextField 

onKeyPress={(ev) => {
  // console.log(`Pressed keyCode ${ev?.key}`);
  if (ev?.key === 'Enter') {
    handleSubmitaddress();
    ev?.preventDefault();
  }
}} style={{float: 'left', top: '3%'}} label="address" type='text' id='outlined'value={addressSubmit} onChange={(e) => setAddressSubmit( e?.target.value)}/> 
    
    </div>
  </div>

 
    </FormControl>

    
    {/* <Tooltip title={
    <>



</>
  }> */}


{/* { changeStyleBtn ? (
 
  <Button  style={{marginTop: '1%'}}variant="contained" color="primary" onClick={revealCollegeField}> College{<ExpandMoreIcon/>}</Button>


):(

<Button  style={{marginTop: '1%'}}variant="outlined" color="primary" onClick={revealCollegeField}> College{<ExpandMoreIcon/>}</Button>)
  } */}

  <>

  <FormControl style={{width: '15%'}}className={opent.formControl} >
      <form onSubmit={comboSubmit}>

      <ComboBoxFirst coll={"display"}/>
     
      <button onChange={comboSubmit}>search</button>
      </form>
      </FormControl>
      

      
   
      
      <FormControl variant="outlined" style={{width: '10%'}} className={opent.formControl} >
      <InputLabel  id="mutiple-select-label">Looking for</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected?.join(", ")}
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes?.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected?.length > 0 && selected?.length < lookingforoptions?.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {lookingforoptions?.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected?.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
    </>


   





    
  
  
    
    

    

    

    


      
      <FormControl variant="outlined" style={{width: '13%'}} className={opent.formControl}  >
      <InputLabel id="mutiple-select-label">Type of Place</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        
        value={typeval}
        onChange={typeChange}
        renderValue={(typeval) => typeval?.join(", ")}
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes?.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes?.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                typeval?.length > 0 && typeval?.length < typeoptions?.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes?.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {typeoptions?.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={typeval?.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    
    <FormControl variant="outlined" style={{width: '10%'}} className={opent?.formControl} >
    <InputLabel id="demo-simple-select-label">bedrooms</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={bedroomsval}
          label="bedrooms"
          onChange={handlebednChange}
        >
          <MenuItem value={""}>clear</MenuItem> 
          <MenuItem value={1}>1+</MenuItem>
          <MenuItem value={2}>2+</MenuItem>
          <MenuItem value={3}>3+</MenuItem>
          <MenuItem value={4}>4+</MenuItem>
        </Select>
      </FormControl>

     
      

      <>
      <FormControl className={btnPrice.formControl}>
      <div style={{width: '10%'}}>
        
      <Button  onClick={revealTextField}> price </Button>
      
      </div>
        {show && (
          <>
          
          <form onSubmit={handleSubmit}>
          <TextField  style={{width: '25%'}} id="filled-basic" label="max" variant="filled" value={pricelist?.max} onChange={onchangeprice}/>
          
          <TextField style={{width: '25%'}} id="filled-basic" label="min" variant="filled" value={pricelist?.min} onChange={onchangepricemin}/>
         
          <Button style={{width: '10%'}} variant="contained" color="primary" onChange={handleSubmit}>Submit</Button>
         
          </form>
          </>
        )}
        </FormControl>
        </>

      


</Box>
</div>

<div className={classes.map}>
  <GoogleMaps currentId={currentId} setCurrentId={setCurrentId} />
</div>
<div className={classes.floatchild}>
  <ul>
    {posts?.map((apartmentpost) => {
      return (
        <div >
          <PostChain firstAddress={firstAddress} college={collegeSubmit} pclist={pclist} address={address} setPcist={setPcist} counter={counter} list={list} collegesel={coll} maxval={maxval} minval={minval} post={apartmentpost} lookingfor={selected} typeval={typeval} bedroomsval={bedroomsval} input={inputText} setCurrentId={setCurrentId} />
        </div>
      );
    })}
  </ul>
</div>








    
    
    </>
    
    
  );
}

export default MeetupList;
