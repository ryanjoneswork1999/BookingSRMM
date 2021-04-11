import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { Layout } from "../components/Layout";
import { useListPitchesQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import moment from 'moment'

const SportPitch = () => {

  
  let date = moment().format("DD/MM/YYYY");
  
    //moment(time).add(1, 'hour')
    const [{ data, fetching}] = useListPitchesQuery({
    
    });
  
    console.log(encodeURIComponent(date))
    if(!fetching && !data){
      return <div>no posts</div>
    }


    return (
      
        <Layout>
          <Flex align='center'> 
            <Heading>Sport Pitches</Heading>
        <NextLink href="/create-booking">
          <Link ml='auto'>
          create booking
          </Link >
          </NextLink>
          </Flex>
          {!data && fetching? (
            <div>loading..</div>
          ) : (
            <Stack spacing={8}>

                
            {data!.listPitches.map((p) => (
              
          <Box key={p.id} p={5}  shadow="md" borderWidth="2px">
          <Text mt={4}>Name: {p.name}</Text>
          <Text mt={4}>Available From: {p.StartTime} - {p.EndTime}</Text>
          <Text mt={4} mb={4}> Price Per Hour: £{p.pricePerHour}</Text>
          <NextLink href="/bookingdates/[id]/[sDate]/[date] "
                 as={`/bookingdates/${encodeURIComponent(p.id)}/${encodeURIComponent( moment(date,"DD/MM/YYYY").format("DD/MM/YYYY"))}/${encodeURIComponent( moment(date,"DD/MM/YYYY").format("DD/MM/YYYY"))}`}
          >
            
      <Link ml='auto'>
      <Button as ={Link}>Select</Button>
      </Link >
      
      </NextLink>
        </Box>
            
            
            ))}
            </Stack>
          )}
          {data ? <Flex >
       
        </Flex> : null}
        </Layout>
      );
    };

   
    export default withUrqlClient(createUrqlClient)(SportPitch);