"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Switcher } from "@components/dark-mode/Switcher";
import UserInfo from "./UserInfo";
import { User } from "@/types/UserTypes";
import { Button } from "../ui/button";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("session");
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);

    if (token && userInfo) {
      // Parsear la información del usuario almacenada
      const userData = JSON.parse(userInfo);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  console.log(user, isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-lg py-2 px-8 border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
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
          {isAuthenticated && user ? (
            <UserInfo user={user} />
          ) : (
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          )}
          <Switcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
