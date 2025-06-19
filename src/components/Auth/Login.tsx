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
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router";
import useHandleLogin from "../../hooks/Auth/useHandleLogin";
import auth from "../../services/auth";

const Login = () => {
  const { mutateAsync: login, isPending } = auth();
  const { handleSubmit } = useHandleLogin({ login });
  const [showPassword, setShowPassword] = useState(false);

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
