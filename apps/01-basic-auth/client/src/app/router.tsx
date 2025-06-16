import { createBrowserRouter } from "react-router";
import { MainPage } from "../pages/main/ui/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);
