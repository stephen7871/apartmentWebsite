import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';

//import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../actions/posts';

const Checkoutform = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({cardname: '', selectedFile: '', tags: '', description: ''});
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classstyle = useStyles();
  

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({cardname: '', selectedFile: '', tags: '', description: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      
      clear();
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='cardname'>Name on Card</label>
          <input type='text' required id='cardname' value={postData.cardname} onChange={(e) => setPostData({ ...postData, cardname: e.target.value })}/>
        </div>
        {/* <div>
          <label htmlFor='image'>Image</label>
          <div className={classstyle.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        </div> */}
        <div className={classes.control}>
          <label htmlFor='tags'>tags</label>
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea id='description' required rows='5' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default Checkoutform;
