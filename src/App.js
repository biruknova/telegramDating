import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DatingContextProvider from "./store/ContextProvider";

import Rootlayout from "./pages/Rootlayout";

import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import MatchesPage from "./pages/Matches";

import MatchProfile from "./pages/MatchProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout />,
      // errorElement: <ErrorPage />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "matches", element: <MatchesPage /> },
      ],
    },
    { index: true, element: <LoginPage /> },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/match-profile/:matchId",
      element: <MatchProfile />,
    },
  ]);
  return (
    <DatingContextProvider>
      <RouterProvider router={router} />
    </DatingContextProvider>
  );
}

export default App;
