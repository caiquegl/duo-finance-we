import api from "@/lib/axios";
import { withSSRAuth } from "@/utils/withSSRAuth";
import {
  Box,
  Button,
  Card,
  Center,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { message } from "antd";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";

interface IPropsOrganization {
  id: number;
  name: string;
}

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IPropsOrganization[]>([]);

  const listOrganization = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("auth/list-organizacao", {});
      if (data.error) return message.error(data.msg);
      setData(data.organizations);
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setOrganization = (organization: IPropsOrganization) => {
    setCookie(
      undefined,
      "nextAuth.duoFinanceOrganization",
      JSON.stringify(organization)
    );
    router.push("/dashboard");
  };
  useEffect(() => {
    listOrganization();
  }, []);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r,green.900, green.600)"
      p="20px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
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
      <div>
        <Text color="white">Organizações</Text>
        <Text fontSize="14px" mt="10px" color="white.900">
          Selecione a organização do qual você deseja visualizar e inserir os
          dados:
        </Text>
        <VStack spacing="50px" mt="50px" h="100%">
          {data.length > 0 &&
            data.map((item) => (
              <Card
                padding="1.5rem"
                bg="green.800"
                color="white"
                w="100%"
                cursor="pointer"
                onClick={() => setOrganization(item)}
                _hover={{
                  opacity: 0.8,
                  transition: "all 0.3s",
                }}
                key={item.id}
              >
                <Text>{item.name}</Text>
              </Card>
            ))}
          {loading && (
            <Center w="100%" h="100px">
              <Spinner color="orange.500" />
            </Center>
          )}
        </VStack>
      </div>
      <Button
        mt="auto"
        w="100%"
        h="65px"
        bg="orange.500"
        type="submit"
        color="white"
        borderWidth="1px"
        borderRadius="2px"
        position="relative"
        borderColor="orange.500"
        fontSize="18px"
        _hover={{
          bg: "transparent",
          borderColor: "orange.500",
          transition: "all 0.3s",
        }}
      >
        Criar organização
      </Button>
    </Box>
  );
};

export default Index;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
