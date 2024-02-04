import React, { useState } from 'react'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import { Box,Button,Input } from '@chakra-ui/react'

import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
  axios.defaults.withCredentials=true

const Login = () => {
  const navigate =useNavigate()
  const examplePromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(200), 3000)
  })
  const toast = useToast()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleLogin=async(e)=>{
      e.preventDefault()
      if (!email || !password) {
        toast({
            title: 'Fill All the fields',
            status: 'warning',
            duration: 3000,
            isClosable: true,
        });
        return;
    }
      try {
       const resp =  await axios.post('http://localhost:5000/airbnb/users/login',{email,password},{withCredentials:true})
        setEmail("")
        setPassword("")
        toast.promise(examplePromise, {
          success: { title: 'Logged In', description: 'Looks great' },
          error: { title: 'Error while Login In', description: 'Something wrong' },
          loading: { title: 'Logging In...', description: 'Please wait' },
        })
        
        navigate('/')
        window.location.reload()
        
      } catch (error) {
        toast({
          title: `${error}`,
          status: 'error',
          isClosable: true,
        })
        console.log(error);
      }
    }

  return (
    <Box m={2} display={'flex'} flexDirection={'column'} h={'50vh'}  alignItems={'center'} justifyContent={'center'}>
        <form onSubmit={handleLogin} style={{width:"100%"}}>
        <FormControl my={1}>
            <FormLabel>Email</FormLabel>
        <Input autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' />
        </FormControl>
        
        <FormControl my={1}>
            <FormLabel>Password</FormLabel>
        <Input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' />
        </FormControl>
        <Button my={3} width={'100%'} colorScheme='pink' type='submit'>Login</Button>
        </form>

    </Box>
  )
}

export default Login