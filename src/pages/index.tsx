import { HookCheckBox } from "@/components/form/checkbox";
import { HookInput } from "@/components/form/input";
import api from "@/lib/axios";
import {
  Button,
  Card,
  Center,
  Icon,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { message } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { setCookie } from "nookies";
import { withSSRAuthRedirect } from "@/utils/withSSRAuthRedirect";
import { useRouter } from "next/router";

interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const router = useRouter();
  const [see, setSee] = useState<boolean>(false);
  const { register, handleSubmit, formState, control } = useForm<ILogin>();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (body: ILogin) => {
    try {
      const { data } = await api.post("login", body);
      if (data.error) return message.error(data.msg);
      if (data.user) {
        setCookie(undefined, "nextAuth.duoFinance", JSON.stringify(data.user));
        router.push("/organizacao");
      }
    } catch (error) {
      message.error("Erro ao realizar login");
    }
  };

  return (
    <Center
      minH="100vh"
      bgGradient="linear(to-r,green.900, green.600)"
      p="20px"
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: "url('Mapa.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Card padding="1.5rem" bg="green.800" color="white" w="100%" maxW="500px">
        <Text>Login</Text>
        <Text fontSize="14px" mt="20px">
          Por favor preencha os campos para realizar o login:
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="20px" mt="20px" alignItems="flex-start">
            <HookInput
              {...register("email", {
                required: "Campo obrigatório",
              })}
              type="email"
              label="Email"
              error={errors.email}
            />
            <HookInput
              {...register("password", {
                required: "Campo obrigatório",
              })}
              type={see ? "text" : "password"}
              label="Senha"
              error={errors.password}
              inputRightElement={
                <InputRightElement width="4.5rem">
                  <Icon
                    as={see ? BsEyeSlash : BsEye}
                    cursor="pointer"
                    fontSize="18px"
                    onClick={() => setSee(!see)}
                  />
                </InputRightElement>
              }
            />
            <HookCheckBox
              control={control}
              label="Manter logado"
              name="remenber"
              color="white.900"
              fontSize="14px"
              borderColor="green.200"
            />
            <Text
              fontSize="14px"
              color="white.900"
              textAlign="left"
              width="100%"
            >
              Se você esqueceu sua senha você pode{" "}
              <Text
                as="span"
                color="green.200"
                cursor="pointer"
                textDecoration="underline"
              >
                resetar.
              </Text>
            </Text>
            <Button
              isLoading={isSubmitting}
              w="100%"
              bg="green.200"
              type="submit"
              color="white"
              borderWidth="1px"
              borderRadius="2px"
              borderColor="green.200"
              _hover={{
                bg: "green.800",
                borderColor: "green.200",
                transition: "all 0.3s",
              }}
            >
              Login
            </Button>
            <Text
              fontSize="14px"
              color="white.900"
              textAlign="center"
              width="100%"
            >
              Não tem conta ?{" "}
              <Text
                as="span"
                color="green.200"
                cursor="pointer"
                textDecoration="underline"
              >
                Cadastrar
              </Text>
            </Text>
          </VStack>
        </form>
      </Card>
    </Center>
  );
};

export default Login;

export const getServerSideProps = withSSRAuthRedirect(async (ctx) => {
  return {
    props: {},
  };
});
