
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { withApollo } from "../utils/Apollo";
import { toErrorMap } from "../utils/toErrorMap";

 const Login: React.FC<{}> = () => {
   const router = useRouter();
  const [login] = useLoginMutation();
   return (
     <Layout>
       <Wrapper variant="small">
         <Flex align="center">
           <Heading>Login</Heading>
         </Flex>
         <Formik
           initialValues={{ usernameOrEmail: "", password: "" }}
           onSubmit={async (values, { setErrors }) => {
            // await ApolloClient.clearStore()
             const response = await login({
               variables: values,
            
               update: (cache, { data }) => {
                 cache.writeQuery<MeQuery>({
                   query: MeDocument,
                   data: {
                     __typename: "Query",
                     me: data?.login.user,
                   },
                 });
               },
             });
             if (response.data?.login.errors) {
               setErrors(toErrorMap(response.data.login.errors));
             } else if (response.data?.login.user) {
              
               if (typeof router.query.next === "string") {
                 console.log("REACHED 1");
                 router.push(router.query.next);
               } else {
                 console.log("REACHED 2")
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

export default withApollo({ ssr: false })(Login);
