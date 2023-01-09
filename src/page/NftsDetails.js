import {
  Badge,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  DrawerOverlay,
  Heading,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const NftsDetails = () => {
  //params
  const { nftsId } = useParams();

  //desc
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  // redux
  const { currencyReduxState } = useSelector((state) => state.currencyStore);
  const dispatch = useDispatch();

  // use state
  const [currencyState, setCurrencyState] = useState(currencyReduxState);
  const [loadingState, setloadingState] = useState(true);
  const [fetchedNft, setFetchedNft] = useState("");

  // fetching nfts for a id
  useEffect(() => {
    const fetchNftFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/nfts/${nftsId}`
        );
        setFetchedNft(data);
        setloadingState(false);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchNftFunc();
  }, []);

  // for dispatching current currencies
  useEffect(() => {
    dispatch({
      type: "currencyType",
      payload: currencyState,
    });
  }, [currencyState, dispatch]);

  return (
    <>
      {loadingState ? (
        <Loader />
      ) : (
        <Container pt="5" maxW={["100vw", "70vw"]}>
          <VStack alignItems="flex-start" px={["1", "10"]} lineHeight="160%">
            {fetchedNft && (
              <Image
                src={fetchedNft.image.small}
                w={["70px", "90px"]}
                h={["70px", "90px"]}
                objectFit="contain"
                borderRadius="50%"
              ></Image>
            )}

            <Badge fontSize="xl" py="1" px="2" bg="black" color="white">
              {fetchedNft.name}
            </Badge>
            <Divider py="1" />
            <CustomDataDisplayer
              title={"Total Supply"}
              value={fetchedNft.total_supply}
            />
            <CustomDataDisplayer
              title={"Native Currency"}
              value={fetchedNft.native_currency}
            />
            <CustomDataDisplayer
              title={"Floor Price in Native Currency"}
              value={fetchedNft.floor_price.native_currency}
            />
            <CustomDataDisplayer
              title={"Floor Price in usd"}
              value={fetchedNft.floor_price.usd}
              dollar={true}
            />
            <CustomDataDisplayer
              title={"Unique Addresses"}
              value={fetchedNft.number_of_unique_addresses}
            />
            <CustomDataDisplayer
              title={"% of Unique Addresses change in 24h"}
              value={
                fetchedNft.number_of_unique_addresses_24h_percentage_change
              }
              type="percentage"
            />

            <VStack>
              <Heading
                textAlign="left"
                w="full"
                fontSize={["", "2xl"]}
                mt={["7px", "10px"]}
                fontWeight={["500", "400"]}
              >
                Description :
              </Heading>
              <Box maxH={["200px", "300px"]} overflowY="auto">
                <Collapse startingHeight={60} in={show}>
                  {fetchedNft.description}
                </Collapse>
              </Box>
              <Button size="sm" onClick={handleToggle} w="full">
                Show {show ? "Less" : "More"}
              </Button>
            </VStack>
          </VStack>
        </Container>
      )}
    </>
  );
};

const CustomDataDisplayer = ({ title, value, type, dollar }) => {
  return (
    <>
      <HStack justifyContent="space-between" w={["80vw", "60vw"]} pt="3">
        <Text fontSize={["sm", "lg"]} fontWeight="500" fontStyle="italic">
          {title}
        </Text>
        <HStack>
          {type ? (
            <Stat>
              <StatHelpText color={value > 0 ? "green" : "red"}>
                <StatArrow type={value > 0 ? "increase" : "decrease"} />
                {value}
              </StatHelpText>
            </Stat>
          ) : (
            <Text fontSize={["sm", "md"]} fontWeight="400">
              {dollar && "$"} {value}
            </Text>
          )}
        </HStack>
      </HStack>
    </>
  );
};
export default NftsDetails;
