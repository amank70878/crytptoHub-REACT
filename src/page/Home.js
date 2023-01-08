import {
  Heading,
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
  Box,
  StatHelpText,
  StatArrow,
  RadioGroup,
  Radio,
  Button,
  FormControl,
  HStack,
  Input,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useDisclosure,
  Drawer,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Loader from "../components/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import DrawerContainer from "../components/DrawerContainer";

const Home = () => {
  // drawer here
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // redux here
  const { currencyReduxState } = useSelector((state) => state.currencyStore);
  console.log(`home currencyState ${currencyReduxState}`);
  const dispatch = useDispatch();

  // fetching table content
  const [finalArrayState, setFinalArrayState] = useState("");
  const [currencyState, setCurrencyState] = useState(currencyReduxState);
  console.log(`home currencyState ${currencyState}`);
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {
    const fetchTrendingCoinFunc = async () => {
      // for 7 trending coingecko's coin
      try {
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
      } catch (error) {
        console.warn("error in feching trending coin details", error);
      }
    };
    fetchTrendingCoinFunc();
  }, [currencyState, currencyReduxState]);

  //fetching coin price
  const [loadingPriceState, setLoadingPriceState] = useState(false);
  const [priceValueState, setPriceValueState] = useState("");
  const [priceInputCoin, setPriceInputCoin] = useState("bitcoin");
  const fetchCoinPriceFunc = async () => {
    try {
      setLoadingPriceState(true);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${priceInputCoin}&vs_currencies=${currencyState}`
      );
      setLoadingPriceState(false);
      setPriceValueState(data[priceInputCoin][currencyState]);
      setLoadingPriceState(false);
    } catch (error) {
      console.warn("error in feching price", error);
    }
  };

  // for dispatching current currencies
  useEffect(() => {
    dispatch({
      type: "currencyType",
      payload: currencyState,
    });
    fetchCoinPriceFunc(); // eslint-disable-next-line
  }, [currencyState, currencyReduxState]);

  return (
    <>
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

        <VStack w="90vw" gap={["1", "2"]}>
          <HStack gap={["1", "5"]} w="100%" justifyContent="space-between">
            <FormControl
              display="flex"
              border="1px solid teal"
              w={["65vw", "40%"]}
              borderRadius="10px"
              p="1"
            >
              <Input
                color="teal"
                placeholder="Enter the coin"
                _placeholder={{ color: "inherit" }}
                border="none"
                outline="none"
                fontSize={["md", "lg"]}
                mr="1"
                py="1"
                onChange={(e) => setPriceInputCoin(e.target.value)}
                value={priceInputCoin}
                disabled={loadingPriceState ? true : false}
              />

              {loadingPriceState ? (
                <Button isLoading colorScheme="teal" variant="solid" />
              ) : (
                <Button
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                  onClick={fetchCoinPriceFunc}
                >
                  <ArrowForwardIcon />
                </Button>
              )}
            </FormControl>
            <StatGroup>
              {priceValueState ? (
                <>
                  <Stat>
                    <StatLabel
                      fontSize={["sm", "xl"]}
                      textTransform="capitalize"
                    >
                      {priceInputCoin}
                    </StatLabel>
                    <StatNumber
                      fontSize={["", "md"]}
                      fontWeight={["500", "500"]}
                    >
                      {currencyState === "inr"
                        ? "₹"
                        : currencyState === "usd"
                        ? "$"
                        : currencyState === "eur"
                        ? "€"
                        : currencyState}{" "}
                      {priceValueState}
                    </StatNumber>
                  </Stat>
                </>
              ) : (
                <>
                  <Stat display="grid" placeItems="center">
                    <StatLabel fontSize={["sm", "xl"]}>
                      Enter the coin name to check its latest price{" "}
                    </StatLabel>
                  </Stat>
                </>
              )}
            </StatGroup>
          </HStack>
        </VStack>

        <HStack
          justifyContent="space-between"
          w={["100vw", "90vw"]}
          flexDirection={["column", "row"]}
        >
          <Heading py="2" fontSize={["md", "2xl"]} fontWeight={["500", "600"]}>
            Cryptocurrency Prices with CoinGecko API
          </Heading>

          <HStack>
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
            <Button ref={btnRef} onClick={onOpen}>
              More..
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContainer />
            </Drawer>
          </HStack>
        </HStack>

        {loadingState ? (
          <Box
            display="flex"
            flexDirection={"row"}
            flexWrap="wrap"
            alignItems={"center"}
            justifyContent="space-evenly"
          >
            <Loader message="Fetching Trending coins......." marginTop="10px" />
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
                    fontSize={["xs", "md"]}
                    display="flex"
                    alignItems="center"
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    # <Text ml={["3", "5"]}>Coin</Text>
                  </Th>
                  <Th
                    fontSize={["xs", "md"]}
                    isNumeric
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    Price
                  </Th>
                  <Th
                    fontSize={["xs", "md"]}
                    isNumeric
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    1h
                  </Th>
                  <Th
                    fontSize={["xs", "md"]}
                    isNumeric
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    24h
                  </Th>
                  <Th
                    fontSize={["xs", "md"]}
                    isNumeric
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    7d
                  </Th>
                  <Th
                    fontSize={["xs", "md"]}
                    isNumeric
                    textTransform="capitalize"
                    fontWeight="500"
                  >
                    Mkt. Cap R
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {finalArrayState &&
                  finalArrayState.map((itemsData, indexK) => {
                    indexK++;
                    return (
                      <Tr
                        key={itemsData[0].data.id}
                        transition={"all 300ms "}
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
                            <Text
                              px="1"
                              fontSize={["xs", "md"]}
                              fontWeight="500"
                              cursor="pointer"
                            >
                              #{indexK}
                            </Text>
                            <Image
                              ml={["3", "5"]}
                              src={itemsData[0].data.image.large}
                              w={["25px", "40px"]}
                              borderRadius="50%"
                            />
                            <Text
                              px={["", ".5"]}
                              fontSize={["sm", "md"]}
                              fontWeight="500"
                              cursor="pointer"
                            >
                              {itemsData[0].data.name}
                            </Text>
                            <Text
                              pr={["0", "1"]}
                              fontSize={["2xs", "sm"]}
                              fontWeight="500"
                              cursor="pointer"
                            >
                              -{itemsData[0].data.symbol}
                            </Text>
                          </HStack>
                        </Td>
                        {/* price */}
                        <Td>
                          <Heading fontSize={["xs", "md"]} cursor="pointer">
                            {currencyState === "inr"
                              ? "₹"
                              : currencyState === "usd"
                              ? "$"
                              : currencyState === "eur"
                              ? "€"
                              : currencyState}{" "}
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
                          fontSize={["xs", "md"]}
                          fontWeight={["600", "500"]}
                        >
                          {itemsData[0].data.market_cap_rank}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </>
  );
};

export default Home;
