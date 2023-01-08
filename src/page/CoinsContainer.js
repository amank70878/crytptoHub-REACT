import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerOverlay,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Coins from "../components/Coins";
import Loader from "../components/Loader";
import SortIcon from "@material-ui/icons/Sort";
import { useSelector } from "react-redux";
import DrawerContainer from "../components/DrawerContainer";

const CoinsContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currencyReduxState } = useSelector((state) => state.currencyStore);
  const toggleSuccessToast = useRef(null);
  const toast = useToast();
  const [apiData, setApiData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [currencyState, setCurrencyState] = useState(currencyReduxState);

  // page filter states
  const [perPage, setPerPage] = useState(100);
  const [pageNum, setPageNum] = useState(1);
  const [totalCoinItems, settotalCoinItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [btns, setBtns] = useState([]);

  // fetching coins data
  useEffect(() => {
    const fetchCoinsFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyState}&order=market_cap_desc&per_page=${perPage}&page=${pageNum}&sparkline=false`
        );
        setApiData(data);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchCoinsFunc();
  }, [currencyState, pageNum, perPage, totalCoinItems, totalPage]);

  // fetching total number of coins data length
  useEffect(() => {
    const fetchTotalCoinsFunc = async () => {
      try {
        const { data: total } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/list`
        );
        settotalCoinItems(total.length);
        setTotalPage((totalCoinItems / perPage).toFixed());
        setLoadingState(false);
        toggleSuccessToast.current.click();

        let sampleArr = [];
        for (let index = 0; index < totalPage; index++) {
          sampleArr.push("index");
        }
        setBtns(sampleArr);
      } catch (error) {
        console.warn(error.code);
      }
    };
    fetchTotalCoinsFunc();
  }, [perPage, totalCoinItems, totalPage, pageNum]);

  return (
    <>
      <Container pt="20px" maxW={["100vw", "85vw"]} overflowX="hidden">
        <HStack
          gap={3}
          display="flex"
          flexDirection={["row"]}
          justifyContent={["space-between"]}
          alignItems={"center"}
          mb="10px"
          px="3"
        >
          <Menu closeOnSelect={true}>
            <MenuButton as={Button}>
              <SortIcon />
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue="perpage100"
                title="Per Page"
                type="radio"
              >
                <MenuItemOption
                  value="perpage25"
                  onClick={() => setPerPage(25)}
                >
                  25
                </MenuItemOption>
                <MenuItemOption
                  value="perpage50"
                  onClick={() => setPerPage(50)}
                >
                  50
                </MenuItemOption>
                <MenuItemOption
                  value="perpage100"
                  onClick={() => setPerPage(100)}
                >
                  100
                </MenuItemOption>
              </MenuOptionGroup>

              <MenuDivider />

              <MenuOptionGroup>
                <MenuItemOption>
                  <Button ref={btnRef} onClick={onOpen} variant="unstyled">
                    go to Currencies
                  </Button>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <RadioGroup value={currencyState} onChange={setCurrencyState}>
            <HStack gap={2}>
              <Radio value="inr">₹INR</Radio>
              <Radio value="usd">$USD</Radio>
              <Radio value="eur">€EUR</Radio>{" "}
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
          <Text fontWeight={["500", "600"]} fontSize={["md", "lg"]}>
            Page : {pageNum}
          </Text>
        </HStack>
        <Box
          display="flex"
          flexDirection={"row"}
          flexWrap="wrap"
          alignItems={"center"}
          justifyContent="space-evenly"
        >
          {loadingState ? (
            <Loader message="Fetching Crypto Coins......." />
          ) : (
            apiData.map((items, indexK) => {
              indexK++;
              return (
                <Coins
                  key={indexK}
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
        {loadingState && (
          <HStack overflowX="auto" w="100%" pb={["", "2"]} py="1">
            {btns.map((items, index = 0) => {
              index++;
              return (
                <Button
                  key={index}
                  bgColor="blackAlpha.600"
                  color="whiteAlpha.900"
                  onClick={(e) => {
                    setPageNum(e.target.value);
                  }}
                  value={index}
                >
                  {index}
                </Button>
              );
            })}
          </HStack>
        )}

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
    </>
  );
};

export default CoinsContainer;
