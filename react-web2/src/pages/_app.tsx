import { ChakraProvider, ColorModeProvider, ThemeProvider, useColorMode } from "@chakra-ui/react";
import React from "react";

import theme from "../theme";
 




function MyApp({ Component, pageProps}) {

  const { colorMode } = useColorMode()

  
  // return(
  //   <ThemeProvider theme={theme}>

  //     <CSSReset/>
  //     <Component{...pageProps}/>
  //   </ThemeProvider>
  // )
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
        
          options={{
            useSystemColorMode: false,
           initialColorMode:colorMode
          }}
        >
          
          <Component {...pageProps} />
        </ColorModeProvider>
        
      </ChakraProvider>
      </ThemeProvider>
  );
}

export default MyApp ;
