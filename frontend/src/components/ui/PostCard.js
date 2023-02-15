import React from 'react';
import classes from './Card.module.css';

function PostCard(props) {
  return <div className={classes.postCard}>{props.children}</div>;
}

export default PostCard;
