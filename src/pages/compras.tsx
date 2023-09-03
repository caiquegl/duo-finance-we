import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineArrowDown } from "react-icons/ai";
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
import { DefaultModal } from "@/components/defaultModal";
import { useForm } from "react-hook-form";
import AddExit from "@/components/addExit";
import { HookInput } from "@/components/form/input";
import { HookSelect } from "@/components/form/select";
import * as XLSX from "xlsx";

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
    setValue,
  } = useForm();
  const { errors, isSubmitting } = formState;
  const fileInputRef = useRef<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [data, setData] = useState<IPropsTable[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [list, setList] = useState<any>([{ id: 0 }]);
  const [date, setDate] = useState<any>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const listExits = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/get-exits-entry", {
        date,
        type: "exit",
      });
      if (data.error) return message.error("Erro ao listar saídas");
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

  const onRegister = async (body: any) => {
    try {
      const groupedObj: any = {};
      for (const key in body) {
        if (body[key]) {
          if (key.startsWith("name-")) {
            const number = key.split("-")[1];
            if (!groupedObj[number]) {
              groupedObj[number] = {};
            }
            groupedObj[number].name = body[key];
          } else if (key.startsWith("qtd-")) {
            const number = key.split("-")[1];
            if (!groupedObj[number]) {
              groupedObj[number] = {};
            }
            groupedObj[number].qtd = body[key];
          } else if (key.startsWith("value-")) {
            const number = key.split("-")[1];
            if (!groupedObj[number]) {
              groupedObj[number] = {};
            }
            groupedObj[number].value = body[key];
          } else if (key.startsWith("category-")) {
            const number = key.split("-")[1];
            if (!groupedObj[number]) {
              groupedObj[number] = {};
            }
            groupedObj[number].category = body[key];
          }
        }
      }

      await api.post("auth/insert-exit", {
        market: body.market,
        date: body.date,
        credit_cards_id: body.credit_cards_id,
        parcelament: body.parcelament,
        type_payment: body.type_payment,
        products: Object.values(groupedObj),
      });

      listExits();

      message.success("Saída cadastrada com sucesso");
    } catch (error) {
      message.error("Erro ao cadastrar saída");
    } finally {
      setOpen(!open);
      reset();
      setList([{ id: 1 }]);
    }
  };

  const getCards = async () => {
    try {
      const { data } = await api.get("auth/get-cards");
      setCards(data.cards);
    } catch (error) {
      message.error("Erro ao listar cartões");
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const data = new Uint8Array(e?.target?.result);

      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const findPosition = (desc: string) => {
        return jsonData[0].findIndex((item: any) => item == desc);
      };

      let obj = {
        name: findPosition("Descrição"),
        qtd: findPosition("Qtd. Comercial"),
        value: findPosition("Valor Unit."),
        type: findPosition("Unid. Comercial"),
        value_bruto: findPosition("Valor Bruto"),
      };

      let newList = [];

      function contemUN(texto: string) {
        // Use uma expressão regular (regex) para procurar "UN" ou "un" no texto
        const regex = /UN|un/;

        // Use o método test() da regex para verificar se há correspondências
        return regex.test(texto);
      }

      for await (const [index, item] of list.entries()) {
        resetField(`name-${index}`);
        resetField(`qtd-${index}`);
        resetField(`value-${index}`);
        resetField(`category-${index}`);
      }

      for await (const [index, item] of jsonData.entries()) {
        if (index == 0) continue;
        let li = {
          id: index - 1,
          [`name-${index - 1}`]: item[obj.name],
          [`value-${index - 1}`]: contemUN(item[obj.type])
            ? parseFloat(item[obj.value])
            : parseFloat(item[obj.value_bruto]),
          [`qtd-${index - 1}`]: contemUN(item[obj.type]) ? item[obj.qtd] : 1,
        };

        newList.push(li);

        setValue(`name-${index - 1}`, li[`name-${index - 1}`]);
        setValue(`qtd-${index - 1}`, li[`qtd-${index - 1}`]);
        setValue(`value-${index - 1}`, li[`value-${index - 1}`]);
      }
      console.log(newList);
      setList([...newList]);
    };

    reader.readAsArrayBuffer(file);
  };

  const openModal = () => {
    setOpen(!open);
    reset();
    setList([{ id: 1 }]);
    getCards();
  };

  useEffect(() => {
    listExits();
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Default title="Saídas">
      <Flex alignItems="center" fontSize="15px" mb="15px">
        <Text>Saídas</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100"> Saída</Text>
      </Flex>

      <Flex alignItems="center" mb="15px" justifyContent="space-between">
        <Flex alignItems="flex-end">
          <Text fontSize="25px" color="red.100">
            <Text as="span" fontSize="15px" mr="10px">
              Total gasto
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
              Exportar Saída
            </Text>
          </Flex>
          <Button
            bg="red.100"
            color="white"
            fontSize="15px"
            ml="20px"
            p="10px"
            onClick={() => openModal()}
          >
            Adicionar saída
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
              {
                title: "Método",
                dataIndex: "payment",
                key: "payment",
                render(value) {
                  return (
                    <Flex alignItems="center">
                      {/* <Image
                        src={Nu}
                        width={30}
                        height={30}
                        alt="bank"
                        style={{
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      /> */}
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
              {
                title: "ID",
                dataIndex: "key",
                key: "key",
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
        title="Adicionar saída"
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
                    label="Nome da saída"
                    error={errors.market}
                    visibleLabel={true}
                  />
                </Col>
                <Col span={12}>
                  <HookInput
                    {...register(`date`, {
                      required: "Campo obrigatório",
                    })}
                    label="Data da saída"
                    error={errors.date}
                    typeInput="datetime-local"
                    visibleLabel={true}
                  />
                </Col>
                <Col span={watch("type_payment") == "Crédito" ? 8 : 24}>
                  <HookSelect
                    control={control}
                    name="type_payment"
                    label="Forma de pagamento"
                    visibleLabel={true}
                    opt={[
                      { label: "Cartão de crédito", value: "Crédito" },
                      { label: "Pix", value: "Pix" },
                      { label: "Cartão de debito", value: "Debito" },
                      { label: "Dinheiro", value: "Dinheiro" },
                    ]}
                  />
                </Col>
                {watch("type_payment") == "Crédito" && (
                  <Col span={8}>
                    <HookSelect
                      control={control}
                      name="credit_cards_id"
                      label="Cartão de credito"
                      visibleLabel={true}
                      opt={cards}
                    />
                  </Col>
                )}
                {watch("type_payment") == "Crédito" && (
                  <Col span={8}>
                    <HookSelect
                      control={control}
                      name="parcelament"
                      label="Cartão de credito"
                      visibleLabel={true}
                      opt={[
                        { label: "Á vista", value: 1 },
                        { label: "2x", value: 2 },
                        { label: "3x", value: 3 },
                        { label: "4x", value: 4 },
                        { label: "5x", value: 5 },
                        { label: "6x", value: 6 },
                        { label: "7x", value: 7 },
                        { label: "8x", value: 8 },
                        { label: "9x", value: 9 },
                        { label: "10x", value: 10 },
                        { label: "11x", value: 11 },
                        { label: "12x", value: 12 },
                      ]}
                    />
                  </Col>
                )}
              </Row>
              {list.length > 0 &&
                list.map((item: any, index: number) => (
                  <AddExit
                    control={control}
                    errors={errors}
                    register={register}
                    index={index}
                    key={index}
                    sub={() => {
                      setList((prevList: any) => {
                        const newList = prevList.filter(
                          (_: any, i: any) => i !== index
                        );
                        return [...newList];
                      });

                      resetField(`name-${index}`);
                      resetField(`qtd-${index}`);
                      resetField(`value-${index}`);
                      resetField(`category-${index}`);
                    }}
                  />
                ))}
              <Flex alignItems="center" justifyContent="space-between" w="100%">
                <Divider />{" "}
                <Text
                  fontSize="15px"
                  color="white.700"
                  w="350px"
                  cursor="pointer"
                  onClick={() => {
                    let add = list;
                    add.push({ id: add.length });
                    setList([...add]);
                  }}
                >
                  + Adicionar produto
                </Text>{" "}
                <Divider />
              </Flex>
              <Row gutter={[20, 20]} style={{ width: "100%" }}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
                  <Button
                    isLoading={isSubmitting}
                    bg="transparent"
                    w="100%"
                    type="button"
                    color="white"
                    borderWidth="1px"
                    borderRadius="2px"
                    borderColor="green.200"
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    _hover={{
                      bg: "green.800",
                      borderColor: "green.200",
                      transition: "all 0.3s",
                    }}
                  >
                    Importar nota
                  </Button>
                  <input
                    id="file"
                    type="file"
                    multiple={false}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Col>
              </Row>
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
