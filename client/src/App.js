import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Navbar2 from "./components/Navbar2";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login2 from "./pages/Login2";
import SingleRestroom from "./pages/SingleRestroom";
import SignUp2 from "./pages/SignUp2";
import RestroomsNearYou from "./pages/RestroomsNearYou";
import Userpage from "./pages/Userpage";
import AddRestroom from "./pages/AddRestroom";
import SavedRestroom from "./pages/SavedRestroom";
import Map from "./components/Map";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";
import { useEffect } from "react";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/restroomsNearYou" element={<RestroomsNearYou />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/signup" element={<SignUp2 />} />
            {/* Use <RequiredAuth> for pages that should only be accessible to a
            user that has logged in.*/}
            <Route
              path="/userPage"
              element={
                <RequireAuth>
                  <Userpage />
                </RequireAuth>
              }
            />
            <Route
              path="/singleRestroom/:restroomId"
              element={
                <RequireAuth>
                  <SingleRestroom />
                </RequireAuth>
              }
            />
            <Route
              path="/addRestroom"
              element={
                <RequireAuth>
                  <AddRestroom />
                </RequireAuth>
              }
            />
            <Route
              path="/savedRestroom"
              element={
                <RequireAuth>
                  <SavedRestroom />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
