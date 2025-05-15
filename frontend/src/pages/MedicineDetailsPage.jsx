import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  VStack,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    console.log("Fetching medicine for id:", id); // Debug log
    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    console.log("Stored medicines:", storedMedicines); // Debug log
    const selectedMedicine = storedMedicines.find(
      (med) => med.id === parseInt(id)
    );
    console.log("Selected medicine:", selectedMedicine); // Debug log
    setMedicine(selectedMedicine);
  }, [id]);

  if (!medicine) {
    console.log("No medicine found for id:", id); // Debug log
    return (
      <Container maxW="container.lg" py={10}>
        <VStack spacing={4}>
          <Heading>Medicine Not Found</Heading>
          <Text>
            The medicine you're looking for doesn't exist.{" "}
            <Link as={RouterLink} to="/" color="blue">
              Back to Home
            </Link>
          </Text>
        </VStack>
      </Container>
    );
  }

  console.log("Rendering medicine:", medicine); // Debug log

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} align="start">
        <Heading>{medicine.name}</Heading>
        <Box
          w="full"
          h="200px"
          bg="gray.200"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.500"
          fontSize="md"
        >
          Medicine Image
        </Box>
        <VStack align="start" spacing={2} w="full">
          <Text fontSize="lg">{medicine.description}</Text>
          <Text>
            <strong>Category:</strong> {medicine.category}
          </Text>
          <Text>
            <strong>Price:</strong> ${medicine.price}
          </Text>
          <Text>
            <strong>Prescription:</strong>{" "}
            {medicine.prescription_required ? "Required" : "Not Required"}
          </Text>
          <Text>
            <strong>Stock:</strong>{" "}
            {medicine.stock > 0 ? `${medicine.stock} available` : "Out of Stock"}
          </Text>
          <Text>
            <strong>Dosage Instructions:</strong> {medicine.dosage}
          </Text>
        </VStack>
        <Flex w="full" justify="space-between">
          <Button as={RouterLink} to="/" colorScheme="blue" variant="outline">
            Back to Home
          </Button>
          <Button
            as={RouterLink}
            to="/cart"
            colorScheme="teal"
            isDisabled={medicine.stock === 0}
          >
            Go to Cart
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default MedicineDetailsPage;