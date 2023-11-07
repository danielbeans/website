import {
    Container,
    Heading,
    Link,
    Stack,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

function Home() {
    const nameRef = useRef();
    const [nameWidth, setNameWidth] = useState();

    // Used to format short description to be contained within name width
    useEffect(() => setNameWidth(nameRef.current.offsetWidth), []);

    return (
        <Stack
            h="100vh"
            w="100%"
            justify="center"
            align="center"
            direction="column"
        >
            <Heading
                fontSize={{ base: "7xl", md: "8xl" }}
                textAlign="center"
                px="5"
                ref={nameRef}
            >
                Hello, I'm{" "}
                <Text
                    as="span"
                    className="hero-name"
                    textAlign="center"
                    fontSize={{ base: "7xl", md: "8xl" }}
                    fontWeight="800"
                    color="green.400"
                >
                    <Tooltip
                        hasArrow
                        label="disclaimer: I'm not on this list yet"
                        openDelay={750}
                    >
                        <Link
                            href="https://en.wikipedia.org/wiki/List_of_people_named_Daniel"
                            style={{ textDecoration: "none" }}
                        >
                            Daniel.
                        </Link>
                    </Tooltip>
                </Text>
            </Heading>
            <Container px="10" maxW={nameWidth}>
                <Text fontSize="xl" textAlign="center">
                    A{" "}
                    <Text as="span" color="red.400">
                        software enginner{" "}
                    </Text>
                    focused on creating{" "}
                    <Text as="span" color="pink.400">
                        full stack{" "}
                    </Text>
                    and{" "}
                    <Text as="span" color="orange.400">
                        responsive{" "}
                    </Text>
                    solutions for multiple systems. I currently maintain and
                    develop for{" "}
                    <Link color="blue.400" href="https://wfsu.org" isExternal>
                        WFSU
                    </Link>
                    .
                </Text>
            </Container>
        </Stack>
    );
}

export default Home;
