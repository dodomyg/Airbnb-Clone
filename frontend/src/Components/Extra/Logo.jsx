import React from 'react'
import { SiAirbnb } from "react-icons/si";
import { Box,Text } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"


const Logo = () => {
  const navigate =useNavigate()
  return (
    <Box cursor={'pointer'} onClick={()=>navigate('/')} color={'#E91E63'} display={'flex'}  alignItems={'center'} justifyContent={'center'} p={3} gap={'6px'} borderRadius={'lg'}>
            <SiAirbnb size={'34px'}/>
            <Text fontWeight={'500'} fontSize={'3xl'}>airbnb</Text>
    </Box>
  )
}

export default Logo