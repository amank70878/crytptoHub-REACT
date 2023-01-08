import {
  Badge,
  Button,
  Container,
  Drawer,
  DrawerOverlay,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Chart from "../components/Chart";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import DrawerContainer from "../components/DrawerContainer";

const CoinDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currencyReduxState } = useSelector((state) => state.currencyStore);
  const dispatch = useDispatch();
  const { coinId } = useParams();
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const [errorCodeState, setErrorCodeState] = useState("");
  const [errorNameState, setErrorNameState] = useState("");
  const [currencyState, setCurrencyState] = useState(currencyReduxState);
  const [daysForChart, setDaysForChart] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const btnsValue = ["24h", "7h", "14d", "30h", "60h", "200h", "1y", "max"];
  const setDaysForChartFunc = (i) => {
    setDaysForChart(i);
    setLoadingState(true);
  };

  useEffect(() => {
    const fetchIdCoinsFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        const { data: chartData } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyState}&days=${daysForChart}`
        );
        setData(data);
        setChartArray(chartData.prices);
        setLoadingState(false);
      } catch (error) {
        setErrorState(true);
        setLoadingState(false);
        setErrorCodeState(error.code);
        setErrorNameState(error.name);
      }
    };
    fetchIdCoinsFunc();
  }, [coinId, currencyState, daysForChart]);

  // for dispatching current currencies
  useEffect(() => {
    dispatch({
      type: "currencyType",
      payload: currencyState,
    });
  }, [currencyState, dispatch]);

  return (
    <>
      {errorState ? (
        <Error
          title={`Warning (${errorNameState}) : ${errorCodeState}`}
          description={`there is some issue in fetching ${coinId} from Server please try again later`}
        />
      ) : loadingState ? (
        <Loader />
      ) : (
        <>
          <Container pt="5" maxW={["100vw", "70vw"]}>
            <VStack alignItems="flex-start" px={["1", "10"]} lineHeight="160%">
              <Chart
                arr={chartArray}
                currency={currencyState}
                days={daysForChart}
              />

              <HStack
                overflow="hidden"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
                height={["90px", ""]}
              >
                <div></div>
                {btnsValue.map((i) => {
                  return (
                    <Button
                      w="50px"
                      my={["1", "2"]}
                      px={["30px", "10"]}
                      key={i}
                      onClick={() => setDaysForChartFunc(i)}
                    >
                      {i}
                    </Button>
                  );
                })}
              </HStack>

              <HStack
                gap={3}
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                position="relative"
                p="2"
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
                </RadioGroup>
              </HStack>

              <Text alignSelf="center" py="1" fontSize={["sm", "md"]}>
                last updated on {data.last_updated}
              </Text>

              <Image
                src={data.image.large}
                w={["90px", "120px"]}
                objectFit="contain"
              ></Image>

              <Text fontSize={["md", "xl"]} fontWeight="400">
                <b>{data.name}</b>
                --{data.symbol}
              </Text>

              <Text fontSize={["lg", "2xl"]} fontWeight="500">
                {currencyState === "inr"
                  ? "₹"
                  : currencyState === "usd"
                  ? "$"
                  : currencyState === "eur"
                  ? "€"
                  : currencyState}{" "}
                {data.market_data.current_price[currencyState]}
              </Text>

              <Stat>
                <StatHelpText>
                  <StatArrow
                    type={
                      data.market_data.market_cap_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {data.market_data.market_cap_change_percentage_24h}
                </StatHelpText>
              </Stat>

              <Badge fontSize="xl" py="1" px="2" bg="black" color="white">
                #{data.market_cap_rank}
              </Badge>

              <CustomProgressBar
                high={data.market_data.high_24h[currencyState]}
                low={data.market_data.low_24h[currencyState]}
                valueData={
                  data.market_data.price_change_percentage_1h_in_currency[
                    currencyState
                  ]
                }
              />

              <CustomDataDisplayer
                title={"Market Cap"}
                value={data.market_data.market_cap[currencyState]}
                currency={
                  currencyState === "inr"
                    ? "₹"
                    : currencyState === "usd"
                    ? "$"
                    : currencyState === "eur"
                    ? "€"
                    : currencyState
                }
              />

              <CustomDataDisplayer
                title={"All time High"}
                value={data.market_data.ath[currencyState]}
                Color={"green"}
                currency={
                  currencyState === "inr"
                    ? "₹"
                    : currencyState === "usd"
                    ? "$"
                    : currencyState === "eur"
                    ? "€"
                    : currencyState
                }
              />

              <CustomDataDisplayer
                title={"All time Low"}
                value={data.market_data.atl[currencyState]}
                Color={"red.800"}
                currency={
                  currencyState === "inr"
                    ? "₹"
                    : currencyState === "usd"
                    ? "$"
                    : currencyState === "eur"
                    ? "€"
                    : currencyState
                }
              />

              <CustomDataDisplayer
                title={"Total Supply"}
                value={data.market_data.total_supply}
              />

              <CustomDataDisplayer
                title={"Circulating Supply"}
                value={data.market_data.circulating_supply}
              />
            </VStack>
          </Container>
        </>
      )}
    </>
  );
};

const CustomProgressBar = ({ low, high }) => {
  return (
    <VStack pb="20px">
      <Progress hasStripe value={"50"} w="full" />
      <HStack w={["80vw", "60vw"]} justifyContent="space-between">
        <Badge children={low} colorScheme="red"></Badge>
        <Text fontSize={["xs", "xl"]} fontWeight="500">
          24h Range
        </Text>
        <Badge children={high} colorScheme="green"></Badge>
      </HStack>
    </VStack>
  );
};

const CustomDataDisplayer = ({ title, value, Color, currency }) => {
  return (
    <>
      <HStack justifyContent="space-between" w={["80vw", "60vw"]} pt="3">
        <Text
          color={Color}
          fontSize={["sm", "lg"]}
          fontWeight="500"
          fontStyle="italic"
        >
          {title}
        </Text>
        <Text fontSize={["sm", "md"]} fontWeight="400">
          {currency} {value}
        </Text>
      </HStack>
    </>
  );
};

export default CoinDetails;
