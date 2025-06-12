import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import mail, { type Mail } from "../../services/mail";
import AboutSection from "./AboutSection";

const heading = "Get in Touch";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(255, "Name cannot exceed 255 characters")
    .label("Name"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .label("Email"),
  message: Yup.string()
    .required("Message is required")
    .min(4, "Message must be at least 4 characters")
    .label("Message"),
});

const GetInTouch = () => {
  const { mutateAsync, isPending } = mail();
  const toast = useToast();

  const handleEmail = async (mail: Mail) => {
    try {
      await mutateAsync(mail);
      toast({
        title: "Message sent!",
        description: "I'll get back to you shortly.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <AboutSection heading={heading}>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleEmail(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name && !!touched.name}>
                <FormLabel>Name</FormLabel>
                <Field as={Input} name="name" placeholder="Your name" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email && !!touched.email}>
                <FormLabel>Email</FormLabel>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  placeholder="Your email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.message && !!touched.message}>
                <FormLabel>Message</FormLabel>
                <Field
                  as={Textarea}
                  name="message"
                  placeholder="Your message"
                  rows={5}
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isPending}
              >
                Send Message
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </AboutSection>
  );
};

export default GetInTouch;
