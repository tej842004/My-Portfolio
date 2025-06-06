import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";

const Register = () => {
  const toast = useToast();
  const { mutateAsync } = useCreateUser();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(form);
      toast({ title: "Registration successful", status: "success" });
    } catch (err: any) {
      toast({ title: err.response?.data || "Error", status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="lg">
      <Heading mb={6}>Register</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={form.email} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
