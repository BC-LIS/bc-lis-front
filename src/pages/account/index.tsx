import { User } from "@/types/UserTypes";
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
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
import Head from "next/head";

function Account() {
  const [users, setUsers] = useState<User[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Simula la llamada a la API
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a: User, b: User) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedData);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (roleFilter ? user.role === roleFilter : true) &&
        (activeFilter !== "" ? user.active === (activeFilter === "true") : true)
      );
    });
  }, [users, nameFilter, roleFilter, activeFilter]);

  const columns: ColumnDef<User>[] = [
    { accessorKey: "username", header: "Usuario" },
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "lastName", header: "Apellidos" },
    { accessorKey: "email", header: "Correo" },
    { accessorKey: "role", header: "Rol" },
    {
      accessorKey: "active",
      header: "Activo",
      cell: ({ row }) => (row.original.active ? "Sí" : "No"),
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
                onClick={() => console.log("Eliminar", user)}
                className="text-red-600"
              >
                Eliminar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  console.log(
                    user.active ? "Desactivar usuario" : "Activar usuario",
                    user
                  )
                }
              >
                {user.active ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="my-8 sm:p-4 h-full w-full mx-auto max-w-7xl">
      <Head>
        <title>Gestión de Usuarios</title>
        <meta
          name="description"
          content="Administración de usuarios registrados"
        />
      </Head>
      <div className="flex flex-wrap gap-2 items-center justify-between mb-8">
        <Input
          placeholder="Filtrar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-[200px] text-accent"
        />
        <Select onValueChange={setRoleFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Todos</SelectItem>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="TECHNICAL">Técnico</SelectItem>
            <SelectItem value="USER">Normal</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setActiveFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Todos</SelectItem>
            <SelectItem value="true">Activo</SelectItem>
            <SelectItem value="false">Inactivo</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(val) => setPageSize(Number(val))}
          defaultValue="10"
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
      </div>

      <Table>
        <TableCaption>
          Lista de usuarios registrados en la base de conocimiento
        </TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-center text-accent-foreground"
                >
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
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
        >
          Anterior
        </Button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="outline"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default Account;
