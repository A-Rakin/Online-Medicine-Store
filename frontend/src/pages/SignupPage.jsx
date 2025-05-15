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

const SignupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage (or initialize empty array)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (storedUsers.some((u) => u.email === user.email)) {
      toast({
        title: "Error",
        description: "Email already exists. Please use a different email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Add new user to the array and save to localStorage
    storedUsers.push(user);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Show success message and redirect to homepage
    toast({
      title: "Signup Successful",
      description: "You have successfully signed up!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Sign Up</Heading>

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={user.email}
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
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="full">
          Sign Up
        </Button>

        <Text>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Log in
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default SignupPage;