import { Col, Row } from "antd";
import React from "react";
import { HookInput } from "./form/input";
import { HookSelect } from "./form/select";
import { RiSubtractLine } from "react-icons/ri";
import { Center, Icon } from "@chakra-ui/react";
import { HookInputNumber } from "./form/inputNumber";

interface IProps {
  categ: any;
  errors: any;
  register: any;
  control: any;
  index: number;
  sub(): void;
}

const AddExit = ({ categ, errors, register, control, index, sub }: IProps) => {
  return (
    <Row gutter={[20, 20]} style={{ width: "100%" }}>
      <Col span={6}>
        <HookInput
          {...register(`name-${index}`, {
            required: "Campo obrigatório",
          })}
          label="Nome"
          error={errors.name}
          visibleLabel={true}
        />
      </Col>
      <Col span={5}>
        <HookInput
          {...register(`qtd-${index}`, {
            required: "Campo obrigatório",
          })}
          type="number"
          label="Quantidade"
          error={errors.qtd}
          visibleLabel={true}
        />
      </Col>
      <Col span={6}>
        <HookInputNumber
          control={control}
          name={`value-${index}`}
          visibleLabel={true}
          label="Valor"
          type="number"
          error={errors.value}
        />
      </Col>
      <Col span={6}>
        <HookSelect
          control={control}
          name={`category-${index}`}
          label="Categoria"
          visibleLabel={true}
          opt={categ}
        />
      </Col>
      <Col span={1}>
        <Center h="100%">
          <Icon
            onClick={() => sub()}
            as={RiSubtractLine}
            color="red.100"
            fontSize="17px"
            cursor="pointer"
          />
        </Center>
      </Col>
    </Row>
  );
};

export default AddExit;