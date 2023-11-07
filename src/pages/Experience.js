import { Heading, Stack } from "@chakra-ui/react";

import { Technologies, Timeline } from "../components";

function Experience() {
    return (
        <Stack w="100%" pb="20" align="strech" direction="column">
            <Heading fontSize="6xl" textAlign="center" px="5" pt="40" pb="10">
                Experience
            </Heading>
            <Timeline />
            <Heading fontSize="5xl" textAlign="center" px="5" pt="20" pb="10">
                Technologies I Work With
            </Heading>
            <Stack
                align={{ base: "center", md: "flex-start" }}
                justify={{ base: "flex-end", md: "center" }}
                direction={{ base: "column", md: "row" }}
            >
                <Technologies />
            </Stack>
        </Stack>
    );
}

export default Experience;
