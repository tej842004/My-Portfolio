import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import type Auth from "../../entities/Auth";
import type { User } from "../../entities/User";

const useHandleRegister = ({
  register,
}: {
  register: UseMutateAsyncFunction<string, Error, User, unknown>;
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: Auth) => {
    try {
      await register(values);
      toast({
        title: "Registration successful.",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: "Registration failed.",
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

  return { handleSubmit };
};

export default useHandleRegister;
