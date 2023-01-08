import {
  Box,
  Button,
  Container,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Coins from "../components/Coins";
import Loader from "../components/Loader";

const Exchanges = () => {
  const toggleSuccessToast = useRef(null);
  const toast = useToast();
  const [apiDataState, setApiDataState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchCoinsFunc = async () => {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      setApiDataState(data);
      setLoadingState(false);
      toggleSuccessToast.current.click(); 
    };
    fetchCoinsFunc();
  }, []);
  return (
    <>
      <Container p="0" maxW={["100vw", "85vw"]}>
        <Text textAlign={"center"} py="20px" fontSize={["small", "xl"]}>
          Crypto Exchanges
        </Text>
        <Box
          display="flex"
          flexDirection={"row"}
          flexWrap="wrap"
          alignItems={"center"}
          justifyContent="space-evenly"
        >
          {loadingState ? (
            <Loader message="Fetching Crypto Exchanges......." />
          ) : (
            apiDataState.map((items, indexK) => {
              indexK++;
              return (
                <Coins
                  key={indexK}
                  country={items.country}
                  image={items.image}
                  name={items.name}
                  Erank={items.trust_score}
                  url={items.url}
                  imgSizeW={["70px", "60px"]}
                  imgSizeH={["70px", "60px"]}
                  year_established={items.year_established}
                />
              );
            })
          )}
        </Box>
        <Wrap display="none">
          <WrapItem>
            <Button
              ref={toggleSuccessToast}
              onClick={() =>
                toast({
                  title: `your exchanges loaded successfully `,
                  status: "success",
                  isClosable: true,
                  variant: "left-accent",
                  duration: 1000,
                })
              }
            ></Button>
          </WrapItem>
        </Wrap>
      </Container>
    </>
  );
};

export default Exchanges;
