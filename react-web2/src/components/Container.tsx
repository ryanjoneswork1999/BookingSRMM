import { Flex, useColorMode } from '@chakra-ui/react'


export const Container: React.FC=  ({...props}) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }
  return (
      
    <Flex
    height="100vh"
       direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
    
  )
}




