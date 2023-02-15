import React, { useState, useEffect, useRef } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './NewMeetupForm.module.css';
import { TextField,Button} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import sidebysideClasses from './Sidebyside.module.css'
import InputBase from '@material-ui/core/InputBase';
import {imgPreview} from './crop/imgPreview';
import Box from '@mui/material/Box';
import AlertDialogSlide from './AlertDialogSlide'
import Cropped from './crop/Cropped';
import Resizer from "react-image-file-resizer";
import {useSelector } from 'react-redux';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';



import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './crop/canvasPreview';
import { useDebounceEffect } from './crop/useDebounceEffect'
import Backdrop from '@mui/material/Backdrop';

// import 'react-image-crop/dist/ReactCrop.css'





import ComboBox from './ComboBox';
import TagBox from './TagBox'
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';
import ApartmentItem from './ApartmentItem';
import { padding } from '@mui/system';

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

const opentop = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function centerAspectCrop(
  mediaWidth,
  mediaHeight,
  aspect,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}



  
  const useStyler = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));



const Apartment = ({ currentId, setCurrentId, user, setUser}) => {
    const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));

    const [isActive, setIsActive] = useState(false);


    const [postData, setPostData] = useState({address: '', nbedrooms: '', typeofplace: '', pricepermonth: '', nroomates: '', collegename: '', photos: '', description: '', username: ''});
    
   
    const [selectval, setSelectval] = React.useState('');
    const [roomatenum, setroomatenum] = React.useState('');
    
    const[nbedroomss,setNbedroomss ] = React.useState('')
    

    
    const [image, setImage] = React.useState([]);
    const [addImage, setAddimage] = React.useState(null);
    const opent = opentop();

    
    
    
      useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

      const handlenbedroomssChange = (event) => {
        setNbedroomss(event.target.value);
      };

  
  
   
    const clear = () => {
      setCurrentId(0);
      setPostData({address: '', nbedrooms: '', typeofplace: '', pricepermonth: '', nroomates: '', collegename: '', photos: '', description: '', username: '', typeofpost: '', selectval: '', roomatenum: ''});
    };
  
    const handleselectChange = (event) => {
        setSelectval(event.target.value);
      };

    // const fileSelected = event => {
    //   // const file = event.target.files

    //   const file = event.target.files
    //   setImage(file);
    //   console.log(JSON.stringify(image.indexOf(image[0].name)) + "image"); 
    // }

    const fileSelected = event => {
      // const file = event.target.files
      const file = event.target.files
      setAddimage(file);
      // console.log(JSON.stringify(addImage) + "addImage"); 
    }

    const fileSelectedAdd = () => {
      // const file = event.target.files
      // console.log(JSON.stringify(JSON.stringify(addImage[0].name)) + "addImage name"); 
      // const newList = image?.push(addImage[0].name);
      
      setImage([...image, addImage]);
      // console.log(JSON.stringify(image) + "image"); 
    }
    const handleAnotherPhoto = () => {
      console.log(JSON.stringify(image.name) + "image"); 
      const newList = image.concat(addImage);
      setImage(newList);
    }

    const handleChange = event => {
      const file = event.target.files
      setAddimage(file);
    }

    const clearPhotos = event => {
      
      setImage(null);
    }
    

      const handleselectromate = (event) => {
        setroomatenum(event.target.value);
      };
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };


       
         const formdata = new FormData();
         for ( let i = 0; i < image?.length; i++ ) {
          formdata.append( "imagecropped", image[i], imageNames[i]);
        }
        // formdata.append( "imagecropped", image, "McNally_.PNG")
        // console.log(JSON.stringify(image) + "image")
          const collegesel = await JSON.parse(localStorage.getItem("autoselectval"));
            //   // {photos: formdata, address: postData.address, nbedrooms: nbedroomss, pricepermonth: postData.pricepermonth, description: postData.description,username: user?.username, typeofplace: selectval, nroomates: roomatenum, typeofpost: 'Apartment and Roomate', collegename: collegesel.title},
        formdata.append("address", postData.address)
        formdata.append("nbedroomss", nbedroomss)
        formdata.append("pricepermonth", postData.pricepermonth)
        formdata.append("description", postData.description)
        formdata.append("username", user?.username)
        formdata.append("typeofplace", selectval)
        formdata.append("nroomates", roomatenum)
        formdata.append("typeofpost", 'Apartment and Roomate')
        formdata.append("collegename", collegesel.title)
        formdata.append("typeofpromote", "4")
         await axios.post("http://127.0.0.1:5001/posts", formdata, { headers: {
					'accept': 'application/json',
					'Content-Type': 'multipart/form-data'
				}})
       
      if (currentId === 0) {
    
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

//////////resize image bellow

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });


  const b64toBlob = (b64Data, contentType, sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

 


/////resize image bellow
      /////crop functions below

      
      
      
        const [imgSrc, setImgSrc] = useState('')
        const previewCanvasRef = useRef(null)
        const imgRef = useRef(null)
        const [crop, setCrop] = useState()
        const [completedCrop, setCompletedCrop] = useState()
        const [scale, setScale] = useState(1)
        const [rotate, setRotate] = useState(0)
        const [aspect, setAspect] = useState(16 / 9)
        const [open, setOpen] = React.useState(false);
        const [imageNames, setImageNames] = useState([]);
        
      
        function toBlob(canvas){
          return new Promise((resolve) => {
            canvas.toBlob(resolve)
          })
        }

        const onSelectFile  = async (e)  => {
          if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            // const reader = new FileReader()
            // reader.addEventListener('load', () =>
            //   setImgSrc(reader.result?.toString() || ''),
            // )
          const file = e.target.files[0];
          const image = await resizeFile(file);
          var base64result = image?.split(';base64,')[1];
          
          const blob = b64toBlob(base64result, 'image/png');
          const blobUrl = URL.createObjectURL(blob);
            

          setImgSrc(blobUrl);
            // reader.readAsDataURL(e.target.files[0])
            setImageNames([...imageNames, e.target.files[0]?.name]);
            
          }

          // const file = e.target.files[0];
          // const image = await resizeFile(file);
        
          
          // var base64result = image?.split(';base64,')[1];
          
          // const blob = b64toBlob(base64result, 'image/png');
          // const blobUrl = URL.createObjectURL(blob);
          // const img = document?.createElement('img');
          // img.src = blobUrl;
          // document.body.appendChild(img);

        }
       
        function onImageLoad(e) {
          if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
          }
        }
      

        useDebounceEffect(
          async () => {
            if (
              completedCrop?.width &&
              completedCrop?.height &&
              imgRef.current &&
              previewCanvasRef.current
            ) {
              // We use canvasPreview as it's much faster than imgPreview.
              canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop,
                scale,
                rotate,
              )
            }
          },
          100,
          [completedCrop, scale, rotate],
        )
      
        function handleToggleAspectClick() {
          if (aspect) {
            setAspect(undefined)
          } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(16 / 9)
            setCrop(centerAspectCrop(width, height, 16 / 9))
          }
        }
        
        
        
      
        
        

        const resizeSave = async() => {
          const blob = await imgPreview(
            imgRef.current,
            completedCrop,
            scale,
            rotate,
          );

          // const image = await resizeFile(blob);
          // var base64result = image?.split(';base64,')[1];
          
          // const blobFinal = b64toBlob(base64result, 'image/png');
          // const blobUrl = URL.createObjectURL(blobFinal);
          // const img = document?.createElement('img');
          // img.src = blobUrl;
          // document.body.appendChild(img);
          setImage([...image, blob]);
          handleClose();
        }
        const handleClose = () => {
          
          setOpen(false);

        };
        const handleToggle = () => {
          setOpen(!open);
        };

        const addScale = () => {
          setIsActive(current => !current);
          if (scale == 4){
            setScale(1);
          }else{
            setScale(scale + 0.5);
          }
          
        }
        const removeScale = () => {
          if (scale < 1){
            setScale(1);
          }else{
            setScale(scale - 0.5);
          }
          
        }

        //////
    
      
  

    return(
      <div style={{position: 'relative', zIndex: '1'}}>
        <div style={{display: 'inline-block'}}>
<input type="text" name="firstname" />
<input type="text" name="lastname" />
</div>
        {/* <Cropped/> */}
        
        <form className={classes.form} onSubmit={handleSubmit}>
        
 
<div style={{}}>

  <div style={{ left:'10%', float: 'left', marginRight: '5px', textAlign: 'center'}}>
  <label>Bedrooms</label>
    <div>
      
      <FormControl className={opent.formControl}>
      
      {/* <InputLabel id="demo-mutiple-name-label">Beds</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={nbedroomss}
          onChange={handlenbedroomssChange}
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

  <div  style={{ bottom: '75%', float: 'left', marginRight: '5px', textAlign: 'center'}}>
  <label>Type</label>
    <div>
      <FormControl className={opent.formControl}>
   
      {/* <InputLabel id="demo-mutiple-name-label">Type</InputLabel> */}
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
  <div  style={{ bottom: '75%', float: 'left', marginRight: '5px',textAlign: 'center'}}>
  <label>Roomates</label>
  <div>
      <FormControl className={opent.formControl}>
    
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={roomatenum}
          onChange={handleselectromate}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7+</MenuItem>
          </Select>
      </FormControl>
    
    </div>
  </div>


  <div style={{ bottom: '75%'}}>
  <label>Rent</label>
  <FormControl className={opent.formControl}>
    
        {/* <InputLabel htmlFor="demo-customized-textbox">rent</InputLabel> */}
        <BootstrapInput inputProps={{pattern: "[0-9]*",}} fullWidth value={postData.pricepermonth} onChange={onchangeprice}/>
      </FormControl>
      </div>
  
      
 
 

  <div className={classes.control}>
    {/* <label htmlFor='wanttolive'>add photosss</label> */}
    <div>
    <div className="container-buttons">
{/*  */}
    {/* <input multiple onChange={fileSelected} type="file" accept="image/*"></input> */}
    {/* <input multiple onChange={handleChange} type="file" accept="image/*"/>
     
    */}
</div>

<div  className={classes.control}>
    <label style={{}} htmlFor='title'>Address</label>
    <input style={{ width:'40%'}} type='text' id='address' value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value})}/>
  </div>
  
