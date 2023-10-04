import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DatingContextProvider from "./store/ContextProvider";

import Rootlayout from "./pages/Rootlayout";

import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import MatchesPage from "./pages/Matches";

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
        { path: "profile", element: <ProfilePage /> },
        { path: "matches", element: <MatchesPage /> },
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
