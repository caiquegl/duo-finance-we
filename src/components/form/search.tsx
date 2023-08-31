import "@/styles/table.css";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { Select, Spin, SelectProps } from "antd";
import debounce from "lodash/debounce";
import api from "@/lib/axios";
import { Controller } from "react-hook-form";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Text,
} from "@chakra-ui/react";
import { LuAlertCircle } from "react-icons/lu";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,
  value,
  ...props
}: any) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching && <Spin size="small" />}
      popupClassName="selectSearch"
      className="ctnSelectSearch"
      {...props}
      options={options}
      style={{
        height: "2.5rem",
        width: "100%",
        borderRadius: "2px",
        color: "#white",
      }}
    >
      {/* {options.map((opt: any) => (
        <Option value={opt.value} key={opt.label} label={opt.label}>
          <Box>
            <p>{opt.label}</p>
          </Box>
        </Option>
      ))} */}
    </Select>
  );
}

interface Props {
  required?: string;
  name: string;
  path: string;
  label: string;
  control: any;
  disabled?: boolean;
  isMult?: boolean;
  visibleLabel?: boolean;
}
type InputProps = SelectProps<any> & Props;
export const Search: React.FC<InputProps> = ({
  name,
  path,
  isMult,
  required,
  label,
  control,
  visibleLabel,
}) => {
  const fetchUserList = async (text: string) => {
    try {
      let { data } = await api.post(`/auth/search`, {
        table: path,
        search: text.trim(),
      });
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? required : undefined,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} w="100%">
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
          {isMult ? (
            <DebounceSelect
              mode="multiple"
              value={value}
              fetchOptions={(text: string) => fetchUserList(text)}
              onChange={(a: any) => {
                onChange(a);
              }}
              style={{
                width: "100%",
              }}
            />
          ) : (
            <DebounceSelect
              showSearch
              value={value}
              fetchOptions={(text: string) => fetchUserList(text)}
              onChange={(a: any) => {
                console.log(a);
                onChange(a.value);
              }}
              style={{
                width: "100%",
              }}
            />
          )}
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
      )}
    />
  );
};

export const HookSearch = Search;