<div >


  <div style={{display: 'inline-block'}}>
      <div>
        <div className={classes.control} onClick={handleToggle}>
        <label htmlFor='title'>Add Photos</label>
        <input style={{float: 'left', marginRight: '5px', width:'63%'}}   type="file" accept="image/*" onChange={onSelectFile} />
        
        </div>
        </div>
      <div className={classes.actionsClear} > 
      <button style={{fontSize: '12px'}} variant='outlined' onclick={clearPhotos}>
   
    clear 

    </button>
    </div>
    </div>
        
      


      
      
      {!!imgSrc && (
       
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex?.drawer + 1 }}
        open={open}
        
      >
        
        <div style={{marginTop: "10%", left: "60%", position: "reletive"}}>
          
            
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        
        
          
        
<div style={{width: '80%',bottom: '10%',top: '10%',right:'0%'}}>
  <Box  sx={{
        width: 800,
        height: 700,
        border: '4px black',
        
        
        backgroundColor: 'white',
          
      }}>
    
    <div style={{textAlign: 'center'}}>
  {/* <div className={opentop.formControl}> */}
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          
        >

            
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
            
          />
          
        </ReactCrop>
        
        </div>
        {/* {!!completedCrop && (
            
            <div style={{position: "absolute", minWidth: '80%', left: '50%', bottom: "35%"}}>
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
          </div>

          
          
        )} */}
        {/* </div> */}
        
        <div style={{textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={handleClose}>cancel</Button>
        
        {/* <Button  variant="contained" color="primary" onClick={fileCompleted}>  submit</Button> 
        <Button  variant="contained" color="primary" onClick={fileValues}>  show file values</Button>  */}

        <Button style={{
          backgroundColor: isActive ? 'salmon' : '',
          color: isActive ? 'white' : '',
        }}
        onClick={addScale}>
        <AddIcon/>
        </Button>
        <Button onClick={removeScale}>
        <RemoveIcon/>
        </Button>
        <Button  variant="contained" color="primary" onClick={resizeSave}>save</Button> 
        </div>
        
      
      
        
       
        
        
        
        
        
        </Box>
        
        </div>
        </div>
      </Backdrop>
       
      )}
      
      
      
     
      

      
      
    </div>
  
   
          
              </div>
          </div>

  </div>
  
 
  <div className={classes.control}>
    <label htmlFor='description'>Description of listing</label>
    <textarea id='description'  rows='5' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}></textarea>
  </div>
 
  <div  className={classes.actions}>
    <button >Add listing</button>
  </div>
  <div className={classes.actionsLeft}>
    <button >See a preview</button>
  </div>
 
</form>
</div>
    );
}
export default Apartment;