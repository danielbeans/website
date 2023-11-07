import { Box } from "@chakra-ui/react";
import { useWindowSize } from "../hooks";

function Resume() {
    let size = useWindowSize();
    return (
        <Box>
            <object
                type="application/pdf"
                data={require("../assets/resume.pdf")}
                style={{ width: size.width, height: size.height }}
            >
                resume.pdf
            </object>
        </Box>
    );
}

export default Resume;
