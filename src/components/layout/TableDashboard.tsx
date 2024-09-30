import Link from "next/link"
import React, { useRef } from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input, InputFile } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger
} from "@/components/ui/dialog"
import { FilePlus2 } from "lucide-react"
  

export default function TableDashboard() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex h-14 items-center gap-4 justify-between px-4 pb-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <BreadcrumbList> 
            <BreadcrumbItem>
                <BreadcrumbLink href="#">
                    <Link href="#">Tablero</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Archivos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Todos los Archivos</BreadcrumbPage>
              </BreadcrumbItem>
        </BreadcrumbList>
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
            <div className="flex items-center justify-center">
                <TabsList >
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="active">Activos</TabsTrigger>
                    <TabsTrigger value="draft">Borradores</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archivados
                    </TabsTrigger>
                </TabsList>
            
                <div className="ml-auto flex items-center justify-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filtrar
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked> Activos </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem> Borradores </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem> Archivados </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" variant="outline" className="h-7 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Exportar
                        </span>
                    </Button>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="secondary" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Añadir archivo
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Añadir por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem> Crear </DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem> Adjuntar </DropdownMenuItem>
                                </DialogTrigger>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                            <DialogTitle>Share link</DialogTitle>
                            <DialogDescription>
                                Anyone who has this link will be able to view this.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2 cursor-pointer">
                                <InputFile
                                    type="file"
                                    ref={fileInputRef}
                                />
                            </div>
                            <div>
                                <Button 
                                    type="submit" 
                                    size="sm" 
                                    variant="secondary"
                                    className="px-3"
                                    onClick={handleButtonClick}
                                >
                                    <span className="sr-only">Copy</span>
                                    <FilePlus2 className="h-4 w-4" />
                                </Button>
                                <InputFile 
                                    type="file" 
                                    ref={fileInputRef}
                                    style={{display: "none"}}
                                />

                            </div>
                            </div>
                            <DialogFooter className="sm:justify-between">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cerrar
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit" variant="secondary">
                                        Adjuntar
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Archivos</CardTitle>
                        <CardDescription>
                            Administra tus archivos aquí.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>

                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Creado</TableHead>
                                    <TableHead className="hidden md:table-cell">Actualizado</TableHead>

                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="hidden sm:table-cell">
                                        <File className="h-5 w-5"/>
                                    </TableCell>
                                    <TableCell className="">Archivo 1</TableCell>
                                    <TableCell>
                                        <Badge variant="default">Activo</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">2021-09-01</TableCell>
                                    <TableCell className="hidden md:table-cell">2021-09-01</TableCell> 
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
