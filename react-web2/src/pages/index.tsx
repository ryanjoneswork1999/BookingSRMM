import React from "react";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
import { withApollo } from "../utils/Apollo";

const Index = () => {
  const { data, loading}= usePostsQuery({
    variables:{
      limit:10,
    }
  });

  if(!loading && !data){
    return <div>no posts</div>
  }
 
  return (
    <Layout >
      <Flex align='center'> 
        <Heading>Ryans Page</Heading>
    <NextLink href="/create-post">
      <Link ml='auto'>
      create post
      </Link >

      </NextLink>
      <NextLink href="/SportPitches">
      <Link ml='auto'>
      create booking
      </Link >
      
      </NextLink>

      <NextLink href="/UserBookings">
      <Link ml='auto'>
      My Bookings
      </Link >
      
      </NextLink>
      </Flex>
      {!data && loading? (
        <div>loading..</div>
      ) : (
        <Stack spacing={8}>
        {data!.posts.map((p) => (
        
        <Box key={p.id} p={5} shadow="md" borderWidth="2px" >
      <Heading fontSize="xl">{p.name}</Heading>
      <Text mt={4}>{p.textSnippet.slice(0,50)}</Text>
    </Box>
        
        
        ))}
        </Stack>
      )}
      {data ? <Flex >
    <Button isLoading={loading} m='auto'my={8}>load more</Button>
    </Flex> : null}
    </Layout>
  );
};
export default withApollo ({ ssr: true })(Index);
