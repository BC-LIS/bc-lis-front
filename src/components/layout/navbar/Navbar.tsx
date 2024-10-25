"use client";

import React from "react";
import Link from "next/link";
import UserInfo from "@/components/layout/navbar/UserInfo";
import { Switcher } from "@/components/theme/Switcher";
import { Button } from "@components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-lg py-2 px-8 border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <section className="flex items-center">
          <Image
            width={50}
            height={50}
            sizes="100%"
            src="/BCLIS.png"
            className="object-contain"
            alt="Logo de la página"
            priority
          />
          <Link
            className="text-4xl font-bold bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text"
            href="/"
          >
            BCLIS
          </Link>
        </section>

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
