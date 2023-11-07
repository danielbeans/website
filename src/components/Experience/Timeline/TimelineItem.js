import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    UnorderedList,
    ListItem,
    useColorMode,
} from "@chakra-ui/react";

function TimelineItem({ data }) {
    const { colorMode } = useColorMode();

    const bulletPoints = data.description.map((sentence, index) => (
        <ListItem listStylePosition="outside" key={index}>
            {sentence}
        </ListItem>
    ));

    return (
        <Box>
            <Box
                h="25px"
                w="25px"
                bg="gray.400"
                borderRadius="50%"
                position="relative"
                right="55.5px"
                top="150"
                display={{ base: "none", md: "flex" }}
            />
            <Flex
                p="10"
                bg={colorMode === "light" ? "blackAlpha.50" : "blackAlpha.500"}
                shadow="2xl"
                borderRadius="xl"
                direction="column"
            >
                <Heading size="lg">
                    {data.title}{" "}
                    <Text as="span" color="red.400">
                        {data.titleColored}
                    </Text>
                </Heading>
                <Text pb="2" color="gray.500">
                    {data.dates}
                </Text>
                <Container p="0">
                    <UnorderedList>{bulletPoints}</UnorderedList>
                </Container>
            </Flex>
        </Box>
    );
}

export default TimelineItem;
