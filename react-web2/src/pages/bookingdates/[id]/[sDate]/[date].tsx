import {
  Box,
  Button,

  Flex,
  Heading,
  Link,
  SimpleGrid,
  useDisclosure
} from "@chakra-ui/react";

import moment from "moment";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../../components/Layout";
import {
  useCreateBookingMutation,
  useDatebookingsQuery,
  useIsitbookedQuery,
  useSearchPitchQuery
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { UseIsAuth } from "../../../../utils/useIsAuth";

const datebookings = ({}) => {

  UseIsAuth();

  
  
  

  const router = useRouter();
  
 // router.beforePopState
  React.useEffect(()=>{
    window.addEventListener('popstate', (event) => {
      //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      router.reload()
    });
    
  })
  //Fetches sport pitch from url



  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const datecho =
    typeof router.query.date === "string"
      ? String(router.query.date)
      : moment().format("DD/MM/YYYY");



  const sDate =
  typeof router.query.date === "string"
    ? String(router.query.sDate)
    : moment().format("DD/MM/YYYY");
  //if(intId != -1){
  let date1 = moment(datecho, "DDMMYYYY").format("DD/MM/YYYY");
  // let date: any = "";

  //Fetches sport pitch from url
  const [{ data, fetching }] = useSearchPitchQuery({
    variables: {
      ID: intId,
    },
  });

  let tDate = moment().format("DD/MM/YYYY")

  let date = sDate

  
  // const [ex2] = useIsitbookedQuery({
  //   variables:{
  //   sportpitchid:intId,
  //   RequestedOn:date
  //   }
  // })
  const [ex2] = useIsitbookedQuery({
    variables: {
      sportpitchid: intId,
      RequestedOn: date1,
    },
  });

 

  console.log(ex2);

  const [datebok] = useDatebookingsQuery({
    variables: {
      sportpitchid: intId,
      RequestedOn: date,
    },
  });


  const [, createBookingNew] = useCreateBookingMutation();
  return (
    <Layout>
      <Flex align="center">
        <Heading>Booking Dates & Times <br></br> </Heading>
      </Flex>
      {!data && fetching ? (
        <div>loading..</div>
      ) : (
        
        <SimpleGrid columns={2} spacing={5}>
          <Box w={"100%"}>
            {datebok.data?.datebookings.map((a) => (
              // <Box p={5} backgroundColor="lightgrey" shadow="md" borderWidth="2px">
              <NextLink
                href="/bookingdates/[id]/[sDate]/[date]"
                as={`/bookingdates/${encodeURIComponent(intId)}/${encodeURIComponent(sDate)}/${encodeURIComponent(moment(
                  a.substring(0, 10),
                  "DD/MM/YYYY"
                ).format("DD/MM/YYYY"))}`}
              >
                <Link ml="auto">
                  <Button
                    as={Link}
                    bgColor={a.substring(13)}
                    //color={a.bol ? "black" : "white"}
                    w={"100%"}
                    mb={2}
                  >
                    {a.substring(0, 10)}
                  </Button>
                </Link>
              </NextLink>
            ))}

               
            <NextLink href="/bookingdates/[id]/[sDate]/[date] "
                 as={`/bookingdates/${encodeURIComponent(intId)}/${encodeURIComponent(moment(date,"DD/MM/YYYY").add(7,"d").format("DD/MM/YYYY"))}/${encodeURIComponent(moment(date,"DD/MM/YYYY").add(7,"d").format("DD/MM/YYYY"))}`}
          >
            
      <Link ml='auto' >
      <Button 
      
      isDisabled={sDate === tDate ? false : true}
      onClick={async()=>{
                    {Link}
                  }
                    } >+7</Button>
      </Link >
      
      </NextLink> 

      {/* Second Button for taking away  */}
      <NextLink href="/bookingdates/[id]/[sDate]/[date] "
                 as={`/bookingdates/${encodeURIComponent(intId)}/${encodeURIComponent(moment(date,"DD/MM/YYYY").subtract(7,"d").format("DD/MM/YYYY"))}/${encodeURIComponent(moment(date,"DD/MM/YYYY").add(7,"d").format("DD/MM/YYYY"))}`}
          >
            
      <Link ml='auto' >
      <Button 
      
      isDisabled={sDate === tDate ? true : false}
      onClick={async()=>{
                    {Link}
                  }
                    } >-7</Button>
      </Link >
      
      </NextLink> 
          </Box>

          <Box>
            {ex2.data?.isitbooked.map((b) => (
              
              <NextLink
              
              href="/bookingsummary/[id]/[date]/[time]"
              as={`/bookingsummary/${encodeURIComponent(intId)}/${encodeURIComponent(moment(
                date1,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY"))}/${encodeURIComponent((b.substring(0,8)))+ encodeURIComponent((b.substring(11,19)))}`}
            >
              <Link isDisabled={b.substring(19) === "true"}>
                <Button 
                  isDisabled={b.substring(19) === "true"}
                  
                  onClick={async()=>{
                    {Link}
                  }
                    }
                  bgColor={b.substring(19) === "true" ? "red" : "green"}
                  
                  color={b.substring(19) === "true" ? "black" : "white"}
                  w={"100%"}
                  mb={2}
                >
                  {b.substring(0, 19)}
                </Button>
                </Link>
                </NextLink>
            ))}
          </Box>
        </SimpleGrid>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(datebookings);
