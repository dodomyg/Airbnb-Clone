import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext'
import { Box,Image,Grid,Text,HStack,Tag } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"






const Home = () => {
const navigate = useNavigate()
  const {user}=useContext(UserContext)

  const [places,setPlaces]=useState([])

  useEffect(()=>{
    const fetchPlaces=async()=>{
        try {
          const resp = await axios.get(`http://localhost:5000/airbnb/place/allPlaces`)
        setPlaces(resp.data)
        console.log(resp.data);
        } catch (error) {
          console.log(error);
        }
    }
    fetchPlaces()
  },[])
  

  return (
    <div>
      
      <Box py={8} pl={12} >
      <Grid placeItems={'center'} justifyContent={'space-between'}  templateColumns="repeat(3, 1fr)" gap={2}>
        {places.map((p)=>(
          <Box onClick={()=>navigate(`/${p._id}`)} borderRadius={'lg'} width={'100%'} my={5}>
              <Box cursor={'pointer'} bg={'grey'} width={'75%'}>
                {p.pics?.[0] &&  <Image borderRadius={'lg'}  width={'100%'} h={'260px'} src={`http://localhost:5000/uploads/${p.pics[0]}`}
          alt={p.title} /> }
              </Box>
              <Box cursor={'pointer'} width={"73%"}>
              <Text as={'b'} fontSize={'17px'} mt={'1'}>{p.title}</Text>
              <Text color={'grey'} isTruncated fontSize={'16px'} mt={'0.3'}>{p.address}</Text>
              <HStack mt={1} justifyContent={'space-between'}>
              <Text><Text as={'b'}>₹ {p.price}</Text> /night</Text>
              <Tag colorScheme='green'>Max Guests : {p.maxGuests}</Tag>
              </HStack>
              </Box>
          </Box>
        ))}
      </Grid>
          
      </Box>
      
    
    </div>
  )
}

export default Home