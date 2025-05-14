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
        {/* Logo + título */}
        <section className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <Image
            src="/BCLIS.png"
            alt="Logo de la página"
            width={48}
            height={48}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
            priority
          />
          <Link
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text"
            href="/"
          >
            BCLIS
          </Link>
        </section>

        {/* Opciones */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {isAuthenticated && user ? (
            <UserInfo user={user} />
          ) : (
            <Link href="/account/login">
              <Button 
                className="text-sm sm:text-base md:text-base px-3 sm:px-4 md:px-5 py-1.5 sm:py-2
                           hover:scale-105 hover:bg-opacity-90 transition-all duration-300 active:scale-95"
              >
                Iniciar Sesión
              </Button>
            </Link>
          )}
          <div className="p-0.5 rounded-full hover:bg-primary/10 transition-all duration-300">
            <Switcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
