import { Box, Heading, Text, VStack, Button, Flex, Link as ChakraLink, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, setCart }) => {
  console.log("CartPage rendering, cart:", cart); // Debug log

  const totalPrice = cart
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    : 0;
  const totalItems = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  if (!cart) {
    console.log("Cart is undefined or null");
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={4}>
          <Heading>Cart Loading Error</Heading>
          <Text>Sorry, there was an issue loading your cart.</Text>
          <ChakraLink as={Link} to="/" color="blue">
            Back to Shop
          </ChakraLink>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8}>
        <Flex w="full" justify="space-between" align="center">
          <Heading>Your Cart</Heading>
          {cart.length > 0 && (
            <Button colorScheme="red" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </Flex>

        {cart.length === 0 ? (
          <VStack spacing={4}>
            <Text>Your cart is empty.</Text>
            <ChakraLink as={Link} to="/" color="blue">
              Back to Shop
            </ChakraLink>
          </VStack>
        ) : (
          <>
            <VStack w="full" spacing={4} align="stretch">
              {cart.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="sm"
                  bg="white"
                >
                  <Flex justify="space-between" align="center">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="lg" fontWeight="bold">
                        {item.name}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Price:</strong> ${item.price}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Quantity:</strong> {item.quantity}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                      <Text fontSize="sm">
                        <strong>Prescription:</strong>{" "}
                        {item.prescription_required ? "Required" : "Not Required"}
                      </Text>
                    </VStack>
                    <VStack>
                      <Flex>
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          mr={2}
                        >
                          -
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          mr={2}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </VStack>
                  </Flex>
                </Box>
              ))}
            </VStack>

            <Box
              w="full"
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              bg="gray.50"
            >
              <VStack align="start" spacing={2}>
                <Heading size="md">Cart Summary</Heading>
                <Text>
                  <strong>Total Items:</strong> {totalItems}
                </Text>
                <Text>
                  <strong>Total Price:</strong> ${totalPrice}
                </Text>
                <Button colorScheme="green" w="full">
                  Proceed to Checkout
                </Button>
                <ChakraLink as={Link} to="/" color="blue">
                  Continue Shopping
                </ChakraLink>
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default CartPage;