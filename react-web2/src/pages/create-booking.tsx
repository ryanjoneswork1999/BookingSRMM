import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCreateBookingMutation,



  useSearchPitchQuery,
  useTotalOpenQuery
} from "../generated/graphql";
import { bookingFieldError } from "../utils/bookingFieldError";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isBooked } from "../utils/isBooked";

interface registerProps {}
//import React  from 'react';

  const  createBooking: React.FC<registerProps> = ({}) => {
  const router = useRouter();
   const val = Number(router.query.Pitch);

   let time:any="", timeAhead:any="", date:any=""
   
   const total3: any[] = [];
   let it=0

   const total4:any[]=[]
   const total5:any[]=[]

  

  //Fetches sport pitch from url
  const [{ data, fetching }] = useSearchPitchQuery({
    variables: {
      ID: Number(router.query.Pitch),
    },
  });


  const [ex] = useTotalOpenQuery({
    variables: { ID: Number(router.query.Pitch)},
  });
  
  if(!fetching && data !== undefined){

    it = Number(ex.data?.totalOpen)
    

   date = moment().format("DD/MM/YYYY");

  //Converts pitches string into times to do conversions on
   time = moment(data?.searchPitch.StartTime, "HH:mm:ss").format("HH:mm:ss");

   timeAhead = moment(data?.searchPitch.StartTime, "HH:mm:ss").format(
    "HH:mm:ss"
  );





  


  
  if (!ex.fetching) {
    
    
    let i = 0;

    while ( i < it) {
      timeAhead = moment(timeAhead, "HH:mm:ss").add(1, "h").format("HH:mm:ss");
      var ans
      
      ans = Boolean(isBooked(time,timeAhead,val,date))
      
      total3[i] = { ex: time, ex2: timeAhead, bol:ans};

      total4[i] = time
      total5[i]=timeAhead
      time = moment(time, "HH:mm:ss").add(1, "h").format("HH:mm:ss");

      i++;
    }
  }
}
  

  const [, createBookingNew] = useCreateBookingMutation();
  return (
    <Layout>
      <Formik
        initialValues={{
          RequestedOn: "",
          StartTime: "",
          EndTime: "",
          sportpitchid: 1,
          statusid: 1,
        }}
        onSubmit={async (booking, { setErrors }) => {
          const response = await createBookingNew({ booking: booking });
          console.log(response);
          if (response.data?.createBookingNew.errors) {
            setErrors(bookingFieldError(response.data.createBookingNew.errors));
          } else if (response.data?.createBookingNew.bookingk) {
            //worked
            router.push("/UserBookings");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box w="100%">
              {total3.map((a) => (
                <Button key={a.id}
                 
                  w="100%"
                  mb={2}
                >
                  {a.ex} - {a.ex2}{" "}
                </Button>
              ))}
            </Box>
            <Box
              p={5}
              backgroundColor="lightgrey"
              shadow="md"
              borderWidth="2px"
            >
              <Text mt={4}>Requested On: {data?.searchPitch.name}</Text>
              <Text mt={4}>Start Time: {data?.searchPitch.StartTime}</Text>
              <Text mt={4}> End Time: {data?.searchPitch.EndTime}</Text>
              <Text mt={4} mb={4}>
                {" "}
                SportPitch: {data?.searchPitch.pricePerHour}
              </Text>
              <Text mt={4} mb={4}>
                {" "}
                Time: {}
              </Text>
            </Box>

            <Box mt={4}>
              <InputField
                name="RequestedOn"
                placeholder="RequestedOn"
                label="RequestedOn"
              />
              <InputField
                name="StartTime"
                placeholder="StartTime"
                label="StartTime"
              />
              <InputField
                name="EndTime"
                placeholder="EndTime"
                label="EndTime"
              />
              <InputField
                name="sportpitchid"
                placeholder="sportpitchid"
                label="sportpitchid"
                type="number"
              />
              <InputField
                name="statusid"
                placeholder="statusid"
                label="statusid"
                type="number"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create booking
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient,{ ssr: true })(createBooking);
  