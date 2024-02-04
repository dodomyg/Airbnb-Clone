import React from 'react'
import { Box,Image} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Logo from '../Extra/Logo';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <Box display={'flex'}  width={'100%'} h={'100vh'}>
        <Box  bg={'aliceblue'} pt={6} top={'30px'} left={'0'} bottom={'0'}  flex={1} bgSize={'cover'} height="100%">
        <Logo/>
        <Box m={3}>
        <Tabs size='md' variant='enclosed'>
    <TabList>
    <Tab>Register</Tab>
    <Tab>Login</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Register/>
    </TabPanel>
    <TabPanel>
    <Login/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
        </Box>
        <Box display={['none','flex']}  flex="2.4"  height="100%">
        <Image src='https://source.unsplash.com/1600x900/?resort' objectFit={'cover'} width={'100%'}/>
        </Box>
    </Box>
  )
}

export default Auth