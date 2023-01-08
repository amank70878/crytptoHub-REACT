import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Coins = ({
  Ckey,
  CoinsContainerByME,
  price,
  image,
  name,
  totalSupply,
  symbol,
  lastUpdate,
  Crank,
  CcurrencyState,
  imgSizeW,
  imgSizeH,
  Erank,
  country,
  url,
  year_established,
}) => {
  const lastUpdateD = new Date(lastUpdate).getDate();
  const lastUpdateM = new Date(lastUpdate).getMonth();
  const lastUpdateY = new Date(lastUpdate).getFullYear();
  return (
    <>
      {CoinsContainerByME ? (
        <Link to={`/coins/${Ckey}`}>
          <Box
            mx={["1", "2"]}
            my={["3", "4"]}
            boxShadow="1px 1px 14px 0px #00000018"
            p="2"
            bgColor="#80808015"
            borderRadius="10px"
            w={["180px", "230px"]}
            cursor="pointer"
            transition={"all 300ms "}
            position="relative"
            lineHeight={["90%", "150%"]}
            css={{
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <VStack>
              <Image
                src={image}
                w={imgSizeW}
                minH={imgSizeH}
                objectFit={"contain"}
                mb={["10px", "0"]}
              ></Image>
              <Text fontSize={["sm", "md"]}>
                {name ? name : "NA"}
                {symbol && <span> ({symbol})</span>}
              </Text>
              {price && (
                <Text fontSize={["sm", "lg"]}>
                  Price :{" "}
                  {CcurrencyState === "inr"
                    ? "₹"
                    : CcurrencyState === "usd"
                    ? "$"
                    : CcurrencyState === "eur"
                    ? "€"
                    : CcurrencyState}
                  <b> {price}</b>
                </Text>
              )}
              {country && (
                <HStack alignItems={"flex-start"} px="1">
                  <Text fontSize={["xs", "md"]} fontWeight={"500"}>
                    Country-
                  </Text>
                  <Text fontSize={["xs", "md"]} fontWeight={"400"}>
                    {country}
                  </Text>
                </HStack>
              )}
              {Erank && (
                <Text
                  fontSize={["xs", "sm"]}
                  fontWeight={"500"}
                  bgColor=" #83838316"
                  borderRadius={"5px"}
                  px={["8px", "10px"]}
                  position="absolute"
                  right="0"
                  top={["-16px", "-20px"]}
                >
                  {Erank}/10
                </Text>
              )}
              {Crank && (
                <Text
                  fontSize={["xs", "sm"]}
                  fontWeight={"500"}
                  bgColor=" #83838316"
                  borderRadius={"5px"}
                  px={["8px", "10px"]}
                  position="absolute"
                  right="0"
                  top={["-16px", "-20px"]}
                >
                  {Crank}/10
                </Text>
              )}
              {totalSupply && (
                <Text
                  fontSize={["12px", "sm"]}
                  textAlign="end"
                  fontWeight={"400"}
                  pt="4"
                >
                  <b>Total Supply :</b> {totalSupply}
                </Text>
              )}
              {lastUpdate && (
                <Text
                  fontSize={["12px", "sm"]}
                  textAlign="end"
                  fontWeight={"400"}
                >
                  <b>Last Updated on </b>
                  {lastUpdateD}/{lastUpdateM}/{lastUpdateY}
                </Text>
              )}
              {year_established && (
                <Text px="1" fontSize={["xs", "md"]} fontWeight={"500"}>
                  Established on - {year_established}
                </Text>
              )}
            </VStack>
          </Box>
        </Link>
      ) : (
        <a href={url} target="blank">
          <Box
            mx={["1", "2"]}
            my={["3", "4"]}
            boxShadow="1px 1px 14px 0px #00000018"
            p="2"
            bgColor="#80808015"
            w={["180px", "230px"]}
            cursor="pointer"
            transition={"all 300ms "}
            position="relative"
            lineHeight={["90%", "150%"]}
            css={{
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <VStack>
              <Image
                src={image}
                w={imgSizeW}
                minH={imgSizeH}
                objectFit={"contain"}
                mb={["10px", "0"]}
              ></Image>
              <Text fontSize={["sm", "md"]}>
                {name ? name : "NA"}
                {symbol && <span> ({symbol})</span>}
              </Text>
              {price && (
                <Text fontSize={["sm", "lg"]} fontWeight={"500"}>
                  Price :{" "}
                  {CcurrencyState === "inr"
                    ? "₹"
                    : CcurrencyState === "usd"
                    ? "$"
                    : "€"}{" "}
                  {price}
                </Text>
              )}
              {country && (
                <HStack alignItems={"flex-start"} px="1">
                  <Text fontSize={["xs", "md"]} fontWeight={"500"}>
                    Country-
                  </Text>
                  <Text fontSize={["xs", "md"]} fontWeight={"400"}>
                    {country}
                  </Text>
                </HStack>
              )}
              {Erank && (
                <Text
                  fontSize={["xs", "sm"]}
                  fontWeight={"500"}
                  bgColor=" #83838316"
                  borderRadius={"5px"}
                  px={["8px", "10px"]}
                  position="absolute"
                  right="0"
                  top={["-16px", "-20px"]}
                  zIndex="10"
                >
                  {Erank}/10
                </Text>
              )}
              {Crank && (
                <Text
                  fontSize={["xs", "sm"]}
                  fontWeight={"500"}
                  bgColor=" #83838316"
                  borderRadius={"5px"}
                  px={["8px", "10px"]}
                  position="absolute"
                  right="0"
                  top={["-16px", "-20px"]}
                  zIndex="10"
                >
                  {Crank}/10
                </Text>
              )}
              {totalSupply && (
                <Text
                  fontSize={["12px", "sm"]}
                  textAlign="end"
                  fontWeight={"400"}
                  pt="4"
                >
                  <b>Total Supply :</b> {totalSupply}
                </Text>
              )}
              {lastUpdate && (
                <Text
                  fontSize={["12px", "sm"]}
                  textAlign="end"
                  fontWeight={"400"}
                >
                  <b>Last Updated on </b>
                  {lastUpdateD}/{lastUpdateM}/{lastUpdateY}
                </Text>
              )}
              {year_established && (
                <Text px="1" fontSize={["xs", "md"]} fontWeight={"500"}>
                  Established on - {year_established}
                </Text>
              )}
            </VStack>
          </Box>
        </a>
      )}
    </>
  );
};

export default Coins;
