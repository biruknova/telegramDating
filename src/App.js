import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DatingContextProvider from "./store/ContextProvider";

import Rootlayout from "./pages/Rootlayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ]);
  return (
    <DatingContextProvider>
      <RouterProvider router={router} />
    </DatingContextProvider>
  );
}

export default App;
