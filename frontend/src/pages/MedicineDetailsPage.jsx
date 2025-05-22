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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const MedicineDetailsPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button onClick={onOpen} colorScheme="blue" variant="outline">
          View Details
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{medicine.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                  {medicine.stock > 0
                    ? `${medicine.stock} available`
                    : "Out of Stock"}
                </Text>
                <Text>
                  <strong>Dosage Instructions:</strong> {medicine.dosage}
                </Text>
                <Flex w="full" justify="space-between" mt={4}>
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default MedicineDetailsPage;