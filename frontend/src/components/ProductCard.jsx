import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Text,
	useColorModeValue,
	useToast,
	Badge,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
  import { FaCartPlus } from "react-icons/fa";
  import { useCartStore } from "../store/cart"; 
  
  const MedicineCard = ({ medicine }) => {
	const toast = useToast();
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
  
	
	const addToCart = useCartStore((state) => state.addToCart); 
  
	const handleAddToCart = () => {
	  addToCart(medicine);
	  toast({
		title: "Added to Cart",
		description: `${medicine.name} has been added to your cart.`,
		status: "success",
		duration: 3000,
		isClosable: true,
	  });
	};
  
	return (
	  <Box
		shadow="lg"
		rounded="lg"
		overflow="hidden"
		transition="all 0.3s"
		_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
		bg={bg}
		maxW="sm"
	  >
		<Image
		  src={medicine.image || "https://via.placeholder.com/300x200?text=Medicine"}
		  alt={`${medicine.name} image`}
		  h={48}
		  w="full"
		  objectFit="cover"
		  fallbackSrc="https://via.placeholder.com/300x200?text=Medicine"
		/>
  
		<Box p={4}>
		  <Heading as="h3" size="md" mb={2} noOfLines={1}>
			{medicine.name}
		  </Heading>
  
		  <Text fontWeight="bold" fontSize="xl" color={textColor} mb={2}>
			${medicine.price.toFixed(2)}
		  </Text>
  
		  <Text fontSize="sm" color={textColor} mb={1} noOfLines={1}>
			<strong>Dosage:</strong> {medicine.dosage || "N/A"}
		  </Text>
  
		  <Text fontSize="sm" color={textColor} mb={1} noOfLines={1}>
			<strong>Manufacturer:</strong> {medicine.manufacturer || "Generic"}
		  </Text>
  
		  <HStack mb={3}>
			<Badge
			  colorScheme={medicine.prescriptionRequired ? "red" : "green"}
			  fontSize="xs"
			  px={2}
			  py={1}
			  borderRadius="full"
			>
			  {medicine.prescriptionRequired ? "Prescription Required" : "Over-the-Counter"}
			</Badge>
			<Badge
			  colorScheme={medicine.stock > 0 ? "teal" : "gray"}
			  fontSize="xs"
			  px={2}
			  py={1}
			  borderRadius="full"
			>
			  {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
			</Badge>
		  </HStack>
  
		  <HStack spacing={3}>
			<Button
			  as={Link}
			  to={`/medicines/${medicine._id}`}
			  colorScheme="blue"
			  variant="outline"
			  size="sm"
			  aria-label={`View details of ${medicine.name}`}
			>
			  View Details
			</Button>
			<Button
			  colorScheme="teal"
			  size="sm"
			  leftIcon={<FaCartPlus />}
			  onClick={handleAddToCart}
			  isDisabled={medicine.stock <= 0}
			  aria-label={`Add ${medicine.name} to cart`}
			>
			  Add to Cart
			</Button>
		  </HStack>
		</Box>
	  </Box>
	);
  };
  
  export default MedicineCard;