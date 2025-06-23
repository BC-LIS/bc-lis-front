"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Eraser } from "lucide-react";
import Link from "next/link";
import { fetchUsers } from "@/lib/userServices";
import { getDisplayRoleName } from "@/utils/DisplayRole";
import UserActions from "./UserActions";
import { User } from "@/types/UserTypes";

type UserWithRole = User & {
  role: { roleName: string };
  isActive: boolean;
  lastName: string;
  email: string;
};

export function UserTable() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setCurrentUserRole(parsed.role ?? "");
    }
  }, []);

  const refreshUsers = () => {
    fetchUsers({
      page: pageIndex,
      size: pageSize,
      name: nameFilter,
      role: roleFilter,
      isActive: activeFilter,
    }).then((data) => {
      if (!data) return;
      const sorted = data.content.sort((a: UserWithRole, b: UserWithRole) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sorted);
      setTotalPages(data.page.totalPages);
    });
  };

  useEffect(() => {
    refreshUsers();
  }, [pageIndex, pageSize, nameFilter, roleFilter, activeFilter]);

  const columns: ColumnDef<UserWithRole>[] = [
    { accessorKey: "username", header: "Usuario" },
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "lastName", header: "Apellidos" },
    { accessorKey: "email", header: "Correo" },
    {
      accessorKey: "role.roleName",
      header: "Rol",
      cell: ({ row }) => getDisplayRoleName(row.original.role.roleName),
    },
    {
      accessorKey: "isActive",
      header: "Activo",
      cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <UserActions
          user={row.original}
          currentUserRole={currentUserRole}
          refreshUsers={refreshUsers}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
  });

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row flex-wrap gap-2 items-center justify-center sm:justify-between mb-8">
        <div className="flex gap-2">
          <Button variant="primary" size="icon">
            <Link href="/account/register">
              <UserPlus />
            </Link>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setNameFilter("");
              setRoleFilter("");
              setActiveFilter("");
              setPageIndex(0);
            }}
          >
            Limpiar filtros <Eraser />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Input
            placeholder="Filtrar por nombre"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-48 text-foreground"
          />
          <Select onValueChange={setRoleFilter} defaultValue="">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Administrador</SelectItem>
              <SelectItem value="TECHNICAL">Técnico</SelectItem>
              <SelectItem value="GENERIC">Normal</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setActiveFilter} defaultValue="">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Activo</SelectItem>
              <SelectItem value="false">Inactivo</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setPageSize(Number(val))}
            defaultValue="5"
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="hidden sm:block">
        <Table>
          <TableCaption>
            Lista de usuarios registrados en la base de conocimiento
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    <div className="block sm:hidden px-4 space-y-4">
      {users.map((user) => (
        <Card key={user.username} className="shadow-md">
          <CardHeader>
            <CardTitle>{user.name} {user.lastName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Usuario:</span> {user.username}
            </div>
            <div>
              <span className="font-semibold">Apellidos:</span> {user.lastName}
            </div>
            <div>
              <span className="font-semibold">Rol:</span>{" "}
              {getDisplayRoleName(user.role.roleName)}
            </div>
            <div>
              <span className="font-semibold">Activo:</span>{" "}
              {user.isActive ? "Sí" : "No"}
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <UserActions
              user={user}
              currentUserRole={currentUserRole}
              refreshUsers={refreshUsers}
            />
          </CardFooter>
        </Card>
      ))}
    </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Anterior
        </Button>
        <span>
          Página {pageIndex + 1} de {totalPages}
        </span>
        <Button
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={pageIndex + 1 >= totalPages}
        >
          Siguiente
        </Button>
      </div>
    </>
  );
}
