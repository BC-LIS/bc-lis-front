"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/types/UserTypes";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Eraser } from "lucide-react";
import Link from "next/link";
import { fetchUsers, toggleUserStatus } from "@/lib/userServices";

type UserWithRole = User & {
  role: { roleName: string };
  isActive: boolean;
};

export function UserTable() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
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
  }, [pageIndex, pageSize, nameFilter, roleFilter, activeFilter]);

  const columns: ColumnDef<UserWithRole>[] = [
    { accessorKey: "username", header: "Usuario" },
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "lastName", header: "Apellidos" },
    { accessorKey: "email", header: "Correo" },
    {
      accessorKey: "role.roleName",
      header: "Rol",
      cell: ({ row }) => row.original.role.roleName,
    },
    {
      accessorKey: "isActive",
      header: "Activo",
      cell: ({ row }) => (row.original.isActive ? "Sí" : "No"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log("Editar", user)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toggleUserStatus({
                    user,
                    fetchUsersCallback: () => {
                      fetchUsers({
                        page: pageIndex,
                        size: pageSize,
                        name: nameFilter,
                        role: roleFilter,
                        isActive: activeFilter,
                      }).then((data) => {
                        if (!data) return;
                        const sortedData = data.content.sort(
                          (a: UserWithRole, b: UserWithRole) =>
                            a.name.localeCompare(b.name)
                        );
                        setUsers(sortedData);
                        setTotalPages(data.page.totalPages);
                      });
                    },
                  });
                }}
              >
                {user.isActive ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => console.log("Eliminar", user)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
      <div className="flex flex-wrap gap-2 items-center justify-between mb-8">
        <Button variant="primary" size="icon">
          <Link href="/account/register">
            <UserPlus />
          </Link>
        </Button>
        <Input
          placeholder="Filtrar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-[200px] text-foreground"
        />
        <Select onValueChange={setRoleFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="TECHNICAL">Técnico</SelectItem>
            <SelectItem value="GENERIC">Normal</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setActiveFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Elementos por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
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
