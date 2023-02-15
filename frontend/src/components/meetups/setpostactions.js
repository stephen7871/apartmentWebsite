export const setGoldPosts = (goldPosts) => {
    return {
      type: 'SET_GOLD_POSTS',
      goldPosts
    }
  };
  
  // Action to set the silver posts
  export const setPosts = (setPosts) => {
    return {
      type: 'SET_SILVER_POSTS',
      setPosts
    }
  };