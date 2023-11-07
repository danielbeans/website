import {
    Box,
    Center,
    Heading,
    Flex,
    Spacer,
    useColorMode,
    Stack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";

import NavbarItem from "./NavbarItem";
import ColorModeToggle from "./ColorModeToggle";
import NavbarToggle from "./NavbarToggle";

function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { colorMode } = useColorMode();

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Box
            w="100%"
            h="100%"
            position="fixed"
            zIndex="dropdown"
            display={{ base: "flex", md: "none" }}
        >
            <Flex
                align="center"
                w="100%"
                h="100"
                zIndex="sticky"
                backdropFilter="blur(10px)"
            >
                <Heading size="3xl" px="10">
                    <NavLink to="/">DW</NavLink>
                </Heading>
                <Spacer />
                <Box px="10">
                    <NavbarToggle toggle={toggle} isOpen={isOpen} />
                </Box>
            </Flex>
            <Center
                w="100%"
                h="100%"
                bg={colorMode === "light" ? "blackAlpha.100" : "blackAlpha.500"}
                position="fixed"
                backdropFilter="blur(10px)"
                opacity={isOpen ? "100" : "0"}
                transition="opacity 200ms"
            >
                <Stack py="20" spacing="10" direction="column" align="center">
                    <NavbarItem to="experience" color="#ED8936" />
                    <NavbarItem to="work" color="#ED64A6" />
                    <NavbarItem to="resume" className="resume" />
                    <ColorModeToggle />
                </Stack>
            </Center>
        </Box>
    );
}

export default Navbar;
