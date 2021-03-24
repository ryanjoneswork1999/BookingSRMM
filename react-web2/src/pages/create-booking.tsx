import { Box, Button,Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateBookingMutation, useCreatePostMutation, useListPitchesQuery, useSearchPitchQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { bookingFieldError } from "../utils/bookingFieldError";
import { UseIsAuth } from "../utils/useIsAuth";
import moment from 'moment'
interface registerProps {}
//import React  from 'react';


const createBooking: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    UseIsAuth();
    
    
     
     //Fetches sport pitch from url
     const [{ data, fetching }] = useSearchPitchQuery({
      variables:{ 
        ID:Number(router.query.Pitch)
      }
     })

     //returns error 
     if(!fetching && !data){
      return <div>Error </div>
    }

    //Converts pitches string into times to do conversions on
    let time = moment(data?.searchPitch.StartTime,"HH:mm:ss").format("HH:mm:ss")

    let timeAhead = moment(data?.searchPitch.StartTime,"HH:mm:ss").add(1,"h").format("HH:mm:ss")

    let time2 = moment(data?.searchPitch.EndTime,"HH:mm:ss").format("HH:mm:ss")
   
    let time3 = Number(moment(time2,"HH").subtract(time,"h").format("H"))

   
    const total3: any[] =[]
  
    for (let i = 0; i < time3; i++) {
      
      
      total3[i]={"ex":time,"ex2":timeAhead}

      time=moment(time,"HH:mm:ss").add(1,'h').format("HH:mm:ss")
      timeAhead=moment(time,"HH:mm:ss").add(1,'h').format("HH:mm:ss")

    }

    

    const [, createBookingNew] = useCreateBookingMutation();
    return (

      
      
        
      <Layout>
        <Formik
          initialValues={{ RequestedOn: "", StartTime: "", EndTime: "", sportpitchid: 1, statusid:1}}
          onSubmit={async (booking, {setErrors}) => {
            const response = await createBookingNew({booking: booking});
            console.log(response)
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

          { total3.map((a) => (
          
            <Button m={4} block>{a.ex} - {a.ex2}</Button>
          
          )
          )
          }
          <Box p={5} backgroundColor="lightgrey" shadow="md" borderWidth="2px">
          <Text mt={4}>Requested On: {data?.searchPitch.name}</Text>
          <Text mt={4}>Start Time: {data?.searchPitch.StartTime}</Text>
          <Text mt={4}> End Time: {data?.searchPitch.EndTime}</Text>
          <Text mt={4} mb={4}> SportPitch: {data?.searchPitch.pricePerHour}</Text>
          <Text mt={4} mb={4}> Time: {time3}</Text>
        </Box>
            
            
            
                <Box mt={4}>
              <InputField name="RequestedOn" placeholder="RequestedOn" label="RequestedOn" />
              <InputField name="StartTime" placeholder="StartTime" label="StartTime" />
              <InputField name="EndTime" placeholder="EndTime" label="EndTime" />
              <InputField name="sportpitchid" placeholder="sportpitchid" label="sportpitchid"type="number" />
              <InputField name="statusid" placeholder="statusid" label="statusid" type="number"/>
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
  export default withUrqlClient(createUrqlClient)(createBooking);