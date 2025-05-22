import { useState } from 'react';
import { Box, SimpleGrid, Text, Button, Heading, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const AdminPanel = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("gray.100", "gray.600");

  // Mock data from HomePage.jsx
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
      image: "/images/amoxicillin.jpg",
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

  const [medicines, setMedicines] = useState(initialMedicines);

  const handleDelete = (id) => {
    // Mock delete action (updates local state only)
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
  };

  return (
    <Box p={4} bg={bgColor}>
      <VStack spacing={6}>
        <Heading>Admin Panel</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
          {medicines.map((medicine) => (
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
                <Text fontSize="lg" fontWeight="bold">
                  {medicine.name}
                </Text>
                <Text>Price: ${medicine.price}</Text>
                <Text>Stock: {medicine.stock}</Text>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(medicine.id)}
                >
                  Delete
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default AdminPanel;