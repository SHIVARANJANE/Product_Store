import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { userStore } from "../store/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        pwd: "",
        img: ""
    });
    const toast = useToast();
    const navigate = useNavigate();
    const { createUser } = userStore();
    const { fetchUsers } = userStore();
    const handleAddUser = async () => {
        const { success, message } = await createUser(newUser);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
            navigate("/");
            navigate("/register");
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
            navigate("/");
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <br></br>
            <br></br>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Register
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Enter Username'
                            name='username'
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />
                        <Input
                            placeholder='Password'
                            name='pwd'
                            type='password'
                            value={newUser.pwd}
                            onChange={(e) => setNewUser({ ...newUser, pwd: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='img'
                            type='text'
                            value={newUser.img}
                            onChange={(e) => setNewUser({ ...newUser, img: e.target.value })}
                        />
                        <Button colorScheme='blue' onClick={handleAddUser} w='full'>
                            Register
                        </Button>
                        <Link to={"/"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Go to Login
                            </Text>
                        </Link>
                    </VStack>
                </Box>
            </VStack>
        </Container >
    );
};
export default Register;
