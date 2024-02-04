// App.js
import React from 'react';
import Auth from './Components/Auth/Auth';
import Home from './Components/Pages/Home';
import Navbar from './Components/Pages/Navbar';
import { Routes, Route,useLocation } from 'react-router-dom';
import Profile from './Components/Pages/Profile';
import Bookings from './Components/Pages/Bookings';
import Accomodation from './Components/Pages/Accomodation';
import PlaceForm from './Components/Pages/PlaceForm';
import SinglePlace from './Components/Pages/SinglePlace';
import EditProfile from './Components/Pages/EditProfile';
import HotelDetails from './Components/Pages/HotelDetails';
import SingleBooking from './Components/Pages/SingleBooking';


const App = () => {
  const location=useLocation()
  const isNotAuthPage = !location.pathname.startsWith('/auth')

  return (
    <div>
      {isNotAuthPage && <Navbar />}
      <Routes>
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/bookings/:id' element={<SingleBooking />} />
        <Route path='/accomodation' element={<Accomodation />} />
        <Route path='/accomodation/:id' element={<SinglePlace />} />
        <Route path='/new' element={<PlaceForm />} />
        <Route path='/editProfile' element={<EditProfile />} />
        <Route path='/:id' element={<HotelDetails />} />

      </Routes>
    </div>
  );
};

export default App;
