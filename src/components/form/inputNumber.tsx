import {
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputProps,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Controller } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";

interface IProps extends InputProps {
  error: any;
  name: string;
  label: string;
  visibleLabel?: boolean;
  textTransform?: any;
  inputRightElement?: any;
  control?: any;
}

const InputBase = ({
  visibleLabel,
  name,
  label,
  error,
  textTransform,
  inputRightElement,
  control,
  ...rest
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Campo obrigatório" }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <>
          <FormControl isInvalid={!!error}>
            {visibleLabel && (
              <Text
                fontSize="16px"
                fontWeight="bold"
                color="white"
                mb="8px"
                opacity={0.74}
              >
                {label}
              </Text>
            )}
            <InputGroup>
              <NumberInput
                precision={2}
                id={name}
                ref={ref}
                name={name}
                w="100%"
                valueAsNumber={value}
                onChange={(value: any, valueAsNumber: any) =>
                  onChange(valueAsNumber)
                }
                placeholder={`${label}`}
                _hover={{ borderColor: "green.200" }}
                bg="green.700"
                borderColor="green.700"
                borderRadius="2px"
                _placeholder={{
                  color: "white.900",
                }}
                {...rest}
              >
                <NumberInputField />
              </NumberInput>
              {inputRightElement ? inputRightElement : null}
            </InputGroup>

            {!!error && (
              <Flex
                borderWidth="1px"
                borderRadius="2px"
                color="red"
                alignItems="center"
                px="10px"
                mt="8px"
                borderColor="red"
              >
                <Icon as={LuAlertCircle} color="red" fontSize="18px" />
                <FormErrorMessage mb="8px" ml="5px">
                  {error?.message?.toString()}
                </FormErrorMessage>
              </Flex>
            )}
          </FormControl>
        </>
      )}
    />
  );
};

export const HookInputNumber = forwardRef(InputBase);
