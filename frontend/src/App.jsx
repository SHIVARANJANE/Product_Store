import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
	const location = useLocation();
	const showNavbar = location.pathname === "/home" || location.pathname === "/create";

	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			{showNavbar && <Navbar />}
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
			</Routes>
		</Box>
	);
}

export default App;
