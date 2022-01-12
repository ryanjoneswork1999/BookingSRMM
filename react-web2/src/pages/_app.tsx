import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import React from "react";

import theme from "../theme";





function MyApp({ Component, pageProps}) {


  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider resetCSS theme={theme}>
        
          
          <Component {...pageProps} />

        
      </ChakraProvider>
      </ThemeProvider>
  );
}

export default MyApp ;
