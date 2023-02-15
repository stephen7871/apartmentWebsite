import React,{useState,useEffect} from 'react';
import CustomMeetupItem from './CustomMeetupItem';
import classes from './MeetupList.module.css';
import { Paper,Typography, Button } from '@material-ui/core';
import MeetupList from './MeetupList';
import NewMeetupForm from './NewMeetupForm';
import MeetupItem from './MeetupItem'
import PersonalPost from './PersonalPost';
import Alert from '@material-ui/lab/Alert';
import PromotePost from './promotePost/PromotePost';
import { useSelector } from 'react-redux';
import {deletePost} from '../../actions/posts';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import Card from '../ui/Card';
import moment from 'moment';
import useStyles from './styles.js';
import classess from './MeetupItem.module.css';


  const MyPost = ({ currentId,setCurrentId, user, setUser }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classstyles = useStyles();
  const [counter, setCounter]= React.useState(false);
  const [postList, setPostList] = useState([]);
  const [hasError, setError] = React.useState(false);
  const [switchPage, setSwitchPage] = React.useState(false);
  const [postInfo, setPostInfo] = useState('');
  const [postType, setPostType] = useState('');
  

  useEffect(() => {
    posts.map((post) => {
      
      console.log("Username" + JSON.stringify(user?.username));
        if(post?.username === user?.username){
          setCounter(true);
          console.log("hereee");
             
    }
    }
    )
    
  }, [posts]);


  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem("userInfo")
      )
    );
  }, []);

  

  

  

  
  if (!username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to see your listing.
        </Typography>
      </Paper>
    );
  }
  

  // const handleOnSubmit = (e) =>{
  //   e.preventDefault();
  //   console.log(post._id, " post id");
  //   dispatch(deletePost({id: post._id}));

  // }


  const navigateToPromote = (post) => {
    
    setPostInfo(post);
    setSwitchPage(true);
    setPostType(post.typeofpost);
    console.log(JSON.stringify(post.typeofpost) + "posttype");
    // 👇️ navigate to /contacts
    
  };

  const handleOnSubmit = (post) =>{
    
    console.log(post?._id, " post id");
    console.log(post?.route, " post?.route");
    dispatch(deletePost({id: post?._id,}, {route: post?.route}));
  
  }

return (
  
  <>
  { counter ? (
    <div style={{width: '50%', 
    top: '20%', 
    left: '30%',
    position: 'absolute'}}>
    {switchPage
      ? (<>
      {/* <PromotePost post={postInfo} typeofpost={"Apartment and Roomate"}/> */}
      
      <PromotePost post={postInfo} typeofpost={postType}/>
   
      </>
      )
      : (

        posts.map((post) => {
          if(post?.username === user?.username){
          
          return(<>
        

        <li className={classess.item}>
      <Card>
        <div className={classess.content}>
          <h3>{post.title}</h3>
          <div className={classstyles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.wanttolive}</Typography>
            </div>
          <p>{post.description}</p>
        </div>
        <Button Button onClick={() => handleOnSubmit(post)}>
          <DeleteIcon/>
      </Button>
        <div className={classess.actions}>
        <Button Button onClick={() => navigateToPromote(post)}>Promote</Button>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>
    </>
    
          )
          }
        })

      )
    }
    </div>) :(
      

        <Alert severity="info">You have no Posts yet.  Add your own posts by going to the "Add Posts" page</Alert>
      
    )}
    </>

);
    }

    



  

export default MyPost;
