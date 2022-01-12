// import { extendTheme } from '@chakra-ui/react'
// import React from 'react'
// import { Flex, useColorMode } from "@chakra-ui/react";
// const fonts = { mono: `'Menlo', monospace` }

// import { createBreakpoints } from "@chakra-ui/theme-tools"


//  const { colorMode } = useColorMode();

//  const bgColor = { light: "white", dark: "gray.900" };

//  const color = { light: "black", dark: "white" };
 
// const breakpoints = createBreakpoints({
//  sm: "30em",
// md: "48em",
// lg: "62em",
//  xl: "80em",
//  })


// const theme = extendTheme(
//   {
  
//   styles: {
//     global: {

//       body: {
//         bg: bgColor[colorMode],
//         color: color[colorMode]
//       },
//       colors: {
//         black: "#16161D",
//       },
//     }
//   },

//   fonts,
//   breakpoints,
//   icons: {
//     logo: {
//       path: (
//         <svg
//           width="3000"
//           height="3163"
//           viewBox="0 0 3000 3163"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="3000" height="3162.95" fill="none" />
//           <path
//             d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
//             fill="currentColor"
//           />
//         </svg>
//       ),
//       viewBox: "0 0 3000 3163",
//     },
//   },
// });

// export default theme
// theme.ts

// 1. import `extendTheme` function

import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme
