import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Technologies() {
    const technologiesData = [
        {
            section: "Frontend",
            list: [
                "Javascript",
                "React.js",
                "React Native",
                "Chakra UI",
                "Bootstrap",
            ],
        },
        {
            section: "Backend",
            list: [
                "Python",
                "PHP",
                "Flask",
                "MongoDB",
                "MySQL",
                "Azure",
                "Wordpress",
                "Nginx",
            ],
        },
        {
            section: "Other",
            list: [
                "C / C++",
                "C#",
                "Git",
                "Docker",
                "Pytest",
                "Windows / MacOS / Linux",
            ],
        },
    ];

    const technologiesList = technologiesData.map((data, index) => {
        let color = "orange.400";
        switch (data.section) {
            case "Backend":
                color = "green.400";
                break;
            case "Other":
                color = "blue.400";
                break;
            default:
                color = "orange.400";
                break;
        }

        /* Returns Flex item array for sections */
        const dataList = data.list.map((item, index) => {
            return (
                <Text fontSize="xl" pb="6" rowGap="10" key={index}>
                    <ChevronRightIcon color={color} />
                    {item}
                </Text>
            );
        });

        return (
            <Box
                position="relative"
                left={{ base: -25, md: 50 }}
                p="4"
                w="300px"
                key={index}
            >
                <Heading pb="4" fontSize="3xl" color={color}>
                    {data.section}
                </Heading>
                <Flex
                    maxH={{ base: 200, md: 500 }}
                    wrap="wrap"
                    direction="column"
                >
                    {dataList}
                </Flex>
            </Box>
        );
    });
    return technologiesList;
}

export default Technologies;
