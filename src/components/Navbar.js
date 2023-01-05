import { Button, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <HStack
        gap={[0, 2]}
        bgColor={"blackAlpha.900"}
        px={4}
        py={3}
        position="sticky"
        top="0"
        zIndex="100"
      >
        <Heading fontSize={["m", "2xl"]} color={"whiteAlpha.800"} mr={[3, 10]}>
          CryptoHub
        </Heading>
        <Button
          variant={"unstyled"}
          fontSize={["sm", "lg"]}
          color={"whiteAlpha.800"}
          p={0}
        >
          <Link to={"/"}>Home</Link>
        </Button>
        <Button
          variant={"unstyled"}
          fontSize={["sm", "lg"]}
          color={"whiteAlpha.800"}
          p={0}
        >
          <Link to={"/coins"}>Coins</Link>
        </Button>
        <Button
          variant={"unstyled"}
          fontSize={["sm", "lg"]}
          color={"whiteAlpha.800"}
          p={0}
        >
          <Link to={"/exchanges"}>Exchanges</Link>
        </Button>
      </HStack>
    </>
  );
};

export default Navbar;
