import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import React from "react";

export default function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
