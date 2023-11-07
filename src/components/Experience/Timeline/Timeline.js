import { Center, HStack, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

import TimelineItem from "./TimelineItem";
import DateLine from "./DateLine";

function Timeline() {
    const cardsRef = useRef();
    const [lineHeight, setLineHeight] = useState();

    // Used to make line just a bit taller than job cards
    useEffect(() => setLineHeight(cardsRef.current.offsetHeight), []);

    // TODO: place this data in store (Redux?)
    const jobData = [
        {
            title: "Web Developer",
            titleColored: "@ WFSU",
            description: [
                "Maintains wfsu.org using PHP, HTML, CSS and Javascript hosted on an Apache server.",
                "Develops new components that involve using tools such as Web APIs, MySQL, and Javascript framework like Matter.js.",
                "Uses Wordpress and PHP to manage and update the Local Routes and Education websites on wfsu.org.",
            ],
            dates: "Nov 2021 - Present",
        },
        {
            title: "Digital Director",
            titleColored: "@ March For Our Lives",
            description: [
                "Managed and created all forms of visual media within the organization.",
                "Managed social media accounts with a combined following of over 1.1 million.",
                "Produced videos concerning topics ranging from youth empowerment to gun violence prevention with over 3.3 million views.",
                "Coordinated with companies such as McCann NY and Apple Music to create campaigns centered around gun violence prevention.",
            ],
            dates: "March 2018 - July 2020",
        },
        {
            title: "Graphic Designer",
            titleColored: "@ FSU Libraries",
            description: [
                "Creates promotional materials for library events.",
                "Designs logos for university organizations and their events.",
                "Curates infographics for both students and employees about various topics concerning the libraries and its associates.",
                "Reviews and edits graphics from peers before being sent off.",
            ],
            dates: "October 2019 - July 2022",
        },
    ];

    const jobTimeline = jobData.map((data, index) => (
        <TimelineItem key={index} data={data} />
    ));

    return (
        <Center>
            <HStack
                px="10"
                align="flex-start"
                spacing={{ base: "0", md: "10" }}
            >
                <DateLine lineHeight={lineHeight + 25} />
                <VStack w="100%" spacing="50" align="center" ref={cardsRef}>
                    {jobTimeline}
                </VStack>
            </HStack>
        </Center>
    );
}

export default Timeline;
