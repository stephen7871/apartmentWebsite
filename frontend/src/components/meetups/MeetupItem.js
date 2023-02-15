import React,{useEffect, useState} from 'react';
import Card from '../ui/Card';
import { CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classes from './MeetupItem.module.css';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import useStyles from './styles.js';
import ApartmentItem from './ApartmentItem';



  const MeetupItem = ({ post, setCurrentId, user, setUser }) => {
  const dispatch = useDispatch();
  const classstyles = useStyles();
  const [apartmentSwitch, setApartmentSwitch] = useState(false);
  const [roomateSwitch,setRoomateSwitch ] = useState(true);
  useEffect(() => {
    
    console.log(JSON.stringify(post) +"post data");
    console.log(JSON.stringify(post.typeofpost) +"post.typeofpost ");
    // eslint-disable-next-line
  }, []);


  if (post.typeofpost == "Aparment"){
    return(
      <ApartmentItem post={post} setCurrentId={setCurrentId} user={user} setUser={setUser}/>

    );
    }
    if(post.typeofpost == "Roomate"){
      return(
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

  
  // const user = JSON.parse(localStorage.getItem('name'));
  


  return (
    <div></div>
  );
}

export default MeetupItem;
{/* <>
    {apartmentSwitch && (


      <li className={classes.item}>
      <Card>
      <CardMedia className={classes.media} image={post.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.photo} />
        <div className={classes.content}>
          <h3>{post.address}</h3>
          <div className={classstyles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.nbedrooms}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.typeofplace}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.pricepermonth}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.nroomates}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.collegename}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.username}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{post.typeofpost}</Typography>
            </div>
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>
        <Button>Chat</Button>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>
    )}

    {roomateSwitch && (
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
          <p>{post.description}</p>
        </div>
        <div className={classes.actions}>
        <Button>Chat</Button>
        <p variant="body2">{moment(post.createdAt).fromNow()}</p>
       
        </div>
      </Card>
    </li>
    )}
    </> */}
    
  


