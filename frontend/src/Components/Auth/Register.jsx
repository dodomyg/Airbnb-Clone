import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { FormControl, FormLabel } from "@chakra-ui/react";

const Register = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/airbnb/users/register", {
        email,
        username,
        password,
      });
      setEmail("");
      setUsername("");
      setPassword("");
      toast({
        title: `Registration Successful, Now Login`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response) {
        toast({
          title: error.response.data.error || "Server error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (error.request) {
        toast({
          title: "Network error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Unexpected error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      m={2}
      display={"flex"}
      flexDirection={"column"}
      h={"50vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <form onSubmit={handleRegister} style={{ width: "100%" }}>
        <FormControl my={1}>
          <FormLabel>Username</FormLabel>
          <Input
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </FormControl>
        <FormControl my={1}>
          <FormLabel>Email</FormLabel>
          <Input
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </FormControl>
        <FormControl my={1}>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </FormControl>
        <Button my={3} width={"100%"} colorScheme="pink" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
