"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { Switcher } from "@components/dark-mode/Switcher";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background shadow-lg py-2 px-8 border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
            href="/"
          >
            BCLIS
          </Link>
        </div>

        {/* Opciones de navegación */}
        <div className="flex items-center space-x-4">
          <Button>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button>
            <Link href="/register">Registrar</Link>
          </Button>
          <Switcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
