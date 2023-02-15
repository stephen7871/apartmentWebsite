import { FETCH_ALL, CREATE, DELETE} from '../constants/actionTypes';

import * as api from '../api/apartmentIndex.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    
    const { data } = await api.createPost(post);
    //console.log(JSON.stringify(data)+ "createPost JSON.stringify(data)");
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
     console.log(error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    
    const { data } = await api.fetchUsers();
    

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
/*
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
*/

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     //console.log("deleting post with id " + id.id);
//     await api.deletePost(id.id);
//     // console.log("deleting post with id " + id.id);
//     dispatch({ type: DELETE, payload: id.id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };


