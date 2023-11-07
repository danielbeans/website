import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import theme from "./styles/theme";
import { Navbar, NavbarMobile } from "./components";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Flex id="main" direction="column" align="center">
                <Navbar />
                <NavbarMobile />
                <Outlet />
            </Flex>
        </ChakraProvider>
    );
}

export default App;
