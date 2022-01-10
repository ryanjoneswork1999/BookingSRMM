import { Box, Button, Flex, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { DarkModeSwitch } from "./LightDarkButton";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode } = useColorMode()
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  
  const router = useRouter();
  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  const color = { light: 'black', dark: 'white' }
  let body = null;
  //data is loading
  if (fetching) {
    body = null;
  } //user not loged in
  else if (!data?.me) {
    body = (
      <>
      <NextLink href="/index">
          <Link color="white" >
            Home
          </Link>
        </NextLink>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
    //user logged in
  } else {
    body = (
      <>
      

      <Box bg={bgColor[colorMode]} d={"flex-block"} color={color[colorMode]} >
       < NextLink  href="/UserBookings">
          <Link  >
            <Button as={Link} to="UserBookings">Home</Button>
            
          </Link>
        </NextLink>
      </Box>
      <Flex>
        
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
              logout().finally(() => {
                router.reload();
              });
          }}
            isLoading={logoutFetching}
            
          varient="link"
        >
          logout
        </Button>
        <DarkModeSwitch />
      </Flex>
      </>
    );
  }
  return (
    <Flex bg={bgColor[colorMode]} d={"row"} color={color[colorMode]}   >
      <Box bg={bgColor[colorMode]}  color={color[colorMode]} ml={"auto"}>{body}
     
      </Box>
    </Flex>
  );
};
