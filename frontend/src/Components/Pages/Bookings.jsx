import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import axios from "axios"
import {useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import { CiWallet } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoMoonOutline } from "react-icons/io5";
import { Box,Heading,Card,Stack,Button,Text,CardBody,CardFooter,Image,HStack } from '@chakra-ui/react'
axios.defaults.withCredentials=true

const Bookings = () => {
  const [booking,setBooking]=useState([])
  const {user}=useContext(UserContext)
const navigate=useNavigate()
  useEffect(()=>{
    const fetchBooking=async()=>{
      if(!user){
        return;
      }

      try {
        const resp = await axios.get(`http://localhost:5000/airbnb/booking/myBookings`,{bookedBy:user._id},{withCredentials:true})
        setBooking(resp.data)
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }

    }

    fetchBooking()

  },[setBooking,user])


  return (
    <Box gap={'40px'} width={'100%'} py={5} px={'140px'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Heading fontWeight={'500'}>My Bookings</Heading>
       {booking.length > 0 && booking.map((b)=>(
         <Card key={b._id} bg={'aliceblue'} minW={'50%'} my={3} borderRadius={'lg'}
         direction={{ base: 'column', sm: 'row' }}
         overflow='hidden'
         variant='outline'
       >
        <Image
           objectFit='cover'
          width={{md:'33%',sm:'80%'}}
           borderRadius={'lg'}
           src={`http://localhost:5000/uploads/${b.place.pics[0]}`}
           
         />
         <Stack>
           <CardBody>
             <Heading size='md'>{b.place.title}</Heading>
             <Text size='md'>{b.place.address}</Text>
              <hr/>
             
               <HStack my={2} alignItems={'center'} color={'grey'} gap={'20px'}>
                <Text gap={'10px'} as={'b'} display={'flex'} alignItems={'center'}  fontSize={'18px'}><IoMoonOutline size={'20px'}/>  : {differenceInCalendarDays(new Date(b.checkOut),new Date(b.checkIn))} nights</Text>
                <Text display={'flex'} gap={'10px'} alignItems={'center'} fontSize={'18px'}> <SlCalender/> {format(new Date(b.checkIn),'yyyy/MM/dd')} --{'>'}  <SlCalender/> {format(new Date(b.checkOut),'yyyy/MM/dd')}</Text>
               </HStack>
             <Text gap={'7px'} fontSize={'18px'} display={'flex'} alignItems={'center'} as={'b'}> <CiWallet size={'23px'} /> Total Price : ₹{b.price}</Text>
           </CardBody>
       
           <CardFooter>
             <Button onClick={()=>navigate(`/bookings/${b._id}`)} variant='solid' colorScheme='blue'>
               View
             </Button>
           </CardFooter>
         </Stack>
       </Card>
       ))}
    </Box>
  )
}

export default Bookings