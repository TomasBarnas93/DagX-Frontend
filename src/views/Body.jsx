import React from "react";
import { HashRouter as Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Create from "../pages/Create";
import Detail from "../pages/Detail";
import Info from "../pages/Info";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function Body() {
  const location = useLocation();

  const BodyMarginTop = () => {
    switch (location.pathname) {
      case "/create":
        return { base: "10rem", md: "10rem" };
      case "/contact":
      case "/info":
        return { base: "5rem", md: "12rem" };
      case "/":
        return { base: "10rem", md: "9rem", xl: "9.5rem" };
      default:
        if (location.pathname.startsWith("/detail/")) {
          return { base: "5rem", md: "-1rem", lg: "6.5rem", xl: "8rem" };
        }
        return { base: "0rem", md: "0rem" };
    }
  };

  return (
    <Box minHeight="100vh" marginTop={BodyMarginTop()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create" element={<Create />} />
        <Route path="/info" element={<Info />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Box>
  );
}

export default Body;
