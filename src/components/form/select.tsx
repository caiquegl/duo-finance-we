import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Select as Inpt,
  Text,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Controller } from "react-hook-form";

interface InpuptProps {
  label?: string;
  opt: any;
  defaultValue?: any;
  control?: any;
  change?: any;
  name: string;
  visibleLabel?: boolean;
}
const InputBase: ForwardRefRenderFunction<HTMLSelectElement, InpuptProps> = (
  {
    label,
    opt,
    defaultValue,
    control,
    name,
    change,
    visibleLabel,
    ...rest
  }: any,
  ref: any
) => {
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
          <FormControl>
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
              <Inpt
                id={name}
                name={name}
                ref={ref}
                placeholder={`${label}`}
                _hover={{ borderColor: "green.200" }}
                value={value}
                required
                bg="green.700"
                borderColor="green.700"
                borderRadius="2px"
                _placeholder={{
                  color: "white.900",
                }}
                onChange={(evt) => {
                  onChange(evt);
                  if (change) change(evt.target.value);
                }}
              >
                {opt &&
                  opt.map((list: any) => (
                    <option value={list.value} key={list.value}>
                      {list.label}
                    </option>
                  ))}
              </Inpt>
            </InputGroup>
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
          </FormControl>
        </>
      )}
    />
  );
};

export const HookSelect = forwardRef(InputBase);
