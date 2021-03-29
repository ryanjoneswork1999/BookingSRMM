import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
import {
  useIsitbookedQuery,
  useSearchPitchQuery,
  useTotalOpenQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isBooked } from "../../utils/isBooked";

const Booking = ({}) => {
  const router = useRouter();
  //Fetches sport pitch from url
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  //if(intId != -1){
  let time: any = "",
    timeAhead: any = "",
    time2: any = "",
    time3: any,
    date: any = "";
  //Fetches sport pitch from url
  const [{ data, fetching }] = useSearchPitchQuery({
    variables: {
      ID: intId,
    },
  });

  const [ex] = useTotalOpenQuery({
    variables: { ID: intId },
  });
  date = moment().format("DD/MM/YYYY");

  const [ex2] = useIsitbookedQuery({
    variables:{
    sportpitchid:intId,
    RequestedOn:date
    }
  })

  let it = Number(ex.data?.totalOpen);

  const total3: any[] = [];

  //if(!ex.fetching && ex.data && data && !fetching) {



  //Converts pitches string into times to do conversions on
  time = moment(data?.searchPitch.StartTime, "HH:mm:ss").format("HH:mm:ss");

  timeAhead = moment(data?.searchPitch.StartTime, "HH:mm:ss").format(
    "HH:mm:ss"
  );

  time2 = moment(data?.searchPitch.EndTime, "HH:mm:ss").format("HH:mm:ss");

  time3 = moment(time2, "H").subtract(time, "h").format("H");

  
   
    for(let i=0;i< it;i++){
    timeAhead = moment(timeAhead, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
    
    total3[i] = { ex: time, ex2: timeAhead, bol: ex2.data?.isitbooked[i] };

    time = moment(time, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

    }
  

  return (
    <Layout>
      <Flex align="center">
        <Heading>Sport Pitches</Heading>
      </Flex>
      {!data && fetching ? (
        <div>loading..</div>
      ) : (

        <Flex align="center">
          <Box width="100%">
          {total3.map((a) => (
                <Button key={a.id}
                 isDisabled={a.bol}
                  w="100%"
                  mb={2}
                >
                  {a.ex} - {a.ex2}{" "}
                </Button>
              ))}
          </Box>
        <Stack width="100%" spacing={8}>
          <Box p={5} backgroundColor="lightgrey" shadow="md" borderWidth="2px">
            <Text mt={4}>Requested On: {data?.searchPitch.name}</Text>
            <Text mt={4}>Start Time: {data?.searchPitch.StartTime}</Text>
            <Text mt={4}> End Time: {data?.searchPitch.EndTime}</Text>
            <Text mt={4} mb={4}>
              {" "}
              SportPitch: {data?.searchPitch.pricePerHour}
            </Text>
            <Text mt={4} mb={4}>
              {" "}
              Time: {ex.data?.totalOpen}
            </Text>
          </Box>
        </Stack>
        </Flex>
      )}
      {data ? <Flex></Flex> : null}
      
    </Layout>
  );
  // }
  // return (<div>Error</div>)
  //}
};

export default withUrqlClient(createUrqlClient)(Booking);
