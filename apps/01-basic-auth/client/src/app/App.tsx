import { Theme } from "@radix-ui/themes";
import { RouterProvider } from "react-router";

import { router } from "./router";
import "./styles.css";

export const App = () => {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
};
