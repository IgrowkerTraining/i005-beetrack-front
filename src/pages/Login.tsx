import {
  Button,
  Field,
  Input,
  Card,
  Stack,
  AbsoluteCenter,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Simplify the store access - only select what you need
  const loginUser = useAuthStore((state) => state.loginUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Check authentication status and redirect if needed
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      try {
        await loginUser(credentials);
        console.log("Login successful!");
      } catch (error) {
        setErrorMessage("Login failed. Please check your credentials.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <AbsoluteCenter>
      <Card.Root as="form" maxW="sm" shadow="lg" onSubmit={handleLoginSubmit}>
        <Card.Header>
          <Card.Title>Log In</Card.Title>
          <Card.Description>
            Fill in the form below to log in your account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          {errorMessage && (
            <Text color="red.500" mb={4}>
              {errorMessage}
            </Text>
          )}
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                name="email"
                value={credentials.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Register</Button>
          <Button type="submit" variant="solid">
            Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
};

export default Login;
