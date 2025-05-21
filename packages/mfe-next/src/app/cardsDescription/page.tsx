"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardsDescriptionScene from "../components/3D/scenes/description/CardsDescriptionScene";

const CardsDescriptionPage: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <Header />
      <CardsDescriptionScene />
      {/* {children} */}
      <Footer noMargin={true} />
    </main>
  );
};

export default CardsDescriptionPage;
