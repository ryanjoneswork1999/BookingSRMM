import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,


} from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import {
  useDatebookingsQuery,
  useIsitbookedQuery,
  useSearchPitchQuery,
  
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { UseIsAuth } from "../../utils/useIsAuth";

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

  const [ex2] = useIsitbookedQuery({
    variables:{
    sportpitchid:intId,
    RequestedOn:date
    }
  })

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

            
              <Box >
          {datebok.data?.datebookings.map((a) => (
                <Button
                 bgColor={a.substring(13)}
                 //color={a.bol ? "black" : "white"}
                 w={"100%"}
                  mb={2}
                >
                  {a.substring(0,10)}
                  
                </Button>
              ))}
            </Box>

            <Box >
          {ex2.data?.isitbooked.map((b) => (
                <Button
                bgColor={b.substring(19) ==="true" ? "red" : "green"}
                 isDisabled={b.substring(19) === "true"}
                 color={b.substring(19) ==="true" ? "black" : "white"}
                  w={"100%"}
                  mb={2}
                >
                  {b.substring(0,19)}
            
                </Button>
              ))}
              </Box>
          
          </SimpleGrid>
        
        
       
      )}
      {data ? <Flex></Flex> : null}
      
    </Layout>
  );
  // }
  // return (<div>Error</div>)
  //}
};

export default withUrqlClient(createUrqlClient)(Booking);
