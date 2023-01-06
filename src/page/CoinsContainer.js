import {
  Box,
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Coins from "../components/Coins";
import Error from "../components/Error";
import Loader from "../components/Loader";

const CoinsContainer = () => {
  const toggleSuccessToast = useRef(null);
  const toast = useToast();
  const [apiData, setApiData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [errorCodeState, setErrorCodeState] = useState("");
  const [errorNameState, setErrorNameState] = useState("");
  const [currencyState, setCurrencyState] = useState("usd");

  useEffect(() => {
    const fetchCoinsFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyState}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        setApiData(data);
        setLoadingState(false);
        toggleSuccessToast.current.click();
      } catch (error) {
        setErrorState(true);
        setLoadingState(false);
        setErrorCodeState(error.code);
        setErrorNameState(error.name);
      }
    };
    fetchCoinsFunc();
  }, [currencyState]);
  return (
    <>
      {errorState ? (
        <Error
          title={`Warning (${errorNameState}) : ${errorCodeState}`}
          description={
            "there is some issue in fetching Api's Server please try again later"
          }
        />
      ) : (
        <Container p="0" pt="20px" maxW={["100vw", "100vw", "85vw"]}>
          <HStack
            gap={3}
            display="flex"
            flexDirection={["column", "row"]}
            justifyContent="center"
            alignItems={"center"}
            mb="10px"
          >
            <RadioGroup
              px="4"
              value={currencyState}
              onChange={setCurrencyState}
            >
              <HStack gap={2}>
                <Radio value="inr">₹INR</Radio>
                <Radio value="usd">$USD</Radio>
                <Radio value="eur">€EUR</Radio>
              </HStack>
            </RadioGroup>
          </HStack>
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
              apiData.map((items) => {
                return (
                  <Coins
                    Ckey={items.id}
                    price={items.current_price}
                    image={items.image}
                    name={items.name}
                    totalSupply={items.total_supply}
                    symbol={items.symbol}
                    Crank={items.market_cap_rank}
                    lastUpdate={items.last_updated}
                    imgSizeW={["70px", "90px"]}
                    imgSizeH={["70px", "90px"]}
                    CcurrencyState={currencyState}
                    CoinsContainerByME={true}
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
                    title: `your Coins loaded successfully`,
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
      )}
    </>
  );
};

export default CoinsContainer;
