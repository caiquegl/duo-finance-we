import { Box, Center, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row, message } from "antd";
import Default from "@/container/default";
import { withSSRAuthRedirectOrganization } from "@/utils/withSSRAuthRedirectOrganization";
import api from "@/lib/axios";
import moment from "moment";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@/styles/table.css";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

interface IPropsCards {
  id: number;
  name: string;
  picture?: string;
  transactions: number;
  couts: number;
  venc: string;
}
const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPropsCards[]>([]);
  const [date, setDate] = useState<any>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const listCards = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/get-credit-cards", { date });
      if (data.error) return message.error("Erro ao realizar consulta");
      setData(data.creditCards);
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listCards();
  }, [date]);

  return (
    <Default title="Cartões">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" fontSize="15px" mb="15px">
          <Text>Cartão</Text>
          <Icon as={BiChevronRight} fontSize="18px" color="white" />
          <Text color="gray.100">Lista</Text>
        </Flex>
        <Flex alignItems="center" fontSize="15px" mb="15px">
          <RangePicker
            defaultValue={date}
            format={"DD/MM/YYYY"}
            style={{
              background: "#2D3639",
              border: "none",
              color: "#9A9C9C",
            }}
            className="picker"
            clearIcon={false}
            onChange={(value) => setDate(value)}
          />
        </Flex>
        <Flex alignItems="center">
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
          <Text fontSize="18px" color="green.200" cursor="pointer" ml="10px">
            Adicionar cartão
          </Text>
        </Flex>
      </Flex>

      <Box w="100%" mt="15px">
        {loading && (
          <Center w="100%" h="100%">
            <Spinner color="orange.500" size="lg" />
          </Center>
        )}
        <Row gutter={[30, 30]}>
          {data.length > 0 &&
            data.map((item) => (
              <Col span={12} key={item.id}>
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
                        <Text fontSize="15px" textTransform="capitalize">
                          {item.name}
                        </Text>
                        {item.picture && (
                          <Image
                            src={item.picture}
                            width={30}
                            height={30}
                            alt="bank"
                            style={{ borderRadius: "10px" }}
                          />
                        )}
                      </Flex>
                      <Text fontSize="20px" color="red.100" fontWeight="bold">
                        {item.couts.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    </Box>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Transações
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          {item.transactions}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Gasto
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          {item.couts.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }) || 0}
                        </Text>
                      </Box>
                      <Box>
                        <Text color="white.700" fontSize="14px">
                          Data de vencimento
                        </Text>
                        <Text color="white" fontSize="14px" textAlign="center">
                          {moment(item.venc, "YYYY-MM-DD").format("DD/MM/YYYY")}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </Col>
            ))}
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
