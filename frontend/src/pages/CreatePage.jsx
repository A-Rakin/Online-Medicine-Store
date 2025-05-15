import { useState } from "react";
import {
  Container,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  useColorModeValue,
  Box,
  useToast,
  HStack,
  IconButton,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import { useProductStore } from "../store/product"; // Adjust path if needed

const CreatePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.500");

  // View toggle state
  const [viewMode, setViewMode] = useState("desktop");
  const containerWidth = viewMode === "mobile" ? "375px" : "container.md";

  // Form state for new medicine
  const [medicine, setMedicine] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    prescription_required: false,
    description: "",
    dosage: "",
    image: "",
    manufacturer: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Access product store (optional, for backend integration)
  const { createProduct } = useProductStore(); // Adjust based on your store

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!medicine.name) newErrors.name = "Medicine name is required";
    if (!medicine.category) newErrors.category = "Category is required";
    if (!medicine.price || medicine.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (!medicine.stock || medicine.stock < 0)
      newErrors.stock = "Stock must be a non-negative number";
    if (!medicine.description) newErrors.description = "Description is required";
    if (!medicine.dosage) newErrors.dosage = "Dosage instructions are required";
    if (!medicine.manufacturer)
      newErrors.manufacturer = "Manufacturer is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast({
        title: "Form Error",
        description: "Please fill out all required fields correctly.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create new medicine
    const newMedicine = {
      id: Date.now(), // Temporary ID; replace with backend-generated ID
      ...medicine,
      price: parseFloat(medicine.price),
      stock: parseInt(medicine.stock, 10),
    };

    try {
      // Backend integration (uncomment when ready)
      // const { success, message } = await createProduct(newMedicine);
      // if (!success) throw new Error(message);

      // LocalStorage fallback
      const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
      storedMedicines.push(newMedicine);
      localStorage.setItem("medicines", JSON.stringify(storedMedicines));

      toast({
        title: "Success",
        description: "Medicine created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create medicine.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={containerWidth} py={10} bg={bgColor}>
      <VStack spacing={6}>
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

        {/* Form Card */}
        <Box
          w="full"
          p={6}
          bg={bgColor}
          borderRadius="lg"
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <Heading size="lg" color={textColor}>
              Add New Medicine
            </Heading>

            <FormControl isInvalid={errors.name}>
              <FormLabel color={textColor}>Medicine Name</FormLabel>
              <Input
                name="name"
                value={medicine.name}
                onChange={handleChange}
                placeholder="Enter medicine name"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Medicine name"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.category}>
              <FormLabel color={textColor}>Category</FormLabel>
              <Select
                name="category"
                value={medicine.category}
                onChange={handleChange}
                placeholder="Select category"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Medicine category"
              >
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Allergy">Allergy</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Other">Other</option>
              </Select>
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.price}>
              <FormLabel color={textColor}>Price ($)</FormLabel>
              <Input
                name="price"
                type="number"
                step="0.01"
                value={medicine.price}
                onChange={handleChange}
                placeholder="Enter price"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Medicine price"
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.stock}>
              <FormLabel color={textColor}>Stock Quantity</FormLabel>
              <Input
                name="stock"
                type="number"
                value={medicine.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Stock quantity"
              />
              <FormErrorMessage>{errors.stock}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.manufacturer}>
              <FormLabel color={textColor}>Manufacturer</FormLabel>
              <Input
                name="manufacturer"
                value={medicine.manufacturer}
                onChange={handleChange}
                placeholder="Enter manufacturer"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Medicine manufacturer"
              />
              <FormErrorMessage>{errors.manufacturer}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel color={textColor}>Image URL</FormLabel>
              <Input
                name="image"
                value={medicine.image}
                onChange={handleChange}
                placeholder="Enter image URL (optional)"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                aria-label="Medicine image URL"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel color={textColor} mb="0">
                Prescription Required
              </FormLabel>
              <Switch
                name="prescription_required"
                isChecked={medicine.prescription_required}
                onChange={handleChange}
                colorScheme="teal"
                aria-label="Prescription required"
              />
            </FormControl>

            <FormControl isInvalid={errors.description}>
              <FormLabel color={textColor}>Description</FormLabel>
              <Textarea
                name="description"
                value={medicine.description}
                onChange={handleChange}
                placeholder="Enter medicine description"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Medicine description"
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.dosage}>
              <FormLabel color={textColor}>Dosage Instructions</FormLabel>
              <Textarea
                name="dosage"
                value={medicine.dosage}
                onChange={handleChange}
                placeholder="Enter dosage instructions"
                bg={inputBg}
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500" }}
                required
                aria-label="Dosage instructions"
              />
              <FormErrorMessage>{errors.dosage}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              size="lg"
              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
              aria-label="Create medicine"
            >
              Create Medicine
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;