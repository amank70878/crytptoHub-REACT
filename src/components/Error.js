import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";

const Error = ({ title }) => {
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize={["sm", "lg"]}>
          {title}
        </AlertTitle>
      </Alert>
    </>
  );
};

export default Error;
