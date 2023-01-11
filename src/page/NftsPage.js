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
} from "@chakra-ui/react";
import axios from "axios";
import SortIcon from "@material-ui/icons/Sort";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const NftsPage = () => {
  const [apiDataState, setApiDataState] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [totalNfts, setTotalNfts] = useState(0);
  const [perPage, setPerPage] = useState(100);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(23);
  const [btns, setBtns] = useState([]);

  useEffect(() => {
    document.title = `CryptoHub - Nfts `;
    const fetchNftsFunc = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/nfts/list?per_page=${perPage}&page=${pageNum}`
        );
        setApiDataState(data);

        setTotalNfts(2273);
        setTotalPage((totalNfts / perPage).toFixed());
        setLoadingState(false);

        let sampleArr = [];
        for (let index = 0; index < totalPage; index++) {
          sampleArr.push("index");
        }
        setBtns(sampleArr);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchNftsFunc();
  }, [pageNum, perPage, totalNfts, totalPage]);
  return (
    <>
      <Container p="0" maxW={["100vw", "85vw"]}>
        {/* heading */}
        <HStack
          py="10px"
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
            </MenuList>
          </Menu>
          <Text textAlign={"center"} fontSize={["md", "xl"]}>
            Nfts
          </Text>
          <Text fontWeight={["500", "600"]} fontSize={["md", "lg"]}>
            Page : {pageNum}
          </Text>
        </HStack>

        {/* cards */}
        <Box
          display="flex"
          flexDirection={"row"}
          flexWrap="wrap"
          alignItems={["center", "flex-start"]}
          justifyContent="space-evenly"
        >
          {loadingState ? (
            <Loader message="Fetching Nfts......" />
          ) : (
            apiDataState.map((items, indexK) => {
              indexK++;
              return (
                <NftCard
                  key={items.id}
                  id={items.id}
                  name={items.name}
                  symbol={items.symbol}
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
      </Container>
    </>
  );
};

export const NftCard = ({ id, name, symbol }) => {
  return (
    <>
      <Link to={`/nfts/${id}`}>
        <Box
          mx={["", "2"]}
          my={["2", "3"]}
          boxShadow="1px 1px 14px 0px #00000018"
          p="2"
          bgColor="#80808015"
          borderRadius="10px"
          w={["90vw", "280px"]}
          cursor="pointer"
          transition={"all 300ms "}
          position="relative"
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Text fontSize={["sm", "lg"]}>
            Name: <b>{name ? name : "NA"}</b> ({symbol && symbol})
          </Text>
        </Box>
      </Link>
    </>
  );
};

export default NftsPage;
