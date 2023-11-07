import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import { Home, Experience, Work, Resume } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "experience",
                element: <Experience />,
            },
            {
                path: "work",
                element: <Work />,
            },
        ],
    },
    {
        path: "resume",
        element: <Resume />,
    },
]);

function Routes() {
    return <RouterProvider router={router} />;
}

export default Routes;
