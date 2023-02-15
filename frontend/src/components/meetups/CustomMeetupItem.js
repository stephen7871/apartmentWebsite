import React from 'react';
import CustomCard from '../ui/CustomCard';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';




  const CustomMeetupItem = ({ post, setCurrentId, user, setUser }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  // const user = JSON.parse(localStorage.getItem('name'));
  
  

  return (
    <li className={classes.item}>
      <CustomCard>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <div className={classstyles.details}>
          <Typography>max price:</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
          <Typography>min price:</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{post.min}</Typography>
          <Typography>want to live:</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{post.wanttolive}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.max}</Typography>
            </div>
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>

        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </CustomCard>
    </li>
  );
}

export default CustomMeetupItem;
