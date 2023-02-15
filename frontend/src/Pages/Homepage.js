import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
//import { useHistory } from "react-router";
import { Navigate, useNavigate } from 'react-router-dom';
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { Button } from "@material-ui/core";

function Homepage() {
  //const history = useHistory();
  
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    
    //if (user) navigate("Home/chats");
  }, [navigate]);
  const [show, setShow] = React.useState(false);

  const showHandeler =(e)=>{
    e.preventDefault();
    if (show == true){
      setShow(false);
    }
    if (show == false){
      setShow(true);
    }
    
  }

  return (

<>
    <Container style={{position: 'absolute',top: '10%',right: '30%'}} maxW="xl" centerContent>
      <Box
        d="flex"
        marginLeft='100%'
        justifyContent="center"
        p={3}
        bg="white"
        w="110%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Apartmate
        </Text>
      </Box>
      <Box bg="white"  w="110%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <div >
              <Signup />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </>
  
  );
}

export default Homepage;
