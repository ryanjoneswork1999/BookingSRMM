import { ChakraProvider, ColorModeProvider, CSSReset, ThemeProvider, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Provider } from "urql";
import theme from "../theme";
 




function MyApp({ Component, pageProps }: any) {

  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }
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

export default MyApp;
