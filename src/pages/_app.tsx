import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "@/styles/table.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <ChakraProvider theme={theme}>
        {/* <StyledComponentsRegistry>
          {" "} */}
        <Component {...pageProps} />
        {/* </StyledComponentsRegistry> */}
      </ChakraProvider>
    </ConfigProvider>
  );
}

export default MyApp;
