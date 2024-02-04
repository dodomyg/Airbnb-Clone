import React, {useContext, useEffect, useState } from 'react';
import { Box, Heading, Text, HStack, Button,Image ,VStack} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Grid, GridItem } from '@chakra-ui/react'
import {differenceInCalendarDays, format} from "date-fns"
import { CiWallet } from "react-icons/ci";

import { IoMdPhotos } from "react-icons/io";
import { RiMapPinFill } from "react-icons/ri";
import axios from 'axios';
import Loading from '../Extra/Loading';
import UserContext from '../Context/UserContext';
import { IoMoonOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
axios.defaults.withCredentials=true

const SingleBooking = () => {
  const {id}=useParams()
  const [showPhoto,setShowPhoto]=useState(false)
  const [place,setPlace]=useState(null)
  const {user} =useContext(UserContext)
  useEffect(()=>{
    const getSingleBooking=async()=>{
      if(!user || !id){
      return <Loading/>
      
      }
      try {
        const resp = await axios.get(`http://localhost:5000/airbnb/booking/myBookings`,{bookedBy:user._id},{withCredentials:true})
        const foundBooking = resp.data.find(({_id})=>_id===id)
        if(!foundBooking){
          return <Loading/>
        }
        setPlace(foundBooking)
        console.log(foundBooking);
      } catch (error) {
        console.log(error);
      }
    }
    getSingleBooking()
  },[])
  if(!place){
    return <Loading/>
  }
  if(showPhoto){
    return <Box color={'white'} bg={'black'}  pt={5} px={'120px'} width={'100%'}display={'flex'} flexDir={'column'}>

        <HStack my={4} justifyContent={'space-between'}>
          <Text fontSize={'21px'}>{place.place.title}</Text>
          <Button onClick={()=>setShowPhoto(false)}>Back</Button>
         </HStack>

         <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          {place.place?.pics?.length > 0 &&  place.place.pics.map(p=>(
            <Image  borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${p}`} my={8} alt='' width={'68%'} height={'500px'} />
          ))}
         </Box>
      
    </Box>
  }
  return (
    <Box bgColor={'aliceblue'} py={2} px={'150px'} width={'100%'}>
      {place && (
        <>
          <Heading fontSize={'34px'} fontWeight={'500'}>
            {place.place.title}
          </Heading>
          <HStack justifyContent={'space-between'} mt={1.5}>
            <a target='_blank' rel="noreferrer"  href={`https://maps.google.com/?q=${place.place.address}`}>
              <Text alignItems={'center'} display={'flex'} gap={'7px'} as={'b'} textDecoration={'underline'} cursor={'pointer'}>
               <RiMapPinFill/> {place.place.address}
              </Text>
            </a>
          </HStack>
          <Box my={4} borderRadius={'lg'} bgColor={'lightgray'} p={'30px'}> 
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <VStack alignItems={'flex-start'}>
                <Text as={'b'}>Your Booking Information</Text>
                <HStack my={1} alignItems={'center'} gap={'20px'}>
                <Text gap={'5px'} as={'b'} display={'flex'} alignItems={'center'}  fontSize={'15px'}><IoMoonOutline size={'17px'}/> : {differenceInCalendarDays(new Date(place.checkOut),new Date(place.checkIn))} nights</Text>
                <Text as={'b'} display={'flex'} gap={'10px'} alignItems={'center'} fontSize={'17px'}> <SlCalender/> {format(new Date(place.checkIn),'yyyy/MM/dd')} --{'>'}  <SlCalender/> {format(new Date(place.checkOut),'yyyy/MM/dd')}</Text>
               </HStack>
              </VStack>
              <Box borderRadius={'lg'} p={3} bgColor={'#E91E63'} color={'white'} >
              <Text gap={'7px'}  fontSize={'15px'} display={'flex'} alignItems={'center'} as={'b'}> <CiWallet size={'19px'} /> Total Price : ₹{place.place.price}</Text>
              </Box>
            </HStack>
          </Box>
          <Grid my={4} height='400px' templateRows='1fr' templateColumns='1.5fr 1fr' gap={3}>
  <GridItem colSpan={1}>
    <Image borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${place.place.pics[0]}`} width={'100%'} height={'408px'} alt=''  />
  </GridItem>
  <Grid gap={2}>
  <GridItem colSpan={1}>
  <Image  borderRadius={'lg'} objectFit={'cover'}  src={`http://localhost:5000/uploads/${place.place.pics[1]}`} height={'200px'} width={'100%'} alt=''  />

  </GridItem>
  <GridItem colSpan={1}>
  <Box position="relative">
            <Image  borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${place.place.pics[2]}`} height={'200px'} width={'100%'} alt='' />
            <Box position="absolute" bottom={2} right={2}>
              <Button color={'black'} opacity={0.8}   display={'flex'} alignItems={'center'} gap={'4px'}  onClick={()=>setShowPhoto(true)} bg={'white'} size="sm">
                <IoMdPhotos/>
                See All Photos
              </Button>
            </Box>
          </Box>
  
  </GridItem>
  </Grid>
 
</Grid>
        </>)}
      </Box>    

  )
}

export default SingleBooking