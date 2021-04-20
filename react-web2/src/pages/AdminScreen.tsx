import { Box, Flex, Grid, GridItem, Heading, Link, SimpleGrid, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { Layout } from "../components/Layout";
import { useAdminScreenQuery, useListPitchesQuery, useListSpecificBookingsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UseIsAuth } from "../utils/useIsAuth";


const AdminScreen = () => {

    
    UseIsAuth();
    
   //moment(time).add(1, 'hour')
   const [{ data, fetching}] = useListPitchesQuery({
    
    
});
   console.log(data?.listPitches.length)

const [{data:EX}] = useAdminScreenQuery({
    variables:{
        RequestedOn:"20/04/2021"
    }
})
    console.table(EX)
    if(!fetching && !data){
      return <div>no posts</div>
    }

 let num = Number(data?.listPitches.length)

 num = num +1

 let time=0

    return (
        <Layout>
          <Flex align='center'> 
            <Heading>My Bookings Page</Heading>
        <NextLink href="/SportPitches">
          <Link ml='auto'>
          create booking
          </Link >
          </NextLink>
          </Flex>
          {!data && fetching? (
            <div>loading..</div>
          ) : (
    //         <Stack spacing={8}>

                
    // <Box  p={5} d={"inline-block"} shadow="md" borderWidth="2px">
    //         {data!.listPitches.map((p) => (
               
          
    //       <Text d={"inline-block"} m={4}>Name: {p.name }</Text>
         
            
            
    //         ))}
    //             {EX?.AdminScreen.map((p) => (
                    
    //                     <Text d={"inline-block"} m={4}> {p +""}</Text>
                       
    //                 ))
    //             }

                
          
    //          </Box>
    //         </Stack>
    <>
    {/* <SimpleGrid columns={num } spacing={1}>
    {EX?.AdminScreen.map((p) => (
     p.map((e) => (
      <Box bg={e.substring(0,6) === "white" ? "grey" : "green"} height="80px">{e.substring(0,6) === "white" ? "" : e.substring(8)}</Box>
     ))
  
    )
    )
}
    
  </SimpleGrid> */}
  <Grid
  h="200px"
  gap={1}
  //templateRows="repeat(2, 1fr)"
  templateColumns="repeat(2, 1fr)"
  
>
{EX?.AdminScreen.map((p,index) => (
     p.map((e,num) => (
       
       
      <GridItem gridRow={num+1} gridColumn={index+1} bg={e.substring(0,6) === "white" ? "grey" : "green"} height="80px">{e.substring(0,6) === "white" ? "" : e.substring(8)} + {"column: "+index + " row: "+ num}</GridItem>
      
      
     ))
     
      
    )
  
    )
    
}
 
</Grid>


    

  </>
          )}
          {data ? <Flex >
       
        </Flex> : null}
        </Layout>
      );
    };

   
    export default withUrqlClient(createUrqlClient)(AdminScreen);