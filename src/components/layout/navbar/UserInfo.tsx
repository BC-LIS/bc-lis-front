import React from "react";
import Link from "next/link";
import { UserInfoDropdown } from "@/components/layout/navbar/UserInfoDropdown";
import { User } from "@/types/UserTypes";
import { Button } from "@components/ui/button";
import { formatUserRole } from "@/lib/formatUserRole";

function UserInfo({ user }: { user?: User }) {
  return (
    <>
      {user ? (
        <>
          <p className="flex flex-col">
            <span className="font-bold text-lg bg-gradient-to-r from-secondary to-udea-500 inline-block text-transparent bg-clip-text">
              {user.name} {user.lastname}
            </span>
            <span className="font-bold text-sm text-end">
              {formatUserRole(user.role)}
            </span>
          </p>
          <UserInfoDropdown userRole={user.role} />
        </>
      ) : (
        <Button>
          <Link href="/account/login">Iniciar Sesión</Link>
        </Button>
      )}
    </>
  );
}

export default UserInfo;
