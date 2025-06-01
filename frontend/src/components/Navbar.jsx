import { Button, Container, Flex, HStack, Text, useColorMode, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { userStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { fetchUsers } = userStore();
	const navigate = useNavigate();
	const [imgUrl, setImgUrl] = useState('');
	const [username, setUsername] = useState('');

	useEffect(() => {
		const userName = localStorage.getItem("userName");

		const fetchUserData = async () => {
			const user = await fetchUsers(userName);
			if (user && user.img) {
				setImgUrl(user.img);
				setUsername(userName);
			}
		}

		if (userName) {
			fetchUserData();
		}

	}, [fetchUsers])

	return (
		<Container maxW={"1140px"} px={4}>
			<br></br>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, pink.500)"}
					bgClip={"text"}
				>
					<Link to={"/home"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button border={"1px solid pink"}>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode} border={"1px solid pink"}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
					<Menu>
						<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"}>
							<Avatar size={"md"}
								name={username}
								src={imgUrl}
								border={"2px solid pink"}
								fallbackSrc="/profile.avif" />
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => { navigate("/create") }} icon={<PlusSquareIcon fontSize={20} />}>
								Create
							</MenuItem>
							<MenuItem onClick={() => { navigate("/") }} icon={<FaSignInAlt />}>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>

				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
