import React, {useContext, useEffect, useState } from 'react';
import { Box, Heading, Text, HStack,useToast, Button,Image,Center ,Input,VStack,Divider} from '@chakra-ui/react';
import { useParams,useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { Grid, GridItem } from '@chakra-ui/react'
import {differenceInCalendarDays} from "date-fns"
import { CiHeart } from "react-icons/ci";
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { IoMdPhotos } from "react-icons/io";
import { RiMapPinFill } from "react-icons/ri";
import axios from 'axios';
import Loading from '../Extra/Loading';
import UserContext from '../Context/UserContext';
axios.defaults.withCredentials=true


const HotelDetails = () => {
  const navigate= useNavigate()
  const toast = useToast()
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [showPhoto,setShowPhoto]=useState(false)
  const [checkInDate,setCheckIn]=useState("")
  const [name,setName]=useState("")
  const [phone,setPhone]=useState(0)
  const [checkOutDate,setcheckOut]=useState("")
  const [guests,setGuests]=useState(0)
  const [fav, setFav] = useState(() => {
    try {
      
      const savedFav = localStorage.getItem('fav');
      return savedFav ? JSON.parse(savedFav) : false;
    } catch (error) {
      console.error('Error initializing fav from localStorage:', error);
      return false;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        const resp = await axios.get(`http://localhost:5000/airbnb/place/allPlaces/${id}`);
        console.log(resp.data);
        setHotel(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [id]);

  const handleFavToggle = () => {
    setFav(!fav);
    // console.log(fav);
  };

  
  const {user} =useContext(UserContext)
  

 



  useEffect(() => {
    try {
      localStorage.setItem('fav', JSON.stringify(fav));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [fav]);
  const bookPlace=async(e)=>{
    e.preventDefault()
    if(!checkInDate || !checkOutDate || !name || !phone || !guests ){
      toast({
        title: `Fill all credentials`,
        status: 'warning',
        isClosable: true,
      })
      return;
    }
    if(!user){
      toast({
        title: `Login First`,
        status: 'info',
        isClosable: true,
      })
      navigate('/auth')
      return;
    }
    try {
      const resp = await axios.post(`http://localhost:5000/airbnb/booking/book`,{
        checkIn:checkInDate,
        place:hotel._id,
        price:differenceInCalendarDays(new Date(checkOutDate),new Date(checkInDate)) * hotel.price,
        checkOut:checkOutDate,
        name:name,
        phone:phone,
        bookedBy:user._id,
        guest:guests
      },{withCredentials:true})
      // console.log(resp.data);
      const bookingId = resp.data._id
      // console.log(bookingId);
       toast({
        title: `Booking Confirmed`,
        status: 'success',
        isClosable: true,
      })
      navigate(`/bookings/${bookingId}`)

    } catch (error) {
      console.log(error);
    }
  }

  if(showPhoto){
    return <Box color={'white'} bg={'black'}  pt={5} px={'120px'} width={'100%'}display={'flex'} flexDir={'column'}>

        <HStack my={4} justifyContent={'space-between'}>
          <Text fontSize={'21px'}>{hotel.title}</Text>
          <Button onClick={()=>setShowPhoto(false)}>Back</Button>
         </HStack>

         <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          {hotel?.pics?.length > 0 &&  hotel.pics.map(p=>(
            <Image  borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${p}`} my={8} alt='' width={'68%'} height={'500px'} />
          ))}
         </Box>
      
    </Box>
  }
  return (
    <Box bgColor={'aliceblue'} py={4} px={'150px'} width={'100%'}>
      {hotel ? (
        <>
          <Heading fontSize={'34px'} fontWeight={'500'}>
            {hotel.title}
          </Heading>
          <HStack justifyContent={'space-between'} mt={1.5}>
            <a target='_blank' rel="noreferrer"  href={`https://maps.google.com/?q=${hotel.address}`}>
              <Text alignItems={'center'} display={'flex'} gap={'7px'} as={'b'} textDecoration={'underline'} cursor={'pointer'}>
               <RiMapPinFill/> {hotel.address}
              </Text>
            </a>
            <HStack>
              <Button onClick={handleFavToggle} gap={'3px'} variant={'ghost'} colorScheme='red'>
                {fav===true ? (
                  <>
                    <FaHeart /> Saved
                  </>
                ) : (
                  <>
                    <CiHeart /> Save
                  </>
                )}
              </Button>
            </HStack>
          </HStack>
          <Grid my={7} height='400px' templateRows='1fr' templateColumns='1.5fr 1fr' gap={3}>
  <GridItem colSpan={1}>
    <Image borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${hotel.pics[0]}`} width={'100%'} height={'408px'} alt=''  />
  </GridItem>
  <Grid gap={2}>
  <GridItem colSpan={1}>
  <Image  borderRadius={'lg'} objectFit={'cover'}  src={`http://localhost:5000/uploads/${hotel.pics[1]}`} height={'200px'} width={'100%'} alt=''  />

  </GridItem>
  <GridItem colSpan={1}>
  <Box position="relative">
            <Image  borderRadius={'lg'} objectFit={'cover'} src={`http://localhost:5000/uploads/${hotel.pics[2]}`} height={'200px'} width={'100%'} alt='' />
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
<Box>
  <hr style={{width:'60%',margin:"10px 0"}}/>
  <Box my={2} mx={3} display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
    <Box>
      <Text mt={1.5} mb={5}>
        <span style={{fontWeight:"500",fontSize:"24px"}}>Description</span> : {hotel.desc}
      </Text>
        <HStack alignItems={'center'}>
            <Text>Check In :</Text>
            <Text as={'b'}>{hotel.checkIn}</Text>
        </HStack>
        <HStack alignItems={'center'}>
            <Text>Check Out :</Text>
            <Text as={'b'}>{hotel.checkOut}</Text>
        </HStack>
        <HStack alignItems={'center'}>
            <Text>Max Guests :</Text>
            <Text as={'b'}>{hotel.maxGuests}</Text>
        </HStack>
        <HStack alignItems={'center'}>
            <Text>Important Notice : {hotel.extraInfo}</Text>
        </HStack>
    </Box>
    <Box boxShadow='xl' p={8} rounded='md' bg='white'>
      <Center as='b'>Price : ₹{hotel.price}/night</Center>
        <form onSubmit={bookPlace} style={{display:"flex",alignItems:'center', justifyContent:"center",flexDirection:"column",margin:"10px 0"}}>
          
        <Box p={2.5} borderRadius={'lg'} border={'1px solid grey'}>
          <VStack>
          <HStack>
          <FormControl>
            <VStack align={'center'} gap={'10px'}>
            <Text>Check In Date:</Text>
            <Input value={checkInDate} onChange={(e)=>setCheckIn(e.target.value)} type='date'/>
            </VStack>
            
          </FormControl>
            <Center height='70px'>
            <Divider orientation='vertical' />
            </Center> 
            <FormControl>
            <VStack align={'center'} gap={'10px'}>
            <Text>Check Out Date:</Text>
            <Input value={checkOutDate} onChange={(e)=>setcheckOut(e.target.value)} type='date'/>
            </VStack>
          </FormControl>
          </HStack>
          <hr/> 
          <Box width={'100%'}>
            <FormLabel>Number of Guests</FormLabel>
            <Input value={guests} onChange={(e)=>setGuests(e.target.value)} type='number'/>
          </Box>
          {checkInDate && checkOutDate && (
            <Box width={'100%'}>
            <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Full Name'/>
            </FormControl>
            <FormControl>
            <FormLabel>Phone number</FormLabel>
            <Input value={phone} onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='Phone number'/>
            </FormControl>
          </Box>
          )}
          </VStack>
          <Button gap={'8px'} type='submit' my={2} width={'100%'} colorScheme='red'>
            Book 
            {checkInDate && checkOutDate && (<>
            <span> : ₹{differenceInCalendarDays(new Date(checkOutDate),new Date(checkInDate)) * hotel.price}</span>
            </>)}
            </Button>
        </Box>
         
        </form>
  </Box>
  </Box>
</Box>
 </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default HotelDetails;
