import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import useAuth from "../auth/useAuth";
import auth from "../services/auth";

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const { logIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = auth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: Login) => {
    try {
      const authToken = await mutateAsync(values);
      logIn(authToken);
      toast({
        title: "Login successful.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/create");
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: "Login failed.",
        description:
          typeof err.response?.data === "string"
            ? err.response.data
            : JSON.stringify(err.response?.data),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="lg">
      <Heading mb={4}>Login</Heading>
      <VStack spacing={4}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiMail />
                  </InputLeftElement>
                  <Input
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange("email")}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <CiLock />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange("password")}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="show password"
                      icon={!showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    />
                    <IoIosEye />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                isLoading={isPending}
                width="100%"
              >
                <Text textTransform="uppercase">Log in</Text>
              </Button>
            </form>
          )}
        </Formik>
        <Box display="flex" gap={1}>
          <Text>Don't have an account?</Text>
          <Link to="/signup">
            <Text
              _hover={{ textDecoration: "underline" }}
              color="teal"
              fontWeight="bold"
            >
              Sign up
            </Text>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
