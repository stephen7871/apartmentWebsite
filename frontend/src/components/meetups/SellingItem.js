import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';




const SellingItem = ({ post, setCurrentId, user, setUser,proplist }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  

//   address: String,
//     nbedrooms: String,
//     typeofplace: String,
//     pricepermonth: String,
//     nroomates: String,
//     collegename: String,
//     photos: String,
//     description: String,
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     },
//     id: String,
//     typeofpost: String,
//     username: String,
//     max: String,
//     min: String,
//     wanttolive: String,

  



    return(
      
      <li className={classes.item}>
      <Card>

        <div className={classes.content}>
          <h3>{post.address}</h3>
          <div className={classstyles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">bedrooms: {post.nbedrooms}</Typography>
        <div className={classes.center}>
        <img  src={post.photos[0]}  height={'200px'} width={'300px'} alt="BigCo Inc. logo"/>
        </div>
        <Typography variant="body2" color="textSecondary" component="h2">type of place:{post.typeofplace}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">price per month:{post.pricepermonth}</Typography>
       
        <Typography variant="body2" color="textSecondary" component="h2">college name:{post.collegename}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">username:{post.username}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">type of post:{post.typeofpost}</Typography>
           
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>
        <Button>Chat</Button>
        </div>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>
   

    );
    }
    

export default SellingItem;