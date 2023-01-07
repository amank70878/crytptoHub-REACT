import React from "react";
import { Container, Spinner } from "@chakra-ui/react";

const Loader = ({ message = "loading", marginTop = "200px" }) => {
  return (
    <>
      <Container
        mt={marginTop}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize={["xs", "xl"]}
        fontWeight={"400"}
        letterSpacing=".3px"
      >
        <Spinner
          my="10px"
          thickness={["2px", "3px"]}
          speed="0.45s"
          emptyColor="gray.200"
          color="blue.400"
          size={["lg", "lg"]}
        />
        {message}
      </Container>
    </>
  );
};

export default Loader;
