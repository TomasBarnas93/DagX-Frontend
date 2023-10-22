import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Design from "../pages/Design";
import Detail from "../pages/Detail";
import { useLocation } from "react-router-dom";

function Body() {
  const location = useLocation();

  return (
    <main
      style={{
        marginTop:
          location.pathname === "/contact" || location.pathname === "/about"
            ? "5rem"
            : "25rem",
      }}
    >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/design" element={<Design />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default Body;
