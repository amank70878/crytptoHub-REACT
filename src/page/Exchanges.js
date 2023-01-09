import {
  Box,
  Button,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import SortIcon from "@material-ui/icons/Sort";
import React, { useEffect, useRef, useState } from "react";
import Coins from "../components/Coins";
import Loader from "../components/Loader";

const Exchanges = () => {
  const toggleSuccessToast = useRef(null);
  const toast = useToast();
  const [apiDataState, setApiDataState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  // page filter states
  const [perPage, setPerPage] = useState(100);
  // eslint-disable-next-line
  const [pageNum, setPageNum] = useState(1);
  const [totalExchangesItems, settotalExchangesItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [btns, setBtns] = useState([]);

  useEffect(() => {
    const fetchCoinsFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/exchanges?per_page=${perPage}&page=${pageNum}`
        );
        setApiDataState(data);

        settotalExchangesItems(497);
        setTotalPage((totalExchangesItems / perPage).toFixed());
        setLoadingState(false);
        toggleSuccessToast.current.click();

        let sampleArr = [];
        for (let index = 0; index < totalPage; index++) {
          sampleArr.push("index");
        }
        setBtns(sampleArr);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchCoinsFunc();
  }, [perPage, pageNum, totalPage, totalExchangesItems]);
  return (
    <>
      <Container p="0" maxW={["100vw", "85vw"]}>
        {/* heading */}
        <HStack
          py="20px"
          gap={3}
          display="flex"
          flexDirection={["row"]}
          justifyContent={["space-between"]}
          alignItems={"center"}
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
            </MenuList>
          </Menu>
          <Text textAlign={"center"} fontSize={["small", "xl"]}>
            Crypto Exchanges
          </Text>{" "}
          <Text fontWeight={["500", "600"]} fontSize={["md", "lg"]}>
            Page : {pageNum}
          </Text>
        </HStack>

        {/* cards */}
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

        {/* btns */}
        {!loadingState && (
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

        {/* toast */}
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
