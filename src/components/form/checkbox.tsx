import { Checkbox, CheckboxProps, Text } from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

interface IProps extends CheckboxProps {
  required?: string;
  name: string;
  label: string;
  control: any;
  disabled?: boolean;
}

export const HookCheckBox = ({
  control,
  name,
  label,
  required,
  disabled,
  ...rest
}: IProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? required : undefined,
      }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <Checkbox
          size="lg"
          colorScheme="green.200"
          onChange={onChange}
          isChecked={value}
          {...rest}
        >
          <Text fontSize="15px">{label}</Text>
        </Checkbox>
      )}
    />
  );
};
