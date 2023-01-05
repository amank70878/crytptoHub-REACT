import { Box, Container, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Coins from "../components/Coins";
import Error from "../components/Error";
import Loader from "../components/Loader";

const Exchanges = () => {
  const [apiDataState, setApiDataState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [errorCodeState, setErrorCodeState] = useState("");
  const [errorNameState, setErrorNameState] = useState("");

  useEffect(() => {
    const fetchCoinsFunc = async () => {
      try {
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/exchanges"
        );
        setApiDataState(data);
        setLoadingState(false);
      } catch (error) {
        setErrorState(true);
        setLoadingState(false);
        console.log(error);
        setErrorCodeState(error.code);
        setErrorNameState(error.name);
      }
    };
    fetchCoinsFunc();
  }, []);
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
              apiDataState.map((items) => {
                return (
                  <Coins
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
        </Container>
      )}
    </>
  );
};

export default Exchanges;
