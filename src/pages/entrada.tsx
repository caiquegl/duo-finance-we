import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import Nu from "@/assets/logos_bank/nubank-logo-2.png";
import { DataTable } from "@/components/dataTable";
import { Col, Row, Tooltip, message } from "antd";
import Default from "@/container/default";
import { BsDownload } from "react-icons/bs";
import { withSSRAuthRedirectOrganization } from "@/utils/withSSRAuthRedirectOrganization";
import api from "@/lib/axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@/styles/table.css";
import { useForm } from "react-hook-form";
import { DefaultModal } from "@/components/defaultModal";
import { HookInput } from "@/components/form/input";
import { HookSearch } from "@/components/form/search";
import { HookInputNumber } from "@/components/form/inputNumber";

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
  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    resetField,
    watch,
  } = useForm();
  const { errors, isSubmitting } = formState;

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [data, setData] = useState<IPropsTable[]>([]);
  const [categ, setCateg] = useState<any[]>([]);
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
      data?.exits?.forEach((item: any) => {
        // Remova o símbolo "R$" e converta a string formatada em um número
        const valorNumerico = parseFloat(
          item.value
            .replace("R$", "")
            .replaceAll(".", "")
            .replaceAll(",", ".")
            .trim()
        );

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

  const getOpt = async () => {
    try {
      const { data } = await api.get("auth/get-categ");
      setCateg(data.categ);
    } catch (error) {
      message.error("Erro ao listar categorias");
    }
  };

  const onRegister = async (body: any) => {
    try {
      await api.post("auth/insert-entry", body);

      listExits();

      message.success("Entrada cadastrada com sucesso");
    } catch (error) {
      message.error("Erro ao cadastrar Entrada");
    } finally {
      setOpen(!open);
      reset();
    }
  };

  const openModal = () => {
    setOpen(!open);
    getOpt();
    reset();
  };

  useEffect(() => {
    listExits();
    getOpt();
  }, [date]);

  return (
    <Default title="Entradas">
      <Flex alignItems="center" fontSize="15px" mb="15px">
        <Text>Entradas</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100"> Entrada</Text>
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
            onClick={() => openModal()}
          >
            Adicionar entrada
          </Button>
        </Flex>
      </Flex>
      <Box
        borderRadius="5px"
        bg="green.800"
        p="10px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
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
      <DefaultModal
        onClose={setOpen}
        open={open}
        title="Adicionar Entrada"
        body={
          <form onSubmit={handleSubmit(onRegister)}>
            <VStack
              spacing="40px"
              mt="20px"
              alignItems="flex-start"
              w="100%"
              mb="20px"
            >
              <Row style={{ width: "100%" }} gutter={[40, 40]}>
                <Col span={12}>
                  <HookInput
                    {...register(`market`, {
                      required: "Campo obrigatório",
                    })}
                    label="Nome da entrada"
                    error={errors.market}
                    visibleLabel={true}
                  />
                </Col>
                <Col span={12}>
                  <HookInput
                    {...register(`date`, {
                      required: "Campo obrigatório",
                    })}
                    label="Data da entrada"
                    error={errors.date}
                    typeInput="datetime-local"
                    visibleLabel={true}
                  />
                </Col>
                <Col span={12}>
                  <HookInputNumber
                    control={control}
                    name="total"
                    visibleLabel={true}
                    label="Valor"
                    type="number"
                    error={errors.value}
                  />
                </Col>
                <Col span={12}>
                  <HookSearch
                    control={control}
                    label="Categoria"
                    name="category_id"
                    visibleLabel={true}
                    path="categories"
                  />
                </Col>
              </Row>

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
                Cadastrar
              </Button>
            </VStack>
          </form>
        }
      />
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
