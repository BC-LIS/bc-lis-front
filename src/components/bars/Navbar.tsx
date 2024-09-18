"use client";

import React from "react";
import Link from "next/link";
import { Switcher } from "@components/dark-mode/Switcher";
import UserInfo from "../UserInfo";
import { User } from "@/types/UserTypes";

function Navbar() {
  const user: User = {
    name: "Esteban",
    lastname: "Cossio",
    role: "Administrador",
  };

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-lg py-2 px-8 border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            className="text-2xl font-bold bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text"
            href="/"
          >
            BCLIS
          </Link>
        </div>

        {/* Opciones de navegación */}
        <div className="flex items-center space-x-4">
          <UserInfo user={user} />
          <Switcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
