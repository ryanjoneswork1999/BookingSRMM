
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Heading,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

import {useApolloClient } from "@apollo/client"


export default function nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
 
    const { colorMode, toggleColorMode } = useColorMode();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const ApolloClient = useApolloClient()
	const { data, loading } = useMeQuery({
		skip: isServer(),
	});

	
	// const bgColor = { dark: "gray.900", light: "white" };

	// const color = { dark: "white", light: "black" };
	let body = null;
	//data is loading
    if (loading) {
        body = null;
    } //user not loged in
    else if (!data?.me) {
        body = (
          <>
            <Box px={4} borderBottom="2px solid #6495ED">
              <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <IconButton
                  size={"md"}
                  icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  aria-label={"Open Menu"}
                  display={{ md: "none" }}
                  onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                  <Box>
                    <Heading>Ryan's Portfolio</Heading>
                  </Box>
                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                  >
                    <NextLink href="/SportPitches">
                      <Link ml={2}>Available Pitches</Link>
                    </NextLink>
                  </HStack>
                </HStack>
                <Flex alignItems={"center"}>
                  <Button onClick={toggleColorMode} mr={2}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://www.flaticon.com/premium-icon/ai_2814666?term=robot&page=1&position=5&page=1&position=5&related_id=2814666&origin=tag"
                        }
                      />
                    </MenuButton>

                    <MenuList>
                      <Center>
                        <p>Unkown</p>
                      </Center>
                      <br />
                      <NextLink href="/login">
                        <MenuItem>Login</MenuItem>
                      </NextLink>
                      <NextLink href="/register">
                        <MenuItem>Register</MenuItem>
                      </NextLink>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>

              {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                  <Stack as={"nav"} spacing={4}>
                    <NextLink href="/SportPitches">
                      <Link className="nav-link">Available Pitches</Link>
                    </NextLink>
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </>
        );
    } else {
         body = (
           <>
             <Box px={4} borderBottom="2px solid #6495ED">
               <Flex
                 h={16}
                 alignItems={"center"}
                 justifyContent={"space-between"}
               >
                 <IconButton
                   size={"md"}
                   icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                   aria-label={"Open Menu"}
                   display={{ md: "none" }}
                   onClick={isOpen ? onClose : onOpen}
                 />
                 <HStack spacing={8} alignItems={"center"}>
                   <Box>
                     <Heading>Ryan's Portfolio</Heading>
                   </Box>
                   <HStack
                     as={"nav"}
                     spacing={4}
                     display={{ base: "none", md: "flex" }}
                   >
                     <NextLink href="/SportPitches">
                       <Link ml={2}>Create Booking</Link>
                     </NextLink>
                     <NextLink href="/UserBookings">
                       <Link ml={2}>My Bookings</Link>
                     </NextLink>
                   </HStack>
                 </HStack>
                 <Flex alignItems={"center"}>
                   <Button onClick={toggleColorMode} mr={2}>
                     {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                   </Button>
                   <Menu>
                     <MenuButton
                       as={Button}
                       rounded={"full"}
                       variant={"link"}
                       cursor={"pointer"}
                       minW={0}
                     >
                       <Avatar
                         size={"sm"}
                         src={
                           "https://cdn-icons-png.flaticon.com/512/3662/3662817.png"
                         }
                       />
                     </MenuButton>

                     <MenuList>
                       <Center>
                         <p>{data.me.username}</p>
                       </Center>
                       <br />
                       <NextLink href="/UserBookings">
                         <MenuItem>My Bookings</MenuItem>
                       </NextLink>
                       <MenuDivider />

                       <MenuItem
                         onClick={() => {
                           logout().finally(() => {
                             ApolloClient.resetStore()
                           });
                         }}
                         isLoading={logoutFetching}
                         varient="link"
                       >
                         Logout
                       </MenuItem>
                     </MenuList>
                   </Menu>
                 </Flex>
               </Flex>

               {isOpen ? (
                 <Box pb={4} display={{ md: "none" }}>
                   <Stack as={"nav"} spacing={4}>
                     <NextLink href="/SportPitches">
                       <Link>Available Pitches</Link>
                     </NextLink>
                     <NextLink href="/UserBookings">
                       <Link>My Bookings</Link>
                     </NextLink>
                   </Stack>
                 </Box>
               ) : null}
             </Box>
           </>
         );
    }
  return (
    <Flex d={"row"} >
      
        {body}
    </Flex>
  );
}
