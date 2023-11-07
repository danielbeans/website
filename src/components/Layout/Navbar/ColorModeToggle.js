import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function ColorModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            onClick={toggleColorMode}
            isRound="true"
            variant="ghost"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            mx="2"
        />
    );
}

export default ColorModeToggle;
