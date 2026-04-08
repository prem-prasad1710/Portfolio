import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/Flair/ScrollProgress";
import CursorAura from "./components/Flair/CursorAura";
import SiteCommandPalette from "./components/Flair/SiteCommandPalette";
import EasterEggToast from "./components/Flair/EasterEggToast";
import NotFound from "./components/Flair/NotFound";
import { ProfileDataProvider } from "./context/ProfileDataContext";
import "./style.css";
import "./styles/devShell.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ProfileDataProvider>
        <Preloader load={load} />
        <div className="App dev-shell" id={load ? "no-scroll" : "scroll"}>
          <CursorAura />
          <ScrollProgress />
          <SiteCommandPalette />
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <EasterEggToast />
        </div>
      </ProfileDataProvider>
    </Router>
  );
}

export default App;
