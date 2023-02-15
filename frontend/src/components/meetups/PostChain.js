import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';
import ApartmentItem from './ApartmentItem';
import RoomateItem from './RoomateItem';
import SellingItem from './SellingItem';



  const PostChain = ({college, firstAddress, address, pclist, setPcist, list, counter, lookingfor, maxval, minval, typeval, bedroomsval, post, setCurrentId, user, setUser,proplist }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();

 



if(maxval == ""){
    maxval = "0";

}
if(minval == ""){
    minval = "0";
}
if((maxval == "0" && minval == "0") || (maxval == "0" && minval > 0)){

}



useEffect(() => {
  console.log("here");
  console.log(JSON.stringify(college)  + " collegeSubmit in postchain");
  
    
}, []);

let returnedPost;
if(

(
  (parseInt(bedroomsval) <= parseInt(post?.nbedrooms))
  ||
  (bedroomsval == "")
)
&&
(
  (typeval.includes(post?.typeofplace))
  ||
  (typeval[0] == null)
)
&&
(
  (lookingfor.includes(post?.typeofpost))
  ||
  (lookingfor[0] == null)
)

&&

(
  (post.address?.includes(address))
  ||
  (address == '' || address == null)
)

&&

(
  ((parseInt(maxval) >= parseInt(post?.pricepermonth)) && (parseInt(minval) <= parseInt(post?.pricepermonth)))
  ||
  //((maxval == "0" && minval == "0") || (maxval == "0" || minval == "0"))
  (maxval == "0" && minval == "0") || (maxval == "0" && parseInt(minval) <= parseInt(post?.pricepermonth))
)

&&
(
  (college?.title == post?.collegename)
  ||
  (college == "" || college == null)
)


  )
  
  
  {
    
if (post.typeofpost == "Apartment and Roomate"){
        
        console.log("ApartmentItem");
        // return(
        //     <div >
        returnedPost = <ApartmentItem post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
            // </div>
        // );
        }
        if(post.typeofpost == "Looking for a Roomate"){
          console.log("RoomateItem");
          // return(
            returnedPost =   <RoomateItem post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
          // );
        }
        if(post.typeofpost == "Renting"){
          console.log("SellingItem");
            // return(
              returnedPost = <SellingItem  post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>
            // );
        }
     }
return(
<div>{returnedPost}</div>
);

  
}

export default PostChain;