import React,{useState,useEffect} from "react";
import classes from './App.module.css'
// import "./App.css
import Homepage from "./Pages/Homepage";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Home from "./components/Home/Home";
import FirstPage from "./components/meetups/firstpage/FirstPage";


function App() {


  const [currentId, setCurrentId] = useState(0);

  

  return (
    <div className={classes.App}>
      <Routes>
        {/* <Route path="/" element={<Homepage />}/> */}
        <Route path="/" element={<FirstPage />}/>
      {/* <Route path="/" component={Homepage} exact /> */}
      {/* <Route path="/chats" element={<Chatpage />} /> */}
      <Route path="/Home/*" element={<Home currentId={currentId} setCurrentId={setCurrentId} />}/>   
      </Routes>
    </div>
  );
}

export default App;
