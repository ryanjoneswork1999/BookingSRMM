import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
 




function MyApp({ Component, pageProps }: any) {
  return(
    <ThemeProvider theme={theme}>
      <CSSReset/>
      <Component{...pageProps}/>
    </ThemeProvider>
  )
  // return (
  //   <Provider value={client}>
  //     <ChakraProvider resetCSS theme={theme}>
  //       <ColorModeProvider
  //         options={{
  //           useSystemColorMode: true,
  //         }}
  //       >
  //         <Component {...pageProps} />
  //       </ColorModeProvider>
  //     </ChakraProvider>
  //   </Provider>
  // );
}

export default MyApp;
