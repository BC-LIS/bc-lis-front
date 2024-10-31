import { File, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { fileStatesRenderDashboard } from "@/constants/FormFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {useGetDocuments} from "@/hooks/useGetDocuments";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


export function Dashboard() {
  const ENDPOINT_DOCUMENTS_ALL = process.env.NEXT_PUBLIC_API_URL_DOCUMENTS_All;
  const {documents, loading}= useGetDocuments(`${ENDPOINT_DOCUMENTS_ALL}`); 
      
  const getBadgeVariant = (state: string) => {
    switch (state) {
      case "PUBLISHED":
        return "default"; // Verde para documentos publicados
      case "DRAFT":
        return "warning"; // Amarillo para borradores
      case "ARCHIVED":
        return "destructive"; // Rojo para documentos archivados
      default:
        return "default"; 
    }
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex items-center gap-4 justify-between p-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] text-base font-semibold"
          />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList className="flex gap-2">
              {fileStatesRenderDashboard.map((state, index ) => (
                <TabsTrigger 
                  key={index} 
                  value={state.value}
                >
                  {state.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="ml-auto flex items-center gap-2">
              <Link href="#" target="_blank">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-base hover:shadow-[inset_13em_0_0_0_var(--accent)] inline-flex items-center justify-center rounded-md hover:rounded-tr-3xl transition-all duration-300"
                >
                  <File className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exportar
                  </span>
                </Button>
              </Link>
              <Link href="/file/register" target="_blank">
                <Button
                  size="sm"
                  variant={"primary"}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Añadir archivo
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="ALL">
            <Card>
              <CardHeader>
                <CardTitle>Archivos</CardTitle>
                <CardDescription>Administra tus archivos aquí.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Imagen</span>
                      </TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Creado
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Actualizado
                      </TableHead> 
                      <TableHead>
                        <span className="sr-only">Acciones</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <LoadingSpinner size={48}/>
                          </TableCell>
                        </TableRow>
                      ) : (
                        documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="hidden sm:table-cell">
                              <File className="h-5 w-5" />
                            </TableCell>

                            {/* hover to the description */}    
                            <TableCell>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div className="cursor-pointer underline-offset-4 hover:underline">
                                    <Link href={`/file/${doc.id}`} target="_blank">
                                      {doc.name}
                                    </Link>
                                  </div> 
                                </HoverCardTrigger>
                                <HoverCardContent className="justify-between space-y-1 space-x-1 w-60">
                                    <h1 className="font-bold p-2 border-b-2">Descripción</h1>
                                    <p className="text-sm">{doc.description}</p>
                                </HoverCardContent>  
                              </HoverCard>
                            </TableCell> 

                            <TableCell>
                              <Badge variant={getBadgeVariant(doc.state)}>{doc.state}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(doc.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                  <Link href="#" target="_blank">
                                    <DropdownMenuItem>Abrir</DropdownMenuItem>
                                  </Link>
                                  <DropdownMenuItem>Editar</DropdownMenuItem>
                                  <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
