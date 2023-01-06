import { Button, Heading, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchInputState, setSearchInputState] = useState("");
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        px={4}
        py={3}
        position="sticky"
        top="0"
        zIndex="100"
        bgColor={"blackAlpha.900"}
        w="full"
      >
        <HStack gap={[0, 2]}>
          <Link to={"/"}>
            <Heading
              fontSize={["sm", "2xl"]}
              color={"whiteAlpha.800"}
              mr={[0, 10]}
            >
              CryptoHub
            </Heading>
          </Link>

          <Button
            variant={"unstyled"}
            fontSize={["xs", "lg"]}
            color={"whiteAlpha.800"}
            p={0}
          >
            <Link to={"/coins"}>Coins</Link>
          </Button>
          <Button
            variant={"unstyled"}
            fontSize={["xs", "lg"]}
            color={"whiteAlpha.800"}
            p={0}
          >
            <Link to={"/exchanges"}>Exchanges</Link>
          </Button>
        </HStack>
        <HStack
          w={["50%", "30%"]}
          borderRadius="8px"
          border={["1px solid white", "2px solid white"]}
        >
          <Input
            variant={"unstyled"}
            value={searchInputState}
            onChange={(e) => setSearchInputState(e.target.value)}
            w="full"
            border="none"
            color="white"
            outline={"none"}
            px={["1", "3"]}
            py={["0", "1"]}
          />
          <Link
            to={`/coins/${searchInputState}`}
            onClick={() => setSearchInputState("")}
          >
            <SearchIcon
              style={{
                margin: "0 5px",
                marginBottom: "-5px",
                padding: "4px 4px 4px 4px",
                color: "white",
                fill: "currentcolor",
                fontWeight: "900",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Link>
        </HStack>
      </HStack>
    </>
  );
};

export default Navbar;
