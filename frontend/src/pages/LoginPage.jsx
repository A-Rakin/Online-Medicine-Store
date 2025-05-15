import { useState } from "react";
import {
  Container,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists and password matches
    const user = storedUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Log In</Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="full">
          Log In
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "blue" }}>
            Sign up
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default LoginPage;