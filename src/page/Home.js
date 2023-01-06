import {
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Box,
  Stat,
  StatHelpText,
  StatArrow,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Error from "../components/Error";
import Loader from "../components/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";

const Home = () => {
  // const [chartArrayState, setChartArrayState] = useState("");
  // const [daysForChart, setDaysForChart] = useState("24h");
  const [finalArrayState, setFinalArrayState] = useState("");
  const [currencyState, setCurrencyState] = useState("usd");
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [errorCodeState, setErrorCodeState] = useState("");
  const [errorNameState, setErrorNameState] = useState("");

  useEffect(() => {
    const fetchTrendingCoinFunc = async () => {
      try {
        // for 7 trending coingecko's coin
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/search/trending`
        );

        // for detailed info of each coin
        let sampleArr = [];
        for (let index = 0; index < 7; index++) {
          const sample = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${data.coins[index].item.id}`
          );
          sampleArr.push([sample]);
        }
        setFinalArrayState(sampleArr);
        setLoadingState(false);

        // for chart info of every coin
        // let sampleChartArr = [];
        // for (let index = 0; index < 7; index++) {
        //   const { data: chartData } = await axios.get(
        //     `https://api.coingecko.com/api/v3/coins/${data.coins[index].item.name}/market_chart?vs_currency=${currencyState}&days=${daysForChart}`
        //   );
        //   sampleChartArr.push([chartData.prices]);
        // }
        // setChartArrayState(sampleArr);
      } catch (error) {
        setErrorState(true);
        setLoadingState(false);
        setErrorCodeState(error.code);
        setErrorNameState(error.name);
      }
    };
    fetchTrendingCoinFunc();
  }, [currencyState]);

  return (
    <>
      {!errorState ? (
        <Error
          title={`Warning (${errorNameState}) : ${errorCodeState}`}
          description={
            "there is some issue in fetching Api's Server please try again later"
          }
        />
      ) : (
        <VStack width="100vw">
          <Box overflow="hidden">
            <Carousel
              className="carousel"
              infiniteLoop
              autoPlay
              showStatus={false}
              interval={2000}
              emulateTouch={true}
              showThumbs={true}
            >
              <div>
                <img
                  width="60vw"
                  height="40vh"
                  src="https://cdn.pixabay.com/photo/2018/01/18/07/31/bitcoin-3089728_960_720.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  width="60vw"
                  height="40vh"
                  src="https://img.freepik.com/free-vector/digital-bitcoin-glowing-background-design_1017-31511.jpg?w=1380&t=st=1673027892~exp=1673028492~hmac=538262114eb6cf83532ea4d4047969803f35ebeb2d490fcc137c8375e0177c68"
                  alt=""
                />
              </div>
              <div>
                <img
                  width="60vw"
                  height="40vh"
                  src="https://img.freepik.com/premium-vector/bitcoin-crypto-currency-flying-up-represent-uptrend-futuristic-concept_73426-577.jpg?w=1380"
                  alt=""
                />
              </div>
              <div>
                <img
                  width="60vw"
                  height="40vh"
                  src="https://img.freepik.com/free-vector/cryptocurrency-blockchain-ethereum-3d-isometric-physical-ethereum-coin-with-wireframe-chain-block-chain-concept-editable-template-stock-vector-illustration_597744-31.jpg?w=1380&t=st=1673028059~exp=1673028659~hmac=4edc7aab62d0c08679bf55183bb251ea358eba1a9aeb7db29f8a919c3eabf29e"
                  alt=""
                />
              </div>
            </Carousel>
          </Box>

          {/* garph heading */}
          <HStack justifyContent="space-between" w="90vw">
            <Heading
              py="2"
              fontSize={["sm", "2xl"]}
              fontWeight={["500", "600"]}
            >
              Cryptocurrency Prices with CoinGecko API
            </Heading>

            <HStack
              gap={3}
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              position="relative"
              px="2"
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
          </HStack>

          {/* table of trending coins section  */}
          {loadingState ? (
            <Box
              display="flex"
              flexDirection={"row"}
              flexWrap="wrap"
              alignItems={"center"}
              justifyContent="space-evenly"
            >
              <Loader message="Fetching Trending coins......." />
            </Box>
          ) : (
            <TableContainer px={["0", "10"]}>
              <Table
                variant="unstyled"
                colorScheme="lightgray"
                w={["100vw", "90vw"]}
              >
                <Thead>
                  <Tr py="2" bgColor="#00000018">
                    <Th
                      fontSize={["2xs", "md"]}
                      display="flex"
                      alignItems="center"
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      # <Text ml={["3", "5"]}>Coin</Text>
                    </Th>
                    <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      Price
                    </Th>
                    <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      1h
                    </Th>
                    <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      24h
                    </Th>
                    <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      7d
                    </Th>
                    <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      Mkt. Cap R
                    </Th>
                    {/* <Th
                      fontSize={["2xs", "md"]}
                      isNumeric
                      textTransform="capitalize"
                      fontWeight="500"
                    >
                      Chart
                    </Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {finalArrayState &&
                    finalArrayState.map((itemsData, index) => {
                      index++;
                      return (
                        <>
                          <Tr
                            key={index}
                            transition={"all 300ms "}
                            borderBottom="1px solid #2b2b2b14"
                            css={{
                              "&:hover": {
                                boxShadow: "1px 1px 14px 0px #00000018",
                                transform: "scale(1.01, 1.1)",
                                background: "#00000018",
                                border: "none",
                              },
                            }}
                          >
                            {/* name */}
                            <Td>
                              <HStack>
                                {/* index */}
                                <Text
                                  px="1"
                                  fontSize={["2xs", "md"]}
                                  color="blackAlpha.800"
                                  fontWeight="500"
                                  cursor="pointer"
                                >
                                  #{index}
                                </Text>
                                <Image
                                  ml={["3", "5"]}
                                  src={itemsData[0].data.image.large}
                                  w={["20px", "40px"]}
                                  borderRadius="50%"
                                />
                                {/* name */}
                                <Text
                                  px={["", "1"]}
                                  fontSize={["xs", "md"]}
                                  fontWeight="500"
                                  cursor="pointer"
                                >
                                  {itemsData[0].data.name}
                                </Text>
                                {/* symbol */}
                                <Text
                                  px={["0", "1"]}
                                  fontSize={["2xs", "sm"]}
                                  color="blackAlpha.800"
                                  fontWeight="500"
                                  cursor="pointer"
                                >
                                  {itemsData[0].data.symbol}
                                </Text>
                              </HStack>
                            </Td>

                            {/* price */}
                            <Td>
                              <Heading
                                fontSize={["2xs", "md"]}
                                cursor="pointer"
                              >
                                {currencyState === "inr"
                                  ? "₹"
                                  : currencyState === "usd"
                                  ? "$"
                                  : "€"}
                                {
                                  itemsData[0].data.market_data.current_price[
                                    currencyState
                                  ]
                                }
                              </Heading>
                            </Td>

                            {/* 1h */}
                            <Td
                              isNumeric
                              fontSize={["2xs", "md"]}
                              color={
                                itemsData[0].data.market_data
                                  .price_change_percentage_1h_in_currency[
                                  currencyState
                                ] > 0
                                  ? "green"
                                  : "red"
                              }
                            >
                              <Stat>
                                <StatHelpText>
                                  <StatArrow
                                    w="3"
                                    mr="5px"
                                    type={
                                      itemsData[0].data.market_data
                                        .price_change_percentage_1h_in_currency[
                                        currencyState
                                      ] > 0
                                        ? "increase"
                                        : "decrease"
                                    }
                                  />
                                  {
                                    itemsData[0].data.market_data
                                      .price_change_percentage_1h_in_currency[
                                      currencyState
                                    ]
                                  }
                                </StatHelpText>
                              </Stat>
                            </Td>

                            {/* 24h data */}
                            <Td
                              isNumeric
                              fontSize={["2xs", "md"]}
                              color={
                                itemsData[0].data.market_data
                                  .price_change_percentage_24h_in_currency[
                                  currencyState
                                ] > 0
                                  ? "green"
                                  : "red"
                              }
                            >
                              <Stat>
                                <StatHelpText>
                                  <StatArrow
                                    w="3"
                                    mr="5px"
                                    type={
                                      itemsData[0].data.market_data
                                        .price_change_percentage_24h_in_currency[
                                        currencyState
                                      ] > 0
                                        ? "increase"
                                        : "decrease"
                                    }
                                  />
                                  {
                                    itemsData[0].data.market_data
                                      .price_change_percentage_24h_in_currency[
                                      currencyState
                                    ]
                                  }{" "}
                                </StatHelpText>
                              </Stat>
                            </Td>

                            {/* 7d */}
                            <Td
                              isNumeric
                              fontSize={["2xs", "md"]}
                              color={
                                itemsData[0].data.market_data
                                  .price_change_percentage_7d_in_currency[
                                  currencyState
                                ] > 0
                                  ? "green"
                                  : "red"
                              }
                            >
                              <Stat>
                                <StatHelpText>
                                  <StatArrow
                                    w="3"
                                    mr="5px"
                                    type={
                                      itemsData[0].data.market_data
                                        .price_change_percentage_7d_in_currency[
                                        currencyState
                                      ] > 0
                                        ? "increase"
                                        : "decrease"
                                    }
                                  />
                                  {
                                    itemsData[0].data.market_data
                                      .price_change_percentage_7d_in_currency[
                                      currencyState
                                    ]
                                  }{" "}
                                </StatHelpText>
                              </Stat>
                            </Td>

                            {/* rank */}
                            <Td
                              isNumeric
                              fontSize={["2xs", "md"]}
                              fontWeight={["400", "500"]}
                            >
                              {itemsData[0].data.market_cap_rank}
                            </Td>

                            {/* graph */}
                            {/* <Td>
                              <Chart
                                arr={finalArrayState}
                                currency={currencyState}
                                days={daysForChart}
                              />
                              chart
                            </Td> */}
                          </Tr>
                        </>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </VStack>
      )}
    </>
  );
};

export default Home;
