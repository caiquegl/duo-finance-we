import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import Nu from "@/assets/logos_bank/nubank-logo-2.png";
import { DataTable } from "@/components/dataTable";
import { Tooltip, message } from "antd";
import Default from "@/container/default";
import { BsDownload } from "react-icons/bs";
import { withSSRAuthRedirectOrganization } from "@/utils/withSSRAuthRedirectOrganization";
import api from "@/lib/axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@/styles/table.css";

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);

interface IPropsTable {
  payment: string;
  name: string;
  category: string;
  transaction: number;
  date: string;
  type: string;
  value: number;
  children?: IPropsTable[];
}

const Saidas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [data, setData] = useState<IPropsTable[]>([]);
  const [date, setDate] = useState<any>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const listExits = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/get-exits-entry", {
        date,
        type: "entry",
      });
      if (data.error) return message.error("Erro ao listar Entradas");
      setData(data.exits);
      // Inicialize uma variável para armazenar a soma total
      let somaTotal = 0;

      // Itere sobre o array "exits" e some os valores
      data.exits.forEach((item: any) => {
        // Remova o símbolo "R$" e converta a string formatada em um número
        const valorNumerico = parseFloat(item.value.replace("R$", "").trim());

        // Some o valor à soma total
        somaTotal += valorNumerico;
      });

      setTotal(
        somaTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      );
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listExits();
  }, [date]);

  return (
    <Default title="Entradas">
      <Flex alignItems="center" fontSize="15px" mb="15px">
        <Text>Entradas</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100"> Saída</Text>
      </Flex>

      <Flex alignItems="center" mb="15px" justifyContent="space-between">
        <Flex alignItems="flex-end">
          <Text fontSize="25px" color="green.200">
            <Text as="span" fontSize="15px" mr="10px">
              Total de entrada
            </Text>
            {total}
          </Text>
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
          <Flex alignItems="center">
            <Icon as={BsDownload} fontSize="18px" color="white.700" />
            <Text fontSize="18px" color="white.700" cursor="pointer" ml="10px">
              Exportar Entrada
            </Text>
          </Flex>
          <Button
            bg="green.200"
            color="white"
            fontSize="15px"
            ml="20px"
            p="10px"
          >
            Adicionar entrada
          </Button>
        </Flex>
      </Flex>
      <Box
        borderRadius="5px"
        bg="green.800"
        p="10px"
        // h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <DataTable
            columns={[
              // {
              //   title: "Método",
              //   dataIndex: "payment",
              //   key: "payment",
              //   render(value) {
              //     return (
              //       <Flex alignItems="center">
              //         <Image
              //           src={Nu}
              //           width={30}
              //           height={30}
              //           alt="bank"
              //           style={{
              //             borderRadius: "10px",
              //             marginRight: "10px",
              //           }}
              //         />
              //         {value}
              //       </Flex>
              //     );
              //   },
              // },
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
                title: "Itens",
                dataIndex: "transaction",
                key: "transaction",
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
                    <Tooltip placement="top" title="Entrada">
                      <Icon
                        as={AiOutlineArrowUp}
                        fontSize="16px"
                        color="green.200"
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
            dataSource={data}
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
                        dataIndex: "name",
                        key: "name",
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
                      {
                        title: "Quantidade",
                        dataIndex: "qtd",
                        key: "qtd",
                        align: "center",
                      },
                    ]}
                    dataSource={record.expand}
                    pagination={false}
                  />
                </Box>
              ),
              rowExpandable: (record) =>
                record.expand && record.expand.length > 0,
            }}
            loading={loading}
          />
        </Box>
      </Box>
    </Default>
  );
};

export default Saidas;

export const getServerSideProps = withSSRAuthRedirectOrganization(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
