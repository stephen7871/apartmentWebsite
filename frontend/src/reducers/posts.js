import { FETCH_ALL, CREATE, DELETE} from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    //case LIKE:
    //  return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...posts, action.payload];
    //case UPDATE:
    //  return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

// const initialState = {
//   goldPosts: [],
//   silverPosts: [] 
// };

// export default (posts = initialState, action) => {
//   switch (action.type) {
//     case 'SET_GOLD_POSTS':
//       console.log("here");
//       return {
//         ...posts,
//         goldPosts: action.goldPosts
//       };
//     case 'SET_SILVER_POSTS':
//       return {
//         ...posts, silverPosts: action.silverPosts
//       };

//       case FETCH_ALL:
//       return action.payload;
//     //case LIKE:
//     //  return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//     case CREATE:
//       return [...posts, action.payload];
//     //case UPDATE:
//     //  return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//     case DELETE:
//       return posts.filter((post) => post._id !== action.payload);

//     default:
//       return posts;
  
//   }
// }

// const initialState = {
//   goldPosts: [],
//   silverPosts: [] 
// };


// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_GOLD_POSTS':
//       return {
//         ...state,
//         goldPosts: action.goldPosts
//       };
//     case 'SET_SILVER_POSTS':
//       return {
//         ...state, 
//         silverPosts: action.silverPosts
//       };
//     case 'FETCH_ALL':
//       return {
//         ...state,
//         goldPosts: action.payload.goldPosts,
//         silverPosts: action.payload.silverPosts
//       };
//     case 'CREATE':
//       return {
//         ...state,
//         goldPosts: [...state.goldPosts, action.payload],
//         silverPosts: [...state.silverPosts, action.payload]
//       };
//     case 'DELETE':
//       return {
//         ...state,
//         goldPosts: state.goldPosts.filter((post) => post._id !== action.payload),
//         silverPosts: state.silverPosts.filter((post) => post._id !== action.payload)
//       };
//     default:
//       return state;
//   }
// };