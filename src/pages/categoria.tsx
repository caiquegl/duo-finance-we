import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronRight, BiSearchAlt2 } from "react-icons/bi";
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
import TableCateg from "@/components/tableCateg";

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

const Categoria = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<string>("");
  const [data, setData] = useState<IPropsTable[]>([]);
  const [dataOrign, setDataOrigin] = useState<IPropsTable[]>([]);
  const [date, setDate] = useState<any>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const listCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/get-categories", {
        date,
      });
      if (data.error) return message.error("Erro ao listar Categorias");
      setData(data.categories);
      setDataOrigin(data.categories);
      setTotal(data.total);
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (body: any) => {
    try {
      await api.post("auth/insert-category", {
        name: body.name,
        is_primary: true,
      });

      listCategories();

      message.success("Categoria cadastrada com sucesso");
    } catch (error) {
      message.error("Erro ao cadastrar Categoria");
    } finally {
      setOpen(!open);
      reset();
    }
  };

  const openModal = () => {
    setOpen(!open);
    reset();
  };

  useEffect(() => {
    listCategories();
  }, [date]);

  return (
    <Default title="Categorias">
      <Flex alignItems="center" fontSize="15px" mb="15px">
        <Text>Categorias</Text>
        <Icon as={BiChevronRight} fontSize="18px" color="white" />
        <Text color="gray.100"> Categoria</Text>
      </Flex>

      <Flex alignItems="center" mb="15px" justifyContent="space-between">
        <Flex alignItems="flex-end">
          <Text fontSize="25px" color="orange.500">
            <Text as="span" fontSize="15px" mr="10px">
              Total de categorias
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
              Exportar Categoria
            </Text>
          </Flex>
          <Button
            bg="orange.500"
            color="white"
            fontSize="15px"
            ml="20px"
            p="10px"
            onClick={() => openModal()}
          >
            Adicionar categoria
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
          <InputGroup bg="gray.200" borderRadius="4px" maxW="400px" mb="20px">
            <Input
              type="tel"
              placeholder="Pesquisar..."
              _placeholder={{
                color: "white.900",
              }}
              onChange={(evt) => {
                let value = evt.target.value;
                if (value == "") return setData(dataOrign);

                let newList = dataOrign.filter((item: any) =>
                  JSON.stringify(item)
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase())
                );
                setData([...newList]);
              }}
            />
            <InputRightElement>
              <Icon as={BiSearchAlt2} fontSize="25px" color="white.900" />
            </InputRightElement>
          </InputGroup>
          <TableCateg
            data={data}
            loading={loading}
            listCategories={() => listCategories()}
          />
        </Box>
      </Box>
      <DefaultModal
        onClose={setOpen}
        open={open}
        title="Adicionar Categoria"
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
                <Col span={24}>
                  <HookInput
                    {...register(`name`, {
                      required: "Campo obrigatório",
                    })}
                    label="Nome da categoria"
                    error={errors.name}
                    visibleLabel={true}
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

export default Categoria;

export const getServerSideProps = withSSRAuthRedirectOrganization(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
