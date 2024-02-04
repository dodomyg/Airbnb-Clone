import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {
    FormControl,
    FormLabel,
    Heading,
    useToast,
    Center,
    Input,Button
  } from '@chakra-ui/react'

axios.defaults.withCredentials=true


const EditProfile = () => {
    const toast = useToast()
    const navigate=useNavigate()

    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [cpw,setCpw]=useState("")
    const [id,setId]=useState("")
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            
          try {
            const response = await axios.get('http://localhost:5000/airbnb/users/jwt', {
              withCredentials: true,
            });
            setUsername(response.data.getUser.username)
            setEmail(response.data.getUser.email)
            setId(response.data.getUser._id)
            // console.log(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);


      const handleUpdate=async(e)=>{

        e.preventDefault()

        if((!password==="" && !cpw==="" ) || password!==cpw){
            toast({
                title: "Incorrect Password pls check",
                status: 'warning',
                duration:'4000',
                isClosable: true,
              })
              return;
        }
        try {
            const resp = await axios.put(`http://localhost:5000/airbnb/users/editProfile/${id}`,{username,password,email},{withCredentials:true})
            toast({
                title: "User Credentials Updated Successfully",
                status: 'success',
                duration:'4000',
                isClosable: true,
              })
              navigate('/profile')
        } catch (error) {
            console.log(error);
        }
      }



  return (
    
    <>
    <Heading textAlign={'center'} my={3} style={{ fontWeight: '600' }}>Edit profile</Heading>
    <Center>
      <form onSubmit={handleUpdate} style={{ width: '50%'}}>
        <FormControl my={1}>
          <FormLabel>Username</FormLabel>
          <Input autoComplete='off' value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' />
        </FormControl>
        <FormControl my={1}>
          <FormLabel>Email</FormLabel>
          <Input autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
        </FormControl>
        <FormControl my={1}>
          <FormLabel>Password</FormLabel>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
        </FormControl>
        <FormControl my={1}>
          <FormLabel>Confirm Password</FormLabel>
          <Input value={cpw} onChange={(e) => setCpw(e.target.value)} type='password' placeholder='Confirm Password' />
        </FormControl>
        
        <Button my={3} width={'100%'} colorScheme='pink' type='submit'>
          Update
        </Button>
      </form>
    </Center>
  </>
  )
}

export default EditProfile