import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";
import { userService } from "@/src/services/user.service";
import React from "react";

export default async function Commonlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userRole: string | undefined;

  try {
    const { data } = await userService.getSession();
    userRole = data?.user?.role;
  } catch (error) {
    // User not logged in
    userRole = undefined;
  }

  return (
    <div>
      <Header userRole={userRole} />
      {children}
      <Footer />
    </div>
  );
}
