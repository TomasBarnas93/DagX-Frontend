import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Create from "../pages/Create";
import Detail from "../pages/Detail";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function Body() {
  const location = useLocation();

  return (
    <Box
      minHeight="100vh"
      marginTop={{
        base:
          location.pathname === "/create"
            ? "10rem"
            : location.pathname === "/contact" ||
              location.pathname === "/projects" ||
              location.pathname.startsWith("/detail/")
            ? "5rem"
            : "20rem",
        md:
          location.pathname === "/create"
            ? "10rem"
            : location.pathname === "/contact" ||
              location.pathname === "/projects" ||
              location.pathname.startsWith("/detail/")
            ? "5rem"
            : "25rem",
      }}
    >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Box>
  );
}

export default Body;
