import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './Components/Context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  <BrowserRouter>
  <ChakraProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
  </BrowserRouter>
  </UserProvider>
);


