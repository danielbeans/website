import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function NavbarItem({ to, color, className }) {
    return (
        <Box px="2">
            <NavLink
                to={to}
                style={({ isActive }) =>
                    isActive
                        ? {
                              color: color,
                              transition: "color 200ms",
                          }
                        : undefined
                }
                className={className}
                px="2"
            >
                {to}
            </NavLink>
        </Box>
    );
}

export default NavbarItem;
