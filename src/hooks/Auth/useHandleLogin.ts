import { useToast } from "@chakra-ui/react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../auth/useAuth";
import type Auth from "../../entities/Auth";
import type { User } from "../../entities/User";

const useHandleLogin = ({
  login,
}: {
  login: UseMutateAsyncFunction<string, Error, User, unknown>;
}) => {
  const toast = useToast();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: Auth) => {
    try {
      const authToken = await login(values);
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

  return { handleSubmit };
};

export default useHandleLogin;
