import React, { useContext } from 'react'
import { Card,Text,Avatar } from '@chakra-ui/react'
import { IoMdArrowDropdown,IoIosOptions  } from "react-icons/io";
import { FaPlus, FaRegUser } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    
  } from '@chakra-ui/react'
import { IoSearch } from "react-icons/io5";
import { Divider,IconButton } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Box,Button } from '@chakra-ui/react'
import Logo from '../Extra/Logo'
import UserContext from '../Context/UserContext';
axios.defaults.withCredentials=true


const Navbar = () => {


const toast = useToast()

  const navigate=useNavigate()

const {user}=useContext(UserContext)

const handleLogOut=async()=>{
  if(!user){
    return;
  }
  try {
    await axios.post('http://localhost:5000/airbnb/users/logout',{withCredentials:true})
    
    toast({
      title: 'Logged out successfully.',
      description: "We've logged you out.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    navigate('/auth')
    window.location.reload()

  } catch (error) {
    console.log(error);
  }
}


  return (
    <>
    <Box py={4} display={'flex'} flexDirection={['column','row']} width={'100%'} alignItems={'center'} justifyContent={'space-around'}>
        <Logo/>
        <Card px={2.5} py={1.4} borderRadius={'50px'} display={'flex'} gap={'11px'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
            <Text cursor={'pointer'}>Any Where</Text>
            <Divider h={'30px'} orientation='vertical'/>
            <Text cursor={'pointer'}>Any Week</Text>
            <Divider h={'30px'} orientation='vertical'/>
            <Text cursor={'pointer'}>Add Guests</Text>
            <IconButton colorScheme='pink' isRound icon={<IoSearch/>}/>
        </Card>
        {user ?  <Menu>
  <MenuButton borderRadius={'50px'} px={4} py={6} as={Button} rightIcon={<IoMdArrowDropdown />}>
  <Avatar size='sm' name={user.username} />
  </MenuButton>
  <MenuList>
    <MenuItem onClick={()=>navigate('/profile')}>My Profile</MenuItem>
    <hr/>
    <MenuItem onClick={()=>navigate('/bookings')}>My Bookings</MenuItem>
    <hr/>
    <MenuItem gap={'7px'} onClick={()=>navigate('/new')}><FaPlus/> New Accomodation</MenuItem>
    <hr/>
    <MenuItem onClick={()=>navigate('/accomodation')}>My Accomodation</MenuItem>
    <hr/>
    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    
  </MenuList>
</Menu>: <Button onClick={()=>navigate('/auth')} borderRadius={'50px'} display={'flex'} alignItems={'center'} gap={'8px'}> 
            <IoIosOptions/>
             <FaRegUser/>
        </Button> }
        
    </Box>
    <Divider/>
    </>
  )
}

export default Navbar