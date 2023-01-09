import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Heading,
  HStack,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ColorModeScript from "./ColorModeSwitcher";
import axios from "axios";
import { useDispatch } from "react-redux";

const DrawerContainer = () => {
  // redux here
  const dispatch = useDispatch();

  // drower here
  const { onClose } = useDisclosure();
  const [searchInputState, setSearchInputState] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // for fetching all currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
        );
        setCurrencies(data);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchCurrencies();
  }, []);

  // for dispatching current currencies
  const setCurrencyFunc = (e) => {
    dispatch({
      type: "currencyType",
      payload: e.target.outerText,
    });
  };
  return (
    <>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <ColorModeScript />
        </DrawerHeader>

        <DrawerBody>
          <HStack
            display={["flex", "none"]}
            w="100%"
            borderRadius="8px"
            border="2px solid grey"
          >
            <Input
              variant={"unstyled"}
              value={searchInputState}
              onChange={(e) => setSearchInputState(e.target.value)}
              w="full"
              border="none"
              outline="none"
              px="3"
              py="1"
              placeholder="Search Here"
              css={{
                "&::placeholder": {
                  fontWeight: "600",
                },
              }}
            />
            <Link
              to={`/coins/${searchInputState}`}
              onClick={() => {
                setSearchInputState("");
                onClose();
              }}
            >
              <SearchIcon
                style={{
                  margin: "0 5px",
                  marginBottom: "-5px",
                  padding: "4px 4px 4px 4px",
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
          <Heading
            py="3"
            pt="5"
            fontWeight={["500", "600"]}
            fontSize={["md", "lg"]}
            letterSpacing={[".6px", "1px"]}
          >
            Currencies
          </Heading>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {currencies &&
              currencies.map((items) => {
                return (
                  <Text
                    key={items}
                    bgColor="#6d6d6d14"
                    w="48%"
                    cursor="pointer"
                    fontSize={["md", "lg"]}
                    py={["1", ""]}
                    transition="all 200ms"
                    my="5px"
                    textAlign="center"
                    borderRadius="10px"
                    value={items}
                    css={{
                      "&:hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                    onClick={(e) => {
                      setCurrencyFunc(e);
                      onClose();
                    }}
                  >
                    {items}
                  </Text>
                );
              })}
            {currencies.length === 0 && (
              <Text fontSize={["md", "lg"]} m="10px" textAlign="center">
                fetching....
              </Text>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </>
  );
};

export default DrawerContainer;
