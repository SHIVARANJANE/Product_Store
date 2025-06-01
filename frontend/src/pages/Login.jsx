import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useColorModeValue,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/auth";
import { Link } from "react-router-dom";

const Login = () => {
    const { fetchUsers, users } = userStore();
    const toast = useToast();
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: "",
        pwd: "",
    });

    const handleLogin = async () => {
        const user = await fetchUsers(newUser.username);

        if (!user) {
            toast({
                title: "User not found",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (user.pwd === newUser.pwd) {
            localStorage.setItem("userId", user._id);
            localStorage.setItem("userName", user.username);
            navigate("/home");
        } else {
            toast({
                title: "Invalid password",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    return (
        <Container maxW={"container.sm"}>
            <br></br>
            <br></br>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Login
                </Heading>

                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Enter Username"
                            name="username"
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser({ ...newUser, username: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Password"
                            name="pwd"
                            type="password"
                            value={newUser.pwd}
                            onChange={(e) =>
                                setNewUser({ ...newUser, pwd: e.target.value })
                            }
                        />
                        <Button colorScheme="blue" onClick={handleLogin} w="full">
                            Login
                        </Button>
                        <Box>
                            New to here?{" "}
                            <Link to="/register" style={{ color: "#3182ce", textDecoration: "underline" }}>
                                Register.
                            </Link>
                        </Box>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default Login;
