import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  
  SimpleGrid,
  


} from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import {
  useDatebookingsQuery,
  useSearchPitchQuery,
  
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { UseIsAuth } from "../../utils/useIsAuth";
import NextLink from 'next/link';

const Booking = ({}) => {
  UseIsAuth();
    
  const router = useRouter();
  //Fetches sport pitch from url
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  //if(intId != -1){
  let date: any = "";
  //Fetches sport pitch from url
  const [{ data, fetching }] = useSearchPitchQuery({
    variables: {
      ID: intId,
    },
  });

  
  date = moment().format("DD/MM/YYYY");

  // const [ex2] = useIsitbookedQuery({
  //   variables:{
  //   sportpitchid:intId,
  //   RequestedOn:date
  //   }
  // })
  // const [ex2] = useIsitbookedQuery({
  //   variables:{
  //   sportpitchid:intId,
  //   RequestedOn:date
  //   }
  // })

  
  const [datebok] = useDatebookingsQuery({
    variables: {
      sportpitchid:intId,
      RequestedOn:date
    }
  })

  

  return (
    <Layout>
      <Flex align="center">
        <Heading>Sport Pitches</Heading>
      </Flex>
      {!data && fetching ? (
        <div>loading..</div>
      ) : (

        <SimpleGrid columns={2} spacing={5}>

            <Box w={"100%"}>
            
          {datebok.data?.datebookings.map((a) => (
          // <Box p={5} backgroundColor="lightgrey" shadow="md" borderWidth="2px">
          <NextLink href="/bookingdates/[id]/[date] "
                 as={`/bookingdates/${intId}/${moment(a.substring(0,10),"DD/MM/YYYY").format("DDMMYYYY")}`}
          >
      <Link ml='auto'>
      <Button
            as ={Link}
             bgColor={a.substring(13)}
             //color={a.bol ? "black" : "white"}
             w={"100%"}
              mb={2}
            >
              {intId}
              {a.substring(0,10)}
              
            </Button>
      </Link >
      
      </NextLink>
        /* </Box> */
            
            
            ))}
             </Box >  
            </SimpleGrid>
          
            



          

                
               
          // {datebok.data?.datebookings.map((a) => (

          //   <Box>
           
           
          //   <Button
          //   as ={Link}
          //    bgColor={a.substring(13)}
          //    //color={a.bol ? "black" : "white"}
          //    w={"100%"}
          //     mb={2}
          //   >
          //     {a.substring(0,10)}
              
          //   </Button>
          //    <NextLink href="/[id][date]"
          //           as={`/${intId}&${a.substring(0,10)}`}
          // ></NextLink> 
          //     </Box>
          //     ))}
            
          //   </Box>
          //   <Box >

          //     Date:{date}
          // {ex2.data?.isitbooked.map((b) => (
          //       <Button //onSubmit={async}
          //       bgColor={b.substring(19) ==="true" ? "red" : "green"}
          //        isDisabled={b.substring(19) === "true"}
          //        color={b.substring(19) ==="true" ? "black" : "white"}
          //         w={"100%"}
          //         mb={2}
          //       >
          //         {b.substring(0,19)}
            
          //       </Button>
          //     ))}
          //     </Box>
          
         
        
        
       
      )}
      {data ? <Flex></Flex> : null}
      
    </Layout>
  );
  // }
  // return (<div>Error</div>)
  //}
};

export default withUrqlClient(createUrqlClient)(Booking);
