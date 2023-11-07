import {
    Box,
    Center,
    Heading,
    Flex,
    Spacer,
    useColorMode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { useScrollPosition } from "../../../hooks";
import NavbarItem from "./NavbarItem";
import ColorModeToggle from "./ColorModeToggle";

function Navbar() {
    const scrollPosition = useScrollPosition(); // Used to update shadow if user is on top of the page or not
    const { colorMode } = useColorMode();

    return (
        <Center
            py="10"
            w="100%"
            position="fixed"
            zIndex="overlay"
            display={{ base: "none", md: "flex" }}
        >
            <Box
                w={{ base: "90%", xl: "75%" }}
                px="10"
                py="2"
                borderRadius="xl"
                bg={colorMode === "light" ? "blackAlpha.50" : "blackAlpha.500"}
                shadow={scrollPosition > 0 ? "xl" : ""}
                transition="box-shadow 200ms"
                backdropFilter="blur(50px)"
            >
                <Flex align="center">
                    <Heading>
                        <NavLink to="/">DW</NavLink>
                    </Heading>
                    <ColorModeToggle />
                    <Spacer />
                    <NavbarItem to="experience" color="#ED8936" />
                    <NavbarItem to="work" color="#ED64A6" />
                    <NavbarItem to="resume" className="resume" />
                </Flex>
            </Box>
        </Center>
    );
}

export default Navbar;
