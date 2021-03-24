import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { Layout } from "../components/Layout";
import { useListPitchesQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import moment from 'moment'

const SportPitch = () => {

  
  let time = moment('15:00:00',"HH:mm:ss").add(1,'h').format("HH:mm:ss")

  let time2 = moment('10:00:00',"HH:mm:ss").format("HH:mm:ss")
 
  let time3 = moment(time,"HH").subtract(time2,"h").format("HH")

  let time4 = moment(time3,"HH").subtract(1,"h").format("H")
    //moment(time).add(1, 'hour')
    const [{ data, fetching}] = useListPitchesQuery({
    
    });
  
    
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
              
          <Box key={p.id} p={5} backgroundColor="lightgrey" shadow="md" borderWidth="2px">
          <Text mt={4}>Name: {p.name}</Text>
          <Text mt={4}>time: {time4}</Text>
          <Text mt={4}>{moment(p.StartTime,"hh:mm:ss").format("hh:mm:ss")}</Text>
          <Text mt={4}>Available From: {p.StartTime} - {p.EndTime}</Text>
          <Text mt={4} mb={4}> Price Per Hour: £{p.pricePerHour}</Text>
          <NextLink href={{
            pathname: '/create-booking',
            query: { Pitch: p.id },
          }}>
      <Link ml='auto'>
      <Button>Select</Button>
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