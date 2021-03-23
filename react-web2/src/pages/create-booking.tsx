import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateBookingMutation, useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { bookingFieldError } from "../utils/bookingFieldError";
import { UseIsAuth } from "../utils/useIsAuth";

interface registerProps {}

const createBooking: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    UseIsAuth();
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