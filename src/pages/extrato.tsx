import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai";
import Nu from "@/assets/logos_bank/nubank-logo-2.png";
import { DataTable } from "@/components/dataTable";
import { Col, Row, Tooltip } from "antd";
import Default from "@/container/default";
import { BsDownload } from "react-icons/bs";
import { withSSRAuthRedirectOrganization } from "@/utils/withSSRAuthRedirectOrganization";

const Extrato = () => {
  return (
    <Default title="Extrato">
      <Flex alignItems="center" fontSize="15px" mb="15px">
        <Text>Extrato</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100">Entrada & Saída</Text>
      </Flex>
      <Row gutter={[30, 30]}>
        <Col span={12}>
          <Box w="100%">
            <Flex alignItems="center" mb="15px">
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
              <Text
                fontSize="18px"
                color="green.200"
                cursor="pointer"
                ml="10px"
              >
                Adicionar carteira
              </Text>
            </Flex>
            <Row gutter={[30, 30]}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
          </Box>
        </Col>
        <Col span={12}>
          <Flex alignItems="center" mb="15px" justifyContent="flex-end">
            <Icon as={BsDownload} fontSize="18px" color="white.700" />
            <Text fontSize="18px" color="white.700" cursor="pointer" ml="10px">
              Exportar extrato
            </Text>
          </Flex>
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
              <DataTable
                columns={[
                  {
                    title: "Método",
                    dataIndex: "payment",
                    key: "payment",
                    render(value) {
                      return (
                        <Flex alignItems="center">
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
                    title: "Descrição",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Categoria",
                    dataIndex: "category",
                    key: "category",
                  },
                  {
                    title: "Data",
                    dataIndex: "date",
                    key: "date",
                    align: "center",
                  },
                  {
                    title: "Tipo",
                    dataIndex: "type",
                    key: "type",
                    align: "center",
                    render(value, record, index) {
                      return (
                        <Tooltip placement="top" title="Saída">
                          <Icon
                            as={AiOutlineArrowDown}
                            fontSize="16px"
                            color="red.100"
                            mr="10px"
                          />
                        </Tooltip>
                      );
                    },
                  },
                  {
                    title: "Valor",
                    dataIndex: "value",
                    key: "value",
                    align: "center",
                  },
                ]}
                dataSource={[
                  {
                    key: "10",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                  {
                    key: "1",
                    name: "Assaí",
                    payment: "Nubank",
                    category: "Mercado",
                    value: "R$ 2.360,00",
                    transaction: "5",
                    date: "20/08/2023",
                    children: [],
                  },
                ]}
                expandable={{
                  expandedRowRender: (record) => (
                    <Box>
                      <Text color="white.700" fontWeight="bold">
                        Transações
                      </Text>
                      <DataTable
                        columns={[
                          {
                            title: "Descrição",
                            dataIndex: "transaction",
                            key: "transaction",
                          },

                          {
                            title: "Categoria",
                            dataIndex: "category",
                            key: "category",
                          },

                          {
                            title: "Valor",
                            dataIndex: "value",
                            key: "value",
                            align: "center",
                          },
                        ]}
                        dataSource={[
                          {
                            key: "1",
                            transaction: "Óleo",
                            category: "Cozinha",
                            value: "R$ 10,99",
                          },
                        ]}
                        pagination={false}
                      />
                    </Box>
                  ),
                  rowExpandable: (record) => record.children,
                }}
              />
            </Box>
          </Box>
        </Col>
      </Row>
    </Default>
  );
};

export default Extrato;

export const getServerSideProps = withSSRAuthRedirectOrganization(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
