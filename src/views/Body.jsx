import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Design from "../pages/Create/Design";
import Detail from "../pages/Details/Detail";
import DesignTouch from "../pages/DesignTouch"

function Body() {
  return (
    <main style={{ paddingTop: '4.5rem' }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<Design />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/touch" element={<DesignTouch/>} />
      </Routes>
    </main>
  );
}

export default Body;
