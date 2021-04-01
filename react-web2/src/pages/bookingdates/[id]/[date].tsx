import { Box, Button, Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import {
  useDatebookingsQuery,
  useIsitbookedQuery,
  useSearchPitchQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { UseIsAuth } from "../../../utils/useIsAuth";
import NextLink from "next/link";
import { parseValue } from "graphql";

const datebookings = ({}) => {
  UseIsAuth();

  const router = useRouter();
  //Fetches sport pitch from url
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    
  
  const datecho =
    typeof router.query.date === "string"
      ? String(router.query.date)
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

  let date = moment().format("DD/MM/YYYY");

  console.log(date)
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

  console.log(ex2)

  const [datebok] = useDatebookingsQuery({
    variables: {
      sportpitchid: intId,
      RequestedOn: date,
    },
  });

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
              <NextLink
                href="/bookingdates/[id]/[date]"
                as={`/bookingdates/${intId}/${moment(
                  a.substring(0, 10),
                  "DD/MM/YYYY"
                ).format("DDMMYYYY")}`}
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
              /* </Box> */
            ))}
          </Box>

          <Box>
            {ex2.data?.isitbooked.map((b) => (
              <Button //onSubmit={async}
                bgColor={b.substring(19) === "true" ? "red" : "green"}
                isDisabled={b.substring(19) === "true"}
                color={b.substring(19) === "true" ? "black" : "white"}
                w={"100%"}
                mb={2}
              >
                {b.substring(0, 19)}
              </Button>
            ))}
          </Box>
        </SimpleGrid>

        // <Box >

        // {datebok.data?.datebookings.map((a) => (

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
        //
        //     ))}

        //   </Box>
      )}
      {data ? <Flex></Flex> : null}
    </Layout>
  );
  // }
  // return (<div>Error</div>)
  //}
};

export default withUrqlClient(createUrqlClient)(datebookings);
