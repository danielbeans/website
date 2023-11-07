import { IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

function NavbarToggle({ toggle, isOpen, px }) {
    return (
        <IconButton
            onClick={toggle}
            variant="ghost"
            size="lg"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        ></IconButton>
    );
}

export default NavbarToggle;
