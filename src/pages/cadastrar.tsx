import { HookCheckBox } from "@/components/form/checkbox";
import { HookInput } from "@/components/form/input";
import {
  Button,
  Card,
  Center,
  Icon,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";

interface ISignUp {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
const Index = () => {
  const [see, setSee] = useState<boolean>(false);
  const [see2, setSee2] = useState<boolean>(false);
  const { register, handleSubmit, formState, control } = useForm<ISignUp>();
  const { errors, isLoading } = formState;

  const onSubmit = (body: ISignUp) => console.log(body);

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
        <Text>Cadastrar</Text>
        <Text fontSize="14px" mt="20px">
          Por favor preencha os campos para realizar o cadastro:
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="20px" mt="20px" alignItems="flex-start">
            <HookInput
              {...register("name", {
                required: "Campo obrigatório",
              })}
              type="name"
              label="Nome"
              error={errors.name}
            />
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
            <HookInput
              {...register("confirmPassword", {
                required: "Campo obrigatório",
              })}
              type={see2 ? "text" : "password"}
              label="Confirmar senha"
              error={errors.confirmPassword}
              inputRightElement={
                <InputRightElement width="4.5rem">
                  <Icon
                    as={see2 ? BsEyeSlash : BsEye}
                    cursor="pointer"
                    fontSize="18px"
                    onClick={() => setSee2(!see2)}
                  />
                </InputRightElement>
              }
            />
            <HookCheckBox
              control={control}
              label="Li e concordo com os Termos de Serviço. Termos de Apolo"
              name="igree"
              color="white.900"
              fontSize="14px"
              borderColor="orange.500"
            />

            <Button
              isLoading={isLoading}
              w="100%"
              bg="orange.500"
              type="submit"
              color="white"
              borderWidth="1px"
              borderRadius="2px"
              borderColor="orange.500"
              _hover={{
                bg: "green.800",
                borderColor: "orange.500",
                transition: "all 0.3s",
              }}
            >
              Registrar
            </Button>
            <Text
              fontSize="14px"
              color="white.900"
              textAlign="center"
              width="100%"
            >
              Já tem registro ?{" "}
              <Text
                as="span"
                color="orange.500"
                cursor="pointer"
                textDecoration="underline"
              >
                Logar
              </Text>
            </Text>
          </VStack>
        </form>
      </Card>
    </Center>
  );
};

export default Index;
