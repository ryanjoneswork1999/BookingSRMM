import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

 const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
   return (
     <Layout>
       <Wrapper variant="small">
         <Flex align="center">
           <Heading>Login</Heading>
         </Flex>
         <Formik
           initialValues={{ usernameOrEmail: "", password: "" }}
           onSubmit={async (values, { setErrors }) => {
             const response = await login(values);
             if (response.data?.login.errors) {
               setErrors(toErrorMap(response.data.login.errors));
             } else if (response.data?.login.user) {
               if (typeof router.query.next === "string") {
                 router.push(router.query.next);
               } else {
                 router.push("/UserBookings");
               }
             }
           }}
         >
           {({ isSubmitting }) => (
             <Form>
               <InputField
                 name="usernameOrEmail"
                 placeholder="Email"
                 label="Email"
               />
               <Box mt={4}>
                 <InputField
                   name="password"
                   placeholder="password"
                   label="Password"
                   type="password"
                 />
               </Box>
               <Flex mt={2}>
                 <NextLink href="/register">
                   <Link mr={"auto"}>No Account?</Link>
                 </NextLink>
                 <NextLink href="/forgot-password">
                   <Link ml={"auto"}>forgot password?</Link>
                 </NextLink>
               </Flex>

               <Button
                 mt={4}
                 type="submit"
                 isLoading={isSubmitting}
                 colorScheme="teal"
               >
                 login
               </Button>
             </Form>
           )}
         </Formik>
       </Wrapper>
     </Layout>
   );
};

export default withUrqlClient(createUrqlClient)(Login);
