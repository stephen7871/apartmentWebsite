import React, { useState, useEffect,useSelector } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, getGoldPosts } from '../../actions/posts';
import NewMeetupForm from '../meetups/NewMeetupForm.js';
import MeetupList from '../meetups/MeetupList.js';
//import AllMeetupsPage from '../../pages/AllMeetups';
//import Layout from '../layout/NewLayout';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

//import Auth from '../Auth/Auth.js';
import { getUsers } from '../../actions/posts';
import MyPost from '../meetups/MyPost';
//import Chat from '../../pages/Chat';
import Chatpage from '../../Pages/Chatpage';
import Homepage from '../../Pages/Homepage';
import PromotePost from '../meetups/promotePost/PromotePost';
import GoogleMaps from '../map/GoogleMaps';
import classes from './NavbarStyles.module.css'
import Cropped from '../meetups/crop/Cropped';
//import SetAvatar from '../SetAvatar';




const Home = (props ) => {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem("name")));
 
  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem("userInfo")
      )
    );
  }, []);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [goldPosts, setGoldPosts] = useState([]);
  
  //  useEffect(() => {
  //   dispatch(getUsers());
  // }, [currentId, dispatch]);

  

   useEffect(async() => {
    
  //  dispatch(getGoldPosts());
    dispatch(getPosts());
}, [currentId, dispatch]);



 
  
  
  

  return (
    
    
    
    
<div >
            <div className={classes.navbar}>
            <Navbar user={username} setUser={setUserName} />
            </div>
            <Routes>

              <Route path="Auth" element={<Homepage />}/>  
             <Route path="Blog" element={

             <MeetupList currentId={props.currentId} setCurrentId={props.setCurrentId} user={username} setUser={setUserName} />
             
             }/> 
             <Route path="Crop" element={

<div style={{marginTop:'60%',marginRight: '50%' }}>
<Cropped/>
</div>

}/> 
            
            
            <Route path="CreatePost" element={<NewMeetupForm currentId={props.currentId} setCurrentId={props.setCurrentId} user={username} setUser={setUserName} />}/>
           
            <Route path="MyPost" element={<MyPost currentId={props.currentId} setCurrentId={props.setCurrentId} user={username} setUser={setUserName} />}/> 
            {/* <Route path="Map" element={
                 <GoogleMaps  currentId={props.currentId} setCurrentId={props.setCurrentId}/>
            }/>   */}
            {/* <Route path="Promote" element={<PromotePost currentId={props.currentId} setCurrentId={props.setCurrentId} user={username} setUser={setUserName} />}/>  */}
            {/* <Route path="SetAvatar" element={<SetAvatar/>}/> */}
            {/* <Route path="Promote" element={<StripeContainerApp/>}/> */}
            <Route path= "Chats" element={<Chatpage />} /> 
            </Routes>
            </div>           
             
      
      
        
      
  );
};

export default Home;
