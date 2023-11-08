import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Create from "../pages/Create";
import Detail from "../pages/Detail";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Info from "../pages/Info";

function Body() {
  const location = useLocation();

  const BodyMarginTop = () => {
    if (location.pathname === "/create") {
      return { base: "10rem", md: "10rem" };
    } else if (
      location.pathname === "/contact" ||
      location.pathname.startsWith("/detail/")
    ) {
      return { base: "5rem", lg: "11rem", xl: "5rem" };
    } else if (location.pathname === "/" || location.pathname === "/info") {
      return { base: "10rem", md: "12rem" };
    } else {
      return { base: "0rem", md: "0rem" };
    }
  };

  return (
    <Box minHeight="100vh" marginTop={BodyMarginTop()}>
      <Routes>
        <Route exact path="/" element={<Home />} />
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
