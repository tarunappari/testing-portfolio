"use client"

import { Navbar } from "./Components/Mainsections/Navbar/Navbar";
import About from "./Components/Mainsections/About/About";
import Hero from "./Components/Mainsections/Hero/Hero";
import { navItems } from "../public/data";
import Projects from "./Components/Mainsections/Projects/Projects";
import { GlobalStyles } from './GlobalStyles'
import Experience from "./Components/Mainsections/Experience/Experience";
import Contact from "./Components/Mainsections/Contact/Contact";

export default function Home() {

  return (
    <main>
      <GlobalStyles />
      <Navbar navItems={navItems} className="nav" />
      <div>
        <Hero idName="#hero" />
        <About />
        <Experience idName="" />
        <Projects idName="#projects" />
        <Contact />
      </div>
    </main>
  );
}
