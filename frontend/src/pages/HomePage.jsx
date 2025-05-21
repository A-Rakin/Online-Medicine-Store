import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Box,
  Button,
  Input,
  Select,
  useToast,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
  Image,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPills, FaMobileAlt, FaDesktop } from "react-icons/fa";

const HomePage = ({ addToCart }) => {
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bannerGradient = useColorModeValue(
    "linear(to-r, blue.100, teal.100)",
    "linear(to-r, blue.900, teal.900)"
  );
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("gray.100", "gray.600");

  // View toggle state
  const [viewMode, setViewMode] = useState("desktop"); // "desktop" or "mobile"
  const containerWidth = viewMode === "mobile" ? "375px" : "container.lg";

  // Initial mock data
  const initialMedicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 5.99,
      stock: 100,
      prescription_required: false,
      description: "Relieves mild to moderate pain and fever.",
      dosage: "Take 1-2 tablets every 4-6 hours as needed.",
      image: "/images/paracetamol.jpg",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 12.99,
      stock: 50,
      prescription_required: true,
      description: "Treats bacterial infections.",
      dosage: "Take 1 capsule 3 times daily for 5-7 days.",
      image:"/images/amoxicillin.jpg",
    },
    {
      id: 3,
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      price: 8.99,
      stock: 0,
      prescription_required: false,
      description: "Reduces inflammation and pain.",
      dosage: "Take 1 tablet every 6-8 hours with food.",
      image: "/images/ibuprofen.jpg",
    },
    {
      id: 4,
      name: "Cetirizine 10mg",
      category: "Allergy",
      price: 7.49,
      stock: 80,
      prescription_required: false,
      description: "Relieves allergy symptoms like sneezing and itching.",
      dosage: "Take 1 tablet daily as needed.",
      image: "/images/cetirizine.jpg",
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      price: 10.99,
      stock: 30,
      prescription_required: false,
      description: "Reduces stomach acid and treats heartburn.",
      dosage: "Take 1 capsule daily before a meal.",
      image: "/images/omeprazole.jpg",
    },
    {
      id: 6,
      name: "Azithromycin 500mg",
      category: "Antibiotics",
      price: 15.99,
      stock: 20,
      prescription_required: true,
      description: "Treats bacterial infections like pneumonia.",
      dosage: "Take 1 tablet daily for 3 days.",
      image: "/images/azithromycin.jpg",
    },
  ];

  // Load medicines from localStorage or use initialMedicines
  const [medicines, setMedicines] = useState(() => {
    const storedMedicines = JSON.parse(localStorage.getItem("medicines"));
    if (storedMedicines && storedMedicines.length > 0) {
      return storedMedicines;
    }
    localStorage.setItem("medicines", JSON.stringify(initialMedicines));
    return initialMedicines;
  });

  // State for search and category filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter medicines based on search and category
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter
  const categories = [
    "All",
    ...new Set(medicines.map((medicine) => medicine.category)),
  ];

  // Handle add to cart with toast notification
  const handleAddToCart = (medicine) => {
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
    <Container maxW={containerWidth} py={10} bg={bgColor}>
      <VStack spacing={8}>
        {/* View Toggle Buttons */}
        <HStack spacing={2} alignSelf="flex-end">
          <IconButton
            icon={<FaMobileAlt />}
            aria-label="Mobile View"
            colorScheme={viewMode === "mobile" ? "blue" : "gray"}
            variant="outline"
            onClick={() => setViewMode("mobile")}
          />
          <IconButton
            icon={<FaDesktop />}
            aria-label="Desktop View"
            colorScheme={viewMode === "desktop" ? "blue" : "gray"}
            variant="outline"
            onClick={() => setViewMode("desktop")}
          />
        </HStack>

        {/* Banner Section */}
        <Box
          w="full"
          p={8}
          bgGradient={bannerGradient}
          borderRadius="lg"
          textAlign="center"
          boxShadow="md"
          transition="all 0.3s"
          _hover={{ transform: "scale(1.02)" }}
        >
          <Flex align="center" justify="center" direction={{ base: "column", sm: "row" }}>
            <Icon as={FaPills} boxSize={10} mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} />
            <VStack spacing={2}>
              <Heading size="xl" color={textColor}>
                Welcome to MediShop
              </Heading>
              <Text fontSize="lg" color={textColor}>
                Your trusted online pharmacy for quality medicines
              </Text>
            </VStack>
          </Flex>
        </Box>

        {/* Search and Filter Section */}
        <Flex
          w="full"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          gap={4}
        >
          <Input
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW={{ base: "full", sm: "300px" }}
            bg={useColorModeValue("gray.50", "gray.600")}
            borderColor={useColorModeValue("gray.200", "gray.500")}
            _focus={{ borderColor: "blue.500" }}
            aria-label="Search medicines"
          />
          <Select
            maxW={{ base: "full", sm: "200px" }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            bg={useColorModeValue("gray.50", "gray.600")}
            borderColor={useColorModeValue("gray.200", "gray.500")}
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Medicines Listing */}
        <Heading size="md" color={textColor}>
          Featured Medicines
        </Heading>
        {filteredMedicines.length === 0 ? (
          <Text color={textColor}>
            No medicines found 😟 Try adjusting your search or filter.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredMedicines.map((medicine) => (
              <Box
                key={medicine.id}
                p={5}
                borderWidth="1px"
                borderColor={cardBorder}
                borderRadius="lg"
                boxShadow="md"
                bg={cardBg}
                transition="all 0.3s"
                _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
              >
                <VStack align="start" spacing={3}>
                  {/* Medicine Image */}
                  <Image
                    src={medicine.image}
                    alt={`${medicine.name} image`}
                    w="full"
                    h="150px"
                    objectFit="cover"
                    borderRadius="md"
                    fallbackSrc="https://via.placeholder.com/300x150?text=Medicine"
                  />
                  <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={1}>
                    {medicine.name}
                  </Text>
                  <Text fontSize="sm" color={textColor} noOfLines={2}>
                    {medicine.description}
                  </Text>
                  <HStack>
                    <Badge
                      colorScheme={medicine.prescription_required ? "red" : "green"}
                      fontSize="xs"
                      px={2}
                      borderRadius="full"
                    >
                      {medicine.prescription_required ? "Prescription Required" : "OTC"}
                    </Badge>
                    <Badge
                      colorScheme={medicine.stock > 0 ? "teal" : "gray"}
                      fontSize="xs"
                      px={2}
                      borderRadius="full"
                    >
                      {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color={textColor}>
                    <strong>Price:</strong> ${medicine.price.toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    <strong>Dosage:</strong> {medicine.dosage}
                  </Text>
                  <HStack w="full" justify="space-between">
                    <Button
                      as={Link}
                      to={`/medicines/${medicine.id}`}
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
                      onClick={() => handleAddToCart(medicine)}
                      isDisabled={medicine.stock === 0}
                      aria-label={`Add ${medicine.name} to cart`}
                    >
                      Add to Cart
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;