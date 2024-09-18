import React from "react";
import { UserInfoDropdown } from "./UserInfoDropdown";

function UserInfo({ name, role }: { name: string; role: string }) {
  return (
    <>
      <p className="flex flex-col">
        <span className="font-bold text-lg text-udea-900">{name}</span>
        <span className="font-bold text-sm">{role}</span>
      </p>

      <UserInfoDropdown />
    </>
  );
}

export default UserInfo;
