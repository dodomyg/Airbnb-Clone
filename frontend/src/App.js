// App.js
import React, { useContext } from 'react';
import Auth from './Components/Auth/Auth';
import Home from './Components/Pages/Home';
import Navbar from './Components/Pages/Navbar';
import { Routes, Route,useLocation,Navigate } from 'react-router-dom';
import Profile from './Components/Pages/Profile';
import Bookings from './Components/Pages/Bookings';
import Accomodation from './Components/Pages/Accomodation';
import PlaceForm from './Components/Pages/PlaceForm';
import SinglePlace from './Components/Pages/SinglePlace';
import EditProfile from './Components/Pages/EditProfile';
import HotelDetails from './Components/Pages/HotelDetails';
import SingleBooking from './Components/Pages/SingleBooking';
import UserContext from './Components/Context/UserContext';


const App = () => {
  const location=useLocation()
  const isNotAuthPage = !location.pathname.startsWith('/auth')
  const {user}=useContext(UserContext)
  return (
    <div>
      {isNotAuthPage && <Navbar />}
      <Routes>
        <Route path='/auth/*' element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path='/' element={<Home />} />
        
        <Route path='/profile' element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path='/bookings' element={user ? <Bookings /> : <Navigate to="/auth" />} />
        <Route path='/bookings/:id' element={user ? <SingleBooking /> : <Navigate to="/auth" /> } />
        <Route path='/accomodation' element={ user ? <Accomodation /> : <Navigate to="/auth" />}  />
        <Route path='/accomodation/:id' element={user ? <SinglePlace /> : <Navigate to="/auth" />} />
        <Route path='/new' element={user ? <PlaceForm /> : <Navigate to="/auth" />} />
        <Route path='/editProfile' element={user ? <EditProfile /> : <Navigate to="/auth"/> } />
        <Route path='/:id' element={user ? <HotelDetails /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  );
};

export default App;
