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
    <nav className="sticky top-0 z-50 bg-background shadow-md py-1 sm:py-2 px-4 sm:px-6 md:px-8 border-b-2 border-primary hover:shadow-[0px_10px_25px_0px_var(--shadow)] transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <section className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <Image
            width={50}
            height={50}
            sizes="100%"
            src="/BCLIS.png"
            className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            alt="Logo de la página"
            priority
          />
          <Link
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text"
            href="/"
          >
            BCLIS
          </Link>
        </section>

        {/* Opciones de navegación */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {isAuthenticated && user ? (
            <UserInfo user={user} />
          ) : (
            <Link href="/account/login">
              <Button className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                Iniciar Sesión
              </Button>
            </Link>
          )}
          <Switcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
