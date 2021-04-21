import { Flex, Grid, GridItem, Heading, Link } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import React from "react";
import { Layout } from "../components/Layout";
import { useAdminScreenQuery, useListPitchesQuery } from "../generated/graphql";
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

 const total: String[] =[]

 var maxTime=0
 for(let i = 0; i < Number(data?.listPitches.length); i++){
  
  
  let time2 = Number(moment(data?.listPitches[i]?.StartTime, "HH:mm:ss").format("H"));
  let time = Number(moment(data?.listPitches[i]?.EndTime, "HH:mm:ss").format("H"));

  var temp = time-time2

  if (temp>maxTime){
    maxTime=temp
  }

 }

 let sTime = moment("09:00:00", "HH:mm:ss").format("HH:mm:ss");
 let eTime = moment("09:00:00", "HH:mm:ss").format("HH:mm:ss");

 for(let i=0; i< 11 ; i++){

  eTime = moment(eTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

   total[i] = sTime + " - " + eTime

   sTime = moment(sTime, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
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
  h="50px"
  gap={1}
  //templateRows="repeat(2, 1fr)"
  templateColumns="repeat(3, 1fr)"
  
>
  {
    total.map((p, val) => (
      <GridItem gridRow={val+1} gridColumn={1} bg={"red"} height="50px">{p}</GridItem>
    )
      
    )
  }
{EX?.AdminScreen.map((p,index) => (
     p.map((e,num) => (
       
       
      <GridItem gridRow={num+1} gridColumn={index+2} bg={e.substring(0,6) === "white" ? "grey" : "green"} height="50px">{e.substring(0,6) === "white" ? "" : e.substring(8)} + {"column: "+index + " row: " + num} { num ===0 ? e : ""}</GridItem>
      
      
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