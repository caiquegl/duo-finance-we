import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Logo from "@/assets/logo_white.png";
import Image from "next/image";
import { BsFillBarChartFill, BsFillCreditCard2BackFill } from "react-icons/bs";
import {
  BiSearchAlt2,
  BiSolidCategory,
  BiSolidShoppingBagAlt,
} from "react-icons/bi";
import {
  AiOutlineDollar,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { ImLoop2 } from "react-icons/im";
import { TbChartDonutFilled } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { Tooltip } from "antd";
import { useRouter } from "next/router";

interface IProps {
  children: ReactNode;
  title: string;
}

const Default = ({ children, title }: IProps) => {
  const router = useRouter();
  const { asPath } = useRouter();

  const isActive = (name: string) => {
    let isActive = false;

    if (asPath === name) {
      isActive = true;
    }
    return isActive;
  };

  return (
    <Flex bg="black.500" w="100%">
      <Box
        bg="black.100"
        minW="80px"
        minH="100vh"
        position="fixed"
        left="0"
        top="0"
        display="flex"
        alignItems="center"
        flexDirection="column"
        py="10px"
      >
        <Image src={Logo} alt="logo" objectFit="cover" height={50} width={50} />
        <VStack mt="50px" w="100%" p="0">
          <Flex
            cursor="pointer"
            color={isActive("/dashboard") ? "white" : "gray.100"}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            bg={isActive("/dashboard") ? "orange.500" : "none"}
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
            onClick={() => router.push("dashboard")}
          >
            <Tooltip placement="right" title="Dashboard">
              <Icon as={BsFillBarChartFill} fontSize="25px" />
            </Tooltip>
          </Flex>
          <Flex
            cursor="pointer"
            color={isActive("/extrato") ? "white" : "gray.100"}
            bg={isActive("/extrato") ? "orange.500" : "none"}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
            onClick={() => router.push("extrato")}
          >
            <Tooltip placement="right" title="Extrato">
              <Icon as={AiOutlineUnorderedList} fontSize="25px" />
            </Tooltip>
          </Flex>
          <Flex
            cursor="pointer"
            color={isActive("/cartao") ? "white" : "gray.100"}
            bg={isActive("/cartao") ? "orange.500" : "none"}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
            onClick={() => router.push("cartao")}
          >
            <Tooltip placement="right" title="Cartões">
              <Icon as={BsFillCreditCard2BackFill} fontSize="25px" />
            </Tooltip>
          </Flex>
          <Flex
            cursor="pointer"
            color={isActive("/compras") ? "white" : "gray.100"}
            bg={isActive("/compras") ? "orange.500" : "none"}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            onClick={() => router.push("compras")}
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
          >
            <Tooltip placement="right" title="Compras">
              <Icon as={BiSolidShoppingBagAlt} fontSize="25px" />
            </Tooltip>
          </Flex>
          <Flex
            cursor="pointer"
            color={isActive("/entrada") ? "white" : "gray.100"}
            bg={isActive("/entrada") ? "orange.500" : "none"}
            onClick={() => router.push("entrada")}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
          >
            <Tooltip placement="right" title="Entrada">
              <Icon as={AiOutlineDollar} fontSize="25px" />
            </Tooltip>
          </Flex>
          <Flex
            cursor="pointer"
            color={isActive("/categorias") ? "white" : "gray.100"}
            bg={isActive("/categorias") ? "orange.500" : "none"}
            w="100%"
            h="60px"
            onClick={() => router.push("categoria")}
            alignItems="center"
            justifyContent="center"
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
          >
            <Tooltip placement="right" title="Categorias">
              <Icon as={BiSolidCategory} fontSize="25px" />
            </Tooltip>
          </Flex>

          <Flex
            cursor="pointer"
            color={isActive("/graficos") ? "white" : "gray.100"}
            bg={isActive("/graficos") ? "orange.500" : "none"}
            w="100%"
            h="60px"
            alignItems="center"
            justifyContent="center"
            _hover={{
              transition: "all 0.3s",
              color: "white",
              bg: "gray.700",
            }}
          >
            <Tooltip placement="right" title="Gráficos">
              <Icon as={TbChartDonutFilled} fontSize="25px" />
            </Tooltip>
          </Flex>
        </VStack>

        <Flex
          cursor="pointer"
          color="orange.500"
          w="100%"
          h="60px"
          mt="auto"
          alignItems="center"
          justifyContent="center"
          _hover={{
            transition: "all 0.3s",
            color: "white",
            bg: "orange.500",
          }}
        >
          <Icon as={AiOutlineLogout} fontSize="25px" />
        </Flex>
      </Box>
      <Box ml="80px" color="white" bg="black.500" w="100%">
        <Flex
          px="30px"
          alignItems="center"
          justifyContent="space-between"
          w="calc(100% - 80px)"
          bg="green.800"
          h="80px"
          position="absolute"
          top="0"
          left="80px"
        >
          <InputGroup bg="gray.200" borderRadius="4px" maxW="400px">
            <Input
              type="tel"
              placeholder="Pesquisar..."
              _placeholder={{
                color: "white.900",
              }}
            />
            <InputRightElement>
              <Icon as={BiSearchAlt2} fontSize="25px" color="white.900" />
            </InputRightElement>
          </InputGroup>
          <Text color="white" textAlign="center">
            {title}
          </Text>
          <HStack spacing="20px">
            <Box>
              <Box
                borderRadius="full"
                w="10px"
                h="10px"
                bg="orange.500"
                position="relative"
                right="-13px"
                top="7px"
              />
              <Icon as={IoIosNotifications} fontSize="25px" color="white" />
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                bg="transparent"
                _hover={{
                  bg: "transparent",
                }}
                rightIcon={
                  <Icon as={FiChevronDown} fontSize="18px" color="white" />
                }
              >
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box
          px="30px"
          mt="100px"
          w="100%"
          bg="black.500"
          h="100%"
          minH="calc(100vh - 100px)"
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Default;
