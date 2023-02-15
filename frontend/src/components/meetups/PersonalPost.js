import React,{useEffect} from 'react';
import Card from '../ui/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import {deletePost} from '../../actions/posts';
import useStyles from './styles.js';
import { makeStyles } from '@material-ui/core/styles';
import {Routes, Route, useNavigate} from 'react-router-dom';
import PromotePost from './promotePost/PromotePost';
import MyPost from './MyPost';


const useStyless = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.primary,
    },
  }));



  const PersonalPost = ({ post, setCurrentId, user, setUser }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('name'));
  const [switchPage, setSwitchPage] = React.useState(false);
 

  const handleOnSubmit = (e) =>{
    e.preventDefault();

    console.log("post id");
    console.log(post._id, " post id");
    
  
  }


  const navigateToPromote = event => {
    setSwitchPage(true)
    // 👇️ navigate to /contacts
    
  };
  return (
<div>
    {switchPage
      ? (<>
      <PromotePost post={post} typeofpost={post.typeofpost}/>
     
      </>
      )
      : (

        <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <div className={classstyles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.wanttolive}</Typography>
            </div>
          <p>description: {post.description}</p>
        </div>
        <Button onClick={handleOnSubmit}>
          <DeleteIcon/>
      </Button>
        <div className={classes.actions}>
        <Button Button onClick={navigateToPromote}>Promote</Button>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>


      )
    }
    </div>
    
    
  );
}

export default PersonalPost;
