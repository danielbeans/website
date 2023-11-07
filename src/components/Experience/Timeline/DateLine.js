import { Box } from "@chakra-ui/react";

function DateLine({ lineHeight }) {
    if (!lineHeight) lineHeight = 0; // Probably the wrong way to deal with NULL prop

    return (
        <Box
            borderLeftWidth="6px"
            borderStyle="solid"
            borderColor="gray.400"
            h={lineHeight}
            display={{ base: "none", md: "flex" }}
        />
    );
}

export default DateLine;
