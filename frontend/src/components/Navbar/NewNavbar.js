// import React, { useState, useEffect } from 'react';

// import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

// import classes from '../layout/MainNavigation.module.css';

// import { Link, useHistory, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import decode from 'jwt-decode';


// import * as actionType from '../../constants/actionTypes';
// import useStyles from './styles';

// const NewNavbar = () => {
//   //const [user, setUser] = useState(JSON.parse(localStorage.getItem('name')));
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const history = useHistory();
//   const classess = useStyles();

//   const logout = () => {
//     dispatch({ type: actionType.LOGOUT });

//     history.push('/');

//     setUser(null);
//   };
  
// useEffect(() => {
//     const token = user?.token;

//     if (token) {
//       const decodedToken = decode(token);

//       if (decodedToken.exp * 1000 < new Date().getTime()) logout();
//     }

//     setUser(JSON.parse(localStorage.getItem('name')));
//   }, [location]);

//   return (
//     <header className={classes.header}>
//       <div className={classes.logo}>React Blog</div>
//       <nav>
//         <ul>
//           <li>
//           {user?.result ? (
//           <div className={classess.profile}>
//             <Avatar className={classess.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
//             <Typography className={classess.userName} variant="h6">{user?.result.name}</Typography>
//             <Button variant="contained" className={classess.logout} color="secondary" onClick={logout}>Logout</Button>
//           </div>
//         ) : (
//           <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
//         )}
//           </li>


//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default NewNavbar;