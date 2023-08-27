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
  Text,
} from "@chakra-ui/react";
import React from "react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { LuAlertCircle } from "react-icons/lu";

interface IProps extends InputProps {
  error: any;
  name: string;
  label: string;
  mask?: string;
  visibleLabel?: boolean;
  textTransform?: any;
  inputRightElement?: any;
  typeInput?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  {
    visibleLabel,
    name,
    label,
    error,
    mask,
    textTransform,
    inputRightElement,
    typeInput,
    ...rest
  },
  ref
) => {
  return (
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
        <Input
          id={name}
          ref={ref}
          name={name}
          placeholder={`${label}`}
          mask={mask || ""}
          _hover={{ borderColor: "green.200" }}
          textTransform={textTransform}
          bg="green.700"
          type={typeInput}
          borderColor="green.700"
          borderRadius="2px"
          _placeholder={{
            color: "white.900",
          }}
          {...rest}
        />
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
  );
};

export const HookInput = forwardRef(InputBase);
