import React from "react";
import { Container } from "./Container";
import { NavBar } from "./NavBar";
import {  Wrapper, WrapperVariant } from "./Wrapper";

interface layoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
    <NavBar/>
    <Container >
    
    <Wrapper  variant={variant}>
      {children}
    </Wrapper>
    </Container>
    </>
  
  );
};