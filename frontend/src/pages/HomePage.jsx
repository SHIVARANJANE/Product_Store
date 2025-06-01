import { Box, Card, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	
	const totalPrice = useMemo(() => {
		return products.reduce((sum, product) => sum + (product.price || 0), 0);
	}, [products]);

	return (
		<Container maxW='container.xl' py={12} position="relative">
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, pink.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text
								as='span' color='blue.500' _hover={{ textDecoration: "underline" }}
								fontSize={{ base: "12", sm: "20" }}
								fontWeight={"bold"}
								bgGradient={"linear(to-r, cyan.400, pink.500)"}
								bgClip={"text"}
							>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>

			{}
			{products.length > 0 && (
				<Card
					position="fixed"
					bottom="5"
					right="5"
					boxShadow="xl"
					bg="white"
					p={4}
					borderRadius="md"
					zIndex={1000}
				>
					<Text fontWeight="bold" fontSize="lg" color="gray.800">
						Total Price: ₹{totalPrice.toFixed(2)}
					</Text>
				</Card>
			)}
		</Container>
	);
};

export default HomePage;
