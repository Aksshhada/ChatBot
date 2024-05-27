import React from 'react';
import { ChakraProvider, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {
  return (
    <ChakraProvider>
      <Box 
        width="400px" 
        mx="auto" 
        mt="100px" 
        p="4" 
        borderWidth="1px" 
        borderRadius="lg" 
        boxShadow="lg"
        justifyContent="center"
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default HomePage;
