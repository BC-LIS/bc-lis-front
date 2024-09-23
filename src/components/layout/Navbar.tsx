"use client";

import React from "react";
import Link from "next/link";
import UserInfo from "@/components/layout/UserInfo";
import { Switcher } from "@/components/theme/Switcher";
import { Button } from "@components/ui/button";
import { useAuth } from "@/hooks/use-auth";

function Navbar() {
  const { isAuthenticated, user } = useAuth();

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
            <Link href="/account/login">
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
