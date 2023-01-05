import React from "react";
import { Container, Spinner } from "@chakra-ui/react";

const Loader = ({ message = "loading" }) => {
  return (
    <>
      <Container
        mt="30vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize={["xs", "xl"]}
        fontWeight={"400"}
        letterSpacing=".3px"
      >
        <Spinner
          mb="30px"
          thickness={["2px", "3px"]}
          speed="0.45s"
          emptyColor="gray.200"
          color="blue.400"
          size={["lg", "xl"]}
        />
        {message}
      </Container>
    </>
  );
};

export default Loader;
