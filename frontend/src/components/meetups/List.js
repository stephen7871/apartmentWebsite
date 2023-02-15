import React,{useEffect, useState} from 'react';
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { Paper,Typography,TextField } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';


function List(props) {
    const posts = useSelector((state) => state.posts);
    const [counter, setCounter]= useState(true);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
      // storing input name
      console.log(JSON.stringify(posts) + "List");
      
    }, []);
    
    // useEffect(() => {
    //     console.log(props.input + " props.inputTextt")
    //     {posts.map((post) => {
    //         console.log(props.input + " props.inputText")
    //         if(post.title === props.input){
    //             setPostList(current => [...current, post]);
    //             setCounter(true);
    //         }
    //         if(props.input === ""){

    //         }
    //     else{
    //         return <div></div>;
    //     }
    // })}
    //   }, []);


    const filteredData = posts.filter((post) =>{
        if (props.input === '') {
            return post;
        }
        //return the item which contains the user input
        else {
            return post.title.toLowerCase().includes(props.input)
        }
    })
        //if no input the return the original
        

    return (
      <>
      { filteredData ? (
          <ul className={classes.list}>
          {filteredData.map((post) => (
            <MeetupItem
              post={post} 
              setCurrentId={props.setCurrentId}
            />
          ))}
        </ul>
          )
      :
      (
          <Alert severity="info">You have no post yet.  Add your own posts by going to the "Add Post" page</Alert>
      )}
      
  </>
  
    );
  }
    

export default List