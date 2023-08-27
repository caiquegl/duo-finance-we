import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  AiOutlineArrowDown,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlinePlus,
} from "react-icons/ai";
import Nu from "@/assets/logos_bank/nubank-logo-2.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataTable } from "@/components/dataTable";
import { Col, Divider, Row } from "antd";
import Default from "@/container/default";
import { useRouter } from "next/router";
import { withSSRAuthRedirectOrganization } from "@/utils/withSSRAuthRedirectOrganization";

const Dashboard = () => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Default title="Dashboard">
      <Flex alignItems="center" fontSize="15px">
        <Text>Dashboard</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100">Home</Text>
      </Flex>
      <HStack p="0" mt="20px" alignItems="flex-start" spacing="30px">
        <Box w="100%" maxW="400px">
          <Text fontSize="18px" mb="20px">
            Balanço
          </Text>
          <Box borderRadius="5px" bg="green.800" p="10px">
            <Flex alignItems="center" justifyContent="space-between">
              <Box>
                <Text fontSize="15px" color="white.700">
                  Transações
                </Text>
                <Text fontSize="24px" color="white">
                  250
                </Text>
              </Box>
              <Button color="white" bg="green.500">
                4 carteiras
              </Button>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Box mt="15px">
                <Text fontSize="15px" color="white.700">
                  Saldo atual
                </Text>
                <Text fontSize="24px" color="green.200">
                  R$ 3.424,00
                </Text>
              </Box>
              <Flex mt="15px" alignItems="center">
                <Text fontSize="15px" color="white.700">
                  2,7292 EUR
                </Text>
                <Text fontSize="15PX" color="green.200" ml="10px">
                  +16%
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box w="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            mb="20px"
          >
            <Text fontSize="18px">Minhas Carteiras</Text>
            <HStack alignItems="center" spacing="15px">
              <Box
                cursor="pointer"
                height="25px"
                w="25px"
                borderColor="green.200"
                borderWidth="1px"
                borderRadius="5px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={AiOutlinePlus} fontSize="18px" color="green.200" />
              </Box>
              <Text fontSize="18px" color="green.200" cursor="pointer">
                Adicionar carteira
              </Text>
              <Button
                w="30px"
                h="30px"
                borderRadius="5px"
                bg="green.800"
                onClick={handlePrev}
              >
                <Icon as={BiChevronLeft} fontSize="18px" color="white" />
              </Button>
              <Button
                className="swiper-button-next"
                w="30px"
                h="30px"
                borderRadius="5px"
                bg="green.800"
                onClick={handleNext}
              >
                <Icon as={BiChevronRight} fontSize="18px" color="white " />
              </Button>
            </HStack>
          </Flex>
          <Box maxW="calc(100vw - 30px - 60px - 80px - 400px)">
            <Swiper
              // itemRef={swiperRef}
              ref={sliderRef}
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },

                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              navigation={true}
              pagination={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.400"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.800"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.800"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.800"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.800"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box
                  w="100%"
                  h="150px"
                  bg="green.800"
                  borderRadius="5px"
                  backgroundImage="url('logo_white_blur.png')"
                  backgroundSize="200px"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="top -80px right -80px"
                  p="15px"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    h="100%"
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text fontSize="15px">Nubank</Text>
                        <Image
                          src={Nu}
                          width={30}
                          height={30}
                          alt="bank"
                          style={{ borderRadius: "10px" }}
                        />
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        R$ 2.360,00
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          55
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          R$ 2.360,00
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          15/08/2023
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      </HStack>
      <Box mt="30px">
        <Row gutter={30}>
          <Col span={14}>
            <Box
              borderRadius="5px"
              bg="green.800"
              p="10px"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="15px" color="white" mb="10px">
                  Entradas / Saídas
                </Text>
                <DataTable
                  columns={[
                    {
                      title: "Pagamento",
                      dataIndex: "payment",
                      key: "payment",
                      render(value) {
                        return (
                          <Flex alignItems="center">
                            <Icon
                              as={AiOutlineArrowDown}
                              fontSize="16px"
                              color="red.100"
                              mr="10px"
                            />
                            <Image
                              src={Nu}
                              width={30}
                              height={30}
                              alt="bank"
                              style={{
                                borderRadius: "10px",
                                marginRight: "10px",
                              }}
                            />
                            {value}
                          </Flex>
                        );
                      },
                    },
                    {
                      title: "Valor",
                      dataIndex: "value",
                      key: "value",
                    },
                    {
                      title: "Transações",
                      dataIndex: "transaction",
                      key: "transaction",
                    },
                    {
                      title: "Data",
                      dataIndex: "date",
                      key: "date",
                    },
                  ]}
                  dataSource={[
                    {
                      key: "1",
                      payment: "Nubank",
                      value: "R$ 2.360,00",
                      transaction: "5",
                      date: "20/08/2023",
                    },
                  ]}
                />
              </Box>
            </Box>
          </Col>

          <Col span={5}>
            <Box
              borderRadius="5px"
              bg="green.800"
              p="10px"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="15px" color="white" mb="10px">
                  Transações
                </Text>
                <VStack
                  maxW="100%"
                  overflow="auto"
                  spacing="20px"
                  mt="20px"
                  maxH="320px"
                  pr="10px"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#565959",
                      borderRadius: "24px",
                    },
                  }}
                >
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                  <Box w="100%">
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                      mb="10px"
                    >
                      <Text fontSize="15px" color="white">
                        Chuleta
                      </Text>
                      <Flex alignItems="center">
                        <Icon
                          as={AiOutlineArrowRight}
                          fontSize="16px"
                          color="red.100"
                          mr="40px"
                        />
                        <Text fontSize="15px" color="white">
                          R$ 17,99
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text fontSize="15px" color="white.900">
                        20/08/2022
                      </Text>
                      <Text fontSize="15px" color="white.900">
                        Mistura
                      </Text>
                    </Flex>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </Col>
          <Col span={5}>
            <Box
              borderRadius="5px"
              bg="green.800"
              p="10px"
              h="100%"
              display="flex"
              maxH="250px"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="15px" color="white" mb="10px">
                  Entrada
                </Text>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text color="white.700" fontSize="15px">
                    Saldo
                  </Text>
                  <Flex alignItems="center">
                    <Icon
                      as={AiOutlineArrowUp}
                      fontSize="13px"
                      color="green.200"
                      mr="10px"
                    />
                    <Text fontSize="16px" color="green.200">
                      R$ 3.424,00
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  mt="20px"
                >
                  <Text fontSize="15px" color="white.700">
                    Transações
                  </Text>
                  <Text fontSize="16px" color="white">
                    250
                  </Text>
                </Flex>
              </Box>
              <Divider
                style={{
                  borderColor: "#AAA",
                  margin: 0,
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Box>
                <Text
                  fontSize="15px"
                  color="white"
                  textAlign="center"
                  mb="10px"
                >
                  Saída
                </Text>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text color="white.700" fontSize="15px">
                    Saldo
                  </Text>
                  <Flex alignItems="center">
                    <Icon
                      as={AiOutlineArrowDown}
                      fontSize="13px"
                      color="red.100"
                      mr="10px"
                    />
                    <Text fontSize="16px" color="red.100">
                      R$ 3.424,00
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  mt="20px"
                >
                  <Text fontSize="15px" color="white.700">
                    Transações
                  </Text>
                  <Text fontSize="16px" color="white">
                    250
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Col>
        </Row>
      </Box>
    </Default>
  );
};

export default Dashboard;

export const getServerSideProps = withSSRAuthRedirectOrganization(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
