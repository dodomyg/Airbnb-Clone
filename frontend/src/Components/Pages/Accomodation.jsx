import React, { useEffect, useState } from 'react'
import { Card,Image,Stack,Heading,Text,Button, CardBody, CardFooter } from '@chakra-ui/react'
import axios from "axios"
import Loading from '../Extra/Loading'
import {useNavigate} from "react-router-dom"

const Accomodation = () => {

    const [Places, setPlaces] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    

    useEffect(()=>{
        const fetchAllPlaces=async()=>{
            try {
                setLoading(true)
                const resp = await axios.get(`http://localhost:5000/airbnb/place/getMyPlace`,{withCredentials:true})
                setPlaces(resp.data)
                // console.log(resp.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPlaces()
    },[])

    

    if(loading){
        return <Loading/>
    }

  return (
    <>
   <Heading my={3} fontWeight={'600'} textAlign={'center'}>My Accomodations</Heading>
    {Places.length > 0 && Places.map((p)=>(
        <Card m={6}
        borderRadius='lg'
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '350px' }}
        src={`http://localhost:5000/uploads/${p.pics[0]}`}
          alt={p.title}
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{p.title}</Heading>
      
            <Text py='2'>
              {p.desc}
            </Text>
            <Text as={'b'}>
                Perks : {p.features.join(", ")}
            </Text>    
          </CardBody>
          
        
          <CardFooter>
            <Button onClick={()=>navigate(`/accomodation/${p._id}`)} variant='solid' colorScheme='blue'>
              Edit Profile
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    ))}
  </>
  )
}

export default Accomodation