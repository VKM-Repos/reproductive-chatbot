"use client";

import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/chat/ChatBot";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
