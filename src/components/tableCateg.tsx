import React, { useState } from "react";
import { DataTable } from "./dataTable";
import { Box, Button, Icon, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DefaultModal } from "./defaultModal";
import { Col, Row, message } from "antd";
import { HookInput } from "./form/input";
import api from "@/lib/axios";
import { IoIosAddCircleOutline } from "react-icons/io";

interface IPropsTableCateg {
  data: any[];
  loading: any;
  listCategories: any;
}

const TableCateg = ({ data, loading, listCategories }: IPropsTableCateg) => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;

  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<any>({});

  const openModal = (val: any) => {
    setOpen(!open);
    reset();
    setSelect(val);
  };

  const onRegister = async (body: any) => {
    try {
      await api.post("auth/insert-category", {
        name: body.name,
        is_primary: false,
        sub_category: select.id,
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

  return (
    <>
      <DataTable
        columns={[
          {
            title: "Nome",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Valor gasto",
            dataIndex: "value_total",
            key: "value_total",
            render: (value) =>
              value
                ? value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00",
          },
          {
            title: "Valor pela categoria",
            dataIndex: "value_category",
            key: "value_category",
            render: (value) =>
              value
                ? value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00",
          },
          {
            title: "#",

            render: (value, record) => (
              <Icon
                as={IoIosAddCircleOutline}
                fontSize="20px"
                cursor="pointer"
                color="orange.500"
                onClick={() => openModal(record)}
              />
            ),
          },
        ]}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <Box>
              <Text color="white.700" fontWeight="bold">
                Categoria - {record.name}
              </Text>
              <TableCateg
                listCategories={listCategories}
                data={record.expand}
                loading={loading}
              />
            </Box>
          ),
          rowExpandable: (record) => record.expand && record.expand.length > 0,
        }}
        loading={loading}
      />
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
    </>
  );
};

export default TableCateg;
