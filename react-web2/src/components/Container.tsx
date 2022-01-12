import { Box, Flex } from '@chakra-ui/react'


export const Container: React.FC=  ({...props}) => {
  
  
  return (
    <>
      <Box h="100%">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          {...props}
        />
      </Box>
    </>
  );
}




