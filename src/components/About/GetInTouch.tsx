import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const GetInTouch = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here, you can send the data to an API or email service
    console.log(formData);

    toast({
      title: "Message sent!",
      description: "I'll get back to you shortly.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box width="100%">
      <Heading textAlign="center" marginBottom={5} fontSize="2xl">
        Get in Touch
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel
              _after={{
                content: '"*"',
                color: "teal",
              }}
            >
              Name
            </FormLabel>
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              _after={{
                content: '"*"',
                color: "teal",
              }}
            >
              Email
            </FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              _after={{
                content: '"*"',
                color: "teal",
              }}
            >
              Message
            </FormLabel>
            <Textarea
              name="message"
              placeholder="Your message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Send Message
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default GetInTouch;
