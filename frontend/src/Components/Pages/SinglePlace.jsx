import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Grid, GridItem } from '@chakra-ui/react';

import { useToast} from '@chakra-ui/react'
import {
  FaWifi,
  FaPaw,
  FaSnowflake,
  FaParking,
  FaSwimmingPool,
  FaTree
} from 'react-icons/fa';
import { Card, CardBody, Tooltip, Checkbox } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react';
import {useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import Loading from '../Extra/Loading';

axios.defaults.withCredentials = true;

axios.defaults.withCredentials=true


const SinglePlace = () => {
    const [loading, setLoading] = useState(true);
    // const [place, setPlace] = useState(null);
    // const [press,setPressed]=useState(false)
    const {id} = useParams()
    const perksData = [
        { icon: <FaWifi />, name: 'WiFi' },
        { icon: <FaPaw />, name: 'Pets' },
        { icon: <FaSnowflake />, name: 'AC' },
        { icon: <FaParking />, name: 'Parking' },
        { icon: <FaSwimmingPool />, name: 'Swimming Pool' },
        { icon: <FaTree />, name: 'Garden' },
      ];
      const {user} = useContext(UserContext)

      const [title, settitle] = useState('');
      const [address, setAddress] = useState('');
      const [pics, setPics] = useState('');
      const [price,setPrice]=useState(0)
      const [desc, setDesc] = useState('');
      const [perks, setPerks] = useState([]);
      const [addedPics, setAddedPics] = useState([]);
      
      const [extraInfo, setExtraInfo] = useState('');
      const [checkInDate, setCheckIn] = useState(0);
      const [checkOutDate, setcheckOut] = useState(0);
      const [guests, setGuests] = useState(0);
      const toast = useToast()
      const navigate = useNavigate()
    
      const handlePerkChange = (perkName) => {
        setPerks((prevPerks) => {
          if (prevPerks.includes(perkName)) {
            return prevPerks.filter((perk) => perk !== perkName);
          } else {
            return [...prevPerks, perkName];
          }
        });
      };
    
      const addPhotoByLink = async (e) => {
        e.preventDefault();
        if(!pics){
            return;
        }
        try {
          const { data: filename } = await axios.post(
            'http://localhost:5000/upload-by-link',
            { link: pics },
            { withCredentials: true }
          );
    
          setAddedPics((prev) => [...prev, filename]);
          setPics('');
        } catch (error) {
          console.log(error);
        }
      };
    // console.log(id);
    useEffect(()=>{
        if(!id){
            return;
        }
        const getSinglePlace=async()=>{
            try {
                setLoading(true)
                const resp = await axios.get(`http://localhost:5000/airbnb/place/getMyPlace/${id}`)
                console.log(resp.data);
                settitle(resp.data.title)
                setAddress(resp.data.address)
                setDesc(resp.data.desc)
                setPerks(resp.data.features)
                setAddedPics(resp.data.pics)
                setExtraInfo(resp.data.extraInfo)
                setCheckIn(resp.data.checkIn)
                setcheckOut(resp.data.checkOut)
                setGuests(resp.data.maxGuests)
                setPrice(resp.data.price)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        getSinglePlace()
    },[id])


    const upDatePlace = async (e) => {
      e.preventDefault();
  
      try {
        const resp = await axios.put(
          `http://localhost:5000/airbnb/place/updatePlace/${id}`,
          {
            title,
            address,
            pics: addedPics, // Sending the array of added pics to the server
            desc,
            features: perks, // Sending the array of selected perks to the server
            extraInfo,
            checkIn:checkInDate,
            checkOut:checkOutDate,
            maxGuests: guests,
            owner:user._id,
          },
          { withCredentials: true }
        );
        // console.log(resp.data);
        toast({
          title: "Updated Successfully",
          status: 'success',
          duration:'4000',
          isClosable: true,
        })
        navigate('/accomodation')
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  





    if(loading){
        return <Loading/>
    }
  return (
    <form onSubmit={upDatePlace}
            style={{
                marginTop:"20px",
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <FormHelperText>Title should be small and catchy</FormHelperText>
                  <Input
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                  />
                </FormControl>
              </GridItem>
    
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <FormHelperText>Address to this place</FormHelperText>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Address"
                  />
                </FormControl>
              </GridItem>
    
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Pics</FormLabel>
                  <FormHelperText>More Pics = better</FormHelperText>
                  <Input
                    value={pics}
                    onChange={(e) => setPics(e.target.value)}
                    type="text"
                    placeholder="Upload via link ... jpg"
                  />
                  <Button
                    onClick={addPhotoByLink}
                    my={2}
                    colorScheme="gray"
                    mt={3}
                    mb={3}
                  >
                    Add Pics
                  </Button>
                </FormControl>
              </GridItem>
              {addedPics.length > 0 && (
                <GridItem colSpan={1}>
                  <Flex wrap="wrap" justifyContent="center" alignItems="center">
                    {addedPics.map((i) => (
                      <Box key={i} m={2}>
                        <Image
                          height="100px"
                          width="250px"
                          borderRadius="lg"
                          objectFit="cover"
                          src={`http://localhost:5000/uploads/${i}`}
                          alt=""
                        />
                      </Box>
                    ))}
                  </Flex>
                </GridItem>
              )}
    
              
              {/* <Box justifyContent={'center'} cursor={'pointer'} display={'flex'} alignItems={'center'} gap={'10px'}>  */}
                {/* <Input onChange={upLoadPic} type='file'/> */}
                {/* <FaCloudUploadAlt/>
                <Text>Upload from device</Text>
              </Box> */}
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <FormHelperText>Give a description</FormHelperText>
                  <Input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    type="text"
                    placeholder="Description"
                  />
                </FormControl>
              </GridItem>
    
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Perks</FormLabel>
                  <FormHelperText>Select all perks of your place</FormHelperText>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                    flexWrap={'wrap'}
                  >
                    {perksData.map((m) => (
                      <Card key={m.name} m={2} p={2}>
                        <Tooltip label={m.name}>
                          <CardBody>
                            <Checkbox
                              colorScheme="pink"
                              isChecked={perks.includes(m.name)}
                              onChange={() => handlePerkChange(m.name)}
                            ></Checkbox>
                            {m.icon}
                          </CardBody>
                        </Tooltip>
                      </Card>
                    ))}
                  </Box>
                </FormControl>
              </GridItem>
    
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Extra Info</FormLabel>
                  <FormHelperText>House Rules, etc</FormHelperText>
                  <Input
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    type="text"
                    placeholder="Extra Info"
                  />
                </FormControl>
              </GridItem>
    
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Check In and Out Dates</FormLabel>
                  <FormHelperText>
                    Add check in check out dates, please make some time for cleaning
                    and maintaining the house
                  </FormHelperText>
                  <Flex align="center" justifyContent={'space-between'}>
                    <Input
                      type="number"
                      placeholder="Check-in"
                      m={2}
                      value={checkInDate}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Check-out"
                      m={2}
                      value={checkOutDate}
                      onChange={(e) => setcheckOut(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Guests"
                      m={2}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Price Per Night"
                      m={2}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Flex>
                </FormControl>
              </GridItem>
            </Grid>
            <Button mt={5} type="submit" w={'45%'} colorScheme="pink">
              Update
            </Button>
          </form>
  )
}

export default SinglePlace