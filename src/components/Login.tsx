import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../auth/useAuth";
import auth from "../services/auth";

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = auth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const authToken = await mutateAsync({ email, password });
      logIn(authToken);
      navigate("/create");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="lg">
      <Heading mb={6}>Login</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit} isLoading={isPending}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
