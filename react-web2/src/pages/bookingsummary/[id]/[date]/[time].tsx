import { Badge, Box, Icon, Stack } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../../components/Layout";
import { useSearchPitchQuery } from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";
import { UseIsAuth } from "../../../../utils/useIsAuth";

const bookingsummary = ({}) => {

UseIsAuth();


  const router = useRouter();

  
  //Fetches sport pitch from url
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const datecho =
    typeof router.query.date === "string"
      ? String(router.query.date)
      : moment().format("DD/MM/YYYY");

      let date1 = moment(datecho, "DDMMYYYY").format("DD/MM/YYYY");

      const time =
    typeof router.query.date === "string"
      ? String(router.query.time)
      : "-1"

      const [{ data, fetching }] = useSearchPitchQuery({
        variables: {
          ID: intId,
        },
      });

    let sTime = moment(time.substring(0,6),"HHmmss").format("HH:mm:ss")
    let eTime = moment(time.substring(6,12),"HHmmss").format("HH:mm:ss")

return (
    <Layout>
    <Box maxW="lg" borderWidth="1px" rounded="lg" alignContent="center" overflow="hidden">
    <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="teal">
            Booking Details: 
          </Badge>
          <Box
            color="black"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            textTransform="uppercase"
            ml="2"
          >
           <br></br>&bull; Name: {data?.searchPitch.name} &bull; <br></br> &bull; Price: £{data?.searchPitch.pricePerHour} &bull;
           <br></br> &bull; RequestedOn: {date1} &bull; <br></br> &bull; Start Time:{sTime} &bull;<br></br>  &bull; EndTime: {eTime} &bull; <br></br> 
          </Box>
        </Box>

    
        </Box>
        </Box>
        </Layout>
)
}
export default withUrqlClient(createUrqlClient)(bookingsummary);