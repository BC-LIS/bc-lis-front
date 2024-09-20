import React from "react";
import { UserInfoDropdown } from "./UserInfoDropdown";
import { User } from "@/types/UserTypes";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatUserRole } from "@/lib/formatUserRole";

function UserInfo({ user }: { user: User | null }) {
  return (
    <>
      {user ? (
        <>
          <p className="flex flex-col">
            <span className="font-bold text-lg bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text">
              {user.name} {user.lastname}
            </span>
            <span className="font-bold text-sm text-end">{user.role}</span>
          </p>
          <UserInfoDropdown userRole={formatUserRole(user.role)} />
        </>
      ) : (
        <Button>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
      )}
    </>
  );
}

export default UserInfo;
