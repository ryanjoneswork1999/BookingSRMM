import { Box, Flex, Heading,  Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useListSpecificBookingsQuery } from "../generated/graphql";
import { withApollo } from "../utils/Apollo";
import { UseIsAuth } from "../utils/useIsAuth";


const UserBookings = () => {

    
    UseIsAuth();
    
    const { data, loading} = useListSpecificBookingsQuery({
    
    });
    
    
    if(!loading && !data){
      return <div>no posts</div>
    }


    return (
        <Layout>
          <Flex align='center'> 
            <Heading>My Bookings Page</Heading>
        
          </Flex>
          {!data && loading? (
            <div>loading..</div>
          ) : (
            <Stack spacing={8}>

            {data!.listSpecificBookings.map((p) => (
          
          <Box key={p.booking.id} p={5} borderWidth="2px">
          <Text mt={4}>Requested On: {p.booking.RequestedOn}</Text>
          <Text mt={4}>Start Time: {p.booking.StartTime}</Text>
          <Text mt={4}> End Time: {p.booking.EndTime}</Text>
          <Text mt={4} mb={4}> SportPitch: {p.booking.sportPitchi.name}</Text>
        </Box>
            
            
            ))}
            </Stack>
          )}
          {data ? <Flex >
       
        </Flex> : null}
        </Layout>
      );
    };

   
    export default withApollo({ ssr: false })(UserBookings);