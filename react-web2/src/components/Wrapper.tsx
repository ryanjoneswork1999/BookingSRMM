import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
    variant?: WrapperVariant
}


export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }
  return (
    <Box mt={8} bg={bgColor} color={color} mx="auto" maxW={variant ==='regular' ? "800px" : "400px"} w="100%">
      {children}
    </Box>
  );
};
