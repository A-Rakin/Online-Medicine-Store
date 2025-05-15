import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Added FaUser for signup icon

const Navbar = ({ cartLength }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, green.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Online Medicine Store</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Link to={"/cart"}>
            <Button>
              <FaShoppingCart size={20} />
              {cartLength > 0 && (
                <Text
                  as="sup"
                  fontSize="sm"
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  px={2}
                  ml={1}
                >
                  {cartLength}
                </Text>
              )}
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button>
              <FaUser size={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;