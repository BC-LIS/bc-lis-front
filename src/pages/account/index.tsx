import { User } from "@/types/UserTypes";
import React, { useCallback, useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
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
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { UserPlus, Eraser } from "lucide-react";

type UserWithRole = User & {
  role: {
    roleName: string;
  };
  isActive: boolean;
};

function Account() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ENDPOINT_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;

  const fetchUsers = useCallback(
    async ({
      page,
      size,
      name,
      role,
      isActive,
    }: {
      page: number;
      size: number;
      name?: string;
      role?: string;
      isActive?: string;
    }) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (name) params.append("name", name);
      if (role) params.append("role", role);
      if (isActive !== undefined && isActive !== "")
        params.append("isActive", isActive);

      try {
        const response = await fetch(`${ENDPOINT_USERS}?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        });

        if (!response.ok) {
          toast({
            title: "Error ❌",
            description: "Ha ocurrido un error al obtener los usuarios",
          });
        }

        return response.json();
      } catch (error) {
        toast({
          title: "Error ❌",
          description: `Ha ocurrido un error en la solicitud`,
        });
      }
    },
    [ENDPOINT_USERS]
  );

  useEffect(() => {
    fetchUsers({
      page: pageIndex,
      size: pageSize,
      name: nameFilter,
      role: roleFilter,
      isActive: activeFilter,
    }).then((data) => {
      const sortedData = data.content.sort((a: UserWithRole, b: UserWithRole) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedData);
      setTotalPages(data.page.totalPages);
    });
  }, [pageIndex, pageSize, nameFilter, roleFilter, activeFilter, fetchUsers]);

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
                onClick={() =>
                  console.log(user.isActive ? "Desactivar" : "Activar", user)
                }
              >
                {user.isActive ? "Desactivar" : "Activar"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Eliminar", user)}
                className="text-destructive"
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
    state: {
      pagination: {
        pageSize,
        pageIndex,
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
                <TableHead key={header.id} className="text-accent-foreground">
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
    </div>
  );
}

export default Account;
