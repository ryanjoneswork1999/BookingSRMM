import React from "react";
import Nav from "./Nav";
import { Container } from "./Container";

import {  Wrapper, WrapperVariant } from "./Wrapper";

interface layoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
    <Nav/>
    <Container >
    
    <Wrapper variant={variant}>
      {children}
    </Wrapper>
    </Container>
    </>
  
  );
};