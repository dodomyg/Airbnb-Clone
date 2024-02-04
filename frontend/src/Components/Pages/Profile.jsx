import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, Button, Heading, Avatar, Text, VStack, HStack, CardBody, CardFooter } from '@chakra-ui/react';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import Loading from '../Extra/Loading';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/airbnb/users/jwt', {
          withCredentials: true,
        });
        setUser(response.data.getUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser]);

  if (loading) {
    return <Loading/>;
  }

  if (!user) {
    return <div>Error loading user data</div>;
  }

  return (
    <Card px={3} py={3} m={6} align='center'>
      <CardHeader>
        <Heading size='md'>User Profile</Heading>
      </CardHeader>
      <CardBody>
        <VStack alignItems={'center'}>
          <Avatar size='xl' name={user.username} />
        </VStack>
        <HStack my={2} align={'center'} justifyContent={'space-between'}>
          <Text>Username</Text>
          <Text>{user.username}</Text>
        </HStack>
        <HStack my={2} align={'center'} justifyContent={'space-between'}>
          <Text>Email</Text>
          <Text>{user.email}</Text>
        </HStack>
        <HStack my={2} align={'center'} justifyContent={'space-between'}>
          <Text>User Id</Text>
          <Text>{user._id}</Text>
        </HStack>
      </CardBody>
      <CardFooter>
      <Link to='/editProfile'><Button colorScheme='blue'>Edit Profile</Button></Link>
      </CardFooter>
    </Card>
  );
};

export default Profile;
