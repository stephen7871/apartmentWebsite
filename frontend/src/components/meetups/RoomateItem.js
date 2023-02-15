import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';




  const RoomateItem = ({ post, setCurrentId, user, setUser,proplist }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  

      return(
       
      <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <div className={classstyles.details}>
          <div className={classes.center}>
        <img  src={post.photos[0]}  height={'200px'} width={'300px'} alt="BigCo Inc. logo"/>
        </div>
        <Typography variant="body2" color="textSecondary" component="h2">min: {post.min}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">max: {post.max}</Typography>
        {/* <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography> */}
        <Typography variant="body2" color="textSecondary" component="h2">want to live:{post.wanttolive}</Typography>
            </div>
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>
        <Button>Chat</Button>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>
 
      );
      }

export default RoomateItem;