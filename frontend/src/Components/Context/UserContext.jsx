import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();
export default UserContext

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/airbnb/users/jwt', {
          withCredentials: true, // Include credentials (cookies) in the request
        });
        setUser(response.data.getUser);
        // console.log(response.data.getUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user,setUser}}>
      {children}
    </UserContext.Provider>
  );
};
