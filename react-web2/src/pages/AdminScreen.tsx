import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
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
  
const [{data:EX}] = useAdminScreenQuery({
    variables:{
        RequestedOn:"20/04/2021"
    }
})
    console.table(EX)
    if(!fetching && !data){
      return <div>no posts</div>
    }


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
            <Stack spacing={8}>

                
    <Box  p={5} d={"inline-block"} shadow="md" borderWidth="2px">
            {data!.listPitches.map((p) => (
               
          
          <Text d={"inline-block"} m={4}>Name: {p.name }</Text>
         
            
            
            ))}
                {EX?.AdminScreen.map((p) => (
                    
                        <Text d={"inline-block"} m={4}> {p +""}</Text>
                       
                    ))
                }

                
          
             </Box>
            </Stack>
          )}
          {data ? <Flex >
       
        </Flex> : null}
        </Layout>
      );
    };

   
    export default withUrqlClient(createUrqlClient)(AdminScreen);