import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/Apollo';




 const ForgotPassword: React.FC<{}> = ({}) => {
     const [complete, setComplete] = useState(false);
     const [forgotPassword] = useForgotPasswordMutation();

   return (
     <Layout>
       <Wrapper variant="small">
         <Flex align="center">
           <Heading>Forgot Password</Heading>
         </Flex>
         <Formik
           initialValues={{ email: "" }}
           onSubmit={async (values) => {
             await forgotPassword({variables: values });
             setComplete(true);
           }}
         >
           {({ isSubmitting }) =>
             complete ? (
               <Box>An email has been sent, if the account is valid</Box>
             ) : (
               <Form>
                 <Box mt={4}>
                   <InputField
                     name="email"
                     placeholder="email"
                     label="Email"
                     type="email"
                   />
                 </Box>

                 <Button
                   mt={4}
                   type="submit"
                   isLoading={isSubmitting}
                   colorScheme="teal"
                 >
                   forgot password
                 </Button>
               </Form>
             )
           }
         </Formik>
       </Wrapper>
     </Layout>
   );
};


export default withApollo({ ssr: false })(ForgotPassword)