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
} from "@/components/ui/hover-card";
import { fileRecievers, fileStatesRenderDashboard } from "@/constants/FormFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useFilteredDocuments } from "@/hooks/useGetDocuments";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getBadgeVariant } from "@/utils/badgeUtils";
import { DocumentsFilters, Document } from "@/types/DocumentTypes";
import { useEffect,  useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { DateFilterInput } from "@/components/ui/dateFilter";

export function Dashboard() {
  //Inicializacion de los estados
  const [ documents, setDocuments ] = useState<Document[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [searchField, setSearchField] = useState<"name" | "description" | "username">("name");
  const [searchValue, setSearchValue] = useState(""); 
  const [typeName, setTypeName] = useState("");

  const [filterParams, setFilterParams] = useState<DocumentsFilters>({
    state: "",
    typename: "",
    categories: "",
    createdBefore: "",
    updatedBefore: "",
    createdAfter: "",
    updatedAfter: "",
  });

  //Hooks
  const { fetchFilteredDocuments } = useFilteredDocuments();

  //Endpoints
  const ENDPOINT_DOCUMENTS_FILTER = process.env.NEXT_PUBLIC_API_URL_DOCUMENTS_FILTER;

  useEffect(() => {
    setFilterParams((prev) => ({ ...prev, typename: typeName || "" }));
  }, [typeName]);

  useEffect(() => {
    const {...otherFilters } = filterParams;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const notEmptyFilters = Object.fromEntries(Object.entries(otherFilters).filter(([_, value]) => value !== ""));

    const loadDocuments = async () => {
      setLoading(true);
      const data = await fetchFilteredDocuments(`${ENDPOINT_DOCUMENTS_FILTER}`, notEmptyFilters);
    
      // Filtrar documentos en el frontend para búsquedas parciales y fechas
      const filteredData = data.filter((doc: Document) => {
        const createdAt = new Date(doc.createdAt);
        const updatedAt = new Date(doc.updatedAt);
        console.log(doc.type.name);
        
        // Condiciones de filtrado por fechas
        const passesCreatedAfter = otherFilters.createdAfter
          ? createdAt >= new Date(otherFilters.createdAfter)
          : true;
    
        const passesCreatedBefore = otherFilters.createdBefore
          ? createdAt <= new Date(otherFilters.createdBefore)
          : true;
    
        const passesUpdatedAfter = otherFilters.updatedAfter
          ? updatedAt >= new Date(otherFilters.updatedAfter)
          : true;
    
        const passesUpdatedBefore = otherFilters.updatedBefore
          ? updatedAt <= new Date(otherFilters.updatedBefore)
          : true;
        
        let passesSearchFilter = true;
        const value = searchValue.toLowerCase();

        if (value) {
          if (searchField === "name") {
            passesSearchFilter =  doc.name 
              ? doc.name.toLowerCase().includes(value) 
              : false;
          } else if (searchField === "description") {
            // Verificar si description existe antes de intentar usar includes
            console.log(doc.description);
            passesSearchFilter = doc.description 
              ? doc.description.toLowerCase().includes(value) 
              : false;
          } else if (searchField === "username") {
            // Verificar si user y username existen
            console.log(doc.user);
            passesSearchFilter = doc.user
              ? doc.user.username.toLowerCase().includes(value) 
              : false;
          }
        }
        
        // Retornar true si pasa todas las condiciones
        return (
          passesCreatedAfter &&
          passesCreatedBefore &&
          passesUpdatedAfter &&
          passesUpdatedBefore &&
          passesSearchFilter
        );
      });
    
      setDocuments(filteredData);
      setLoading(false);
    };
      
      loadDocuments();
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterParams, searchField, searchValue]);
    
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex items-center gap-4 justify-between p-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="font-semibold">
              Filtrar por:
            </Button>
          </PopoverTrigger>
            <PopoverContent className="w-80 flex flex-col gap-4">
              <DateFilterInput
                label="Creado después de:"
                value={filterParams.createdAfter}
                onChange={value => setFilterParams(prev => ({ ...prev, createdAfter: value }))}
              />
              <DateFilterInput
                label="Creado antes de:"
                value={filterParams.createdBefore}
                onChange={value => setFilterParams(prev => ({ ...prev, createdBefore: value }))}
              />
              <DateFilterInput
                label="Actualizado después de:"
                value={filterParams.updatedAfter}
                onChange={value => setFilterParams(prev => ({ ...prev, updatedAfter: value }))}
              />
              <DateFilterInput
                label="Actualizado antes de:"
                value={filterParams.updatedBefore}
                onChange={value => setFilterParams(prev => ({ ...prev, updatedBefore: value }))}
              />
              <div>
                  <Label className="text-base font-semibold">Tipo:</Label>
                  <Select
                    value={typeName}
                    onValueChange={(value: string) => setTypeName(value === "all" ? "" : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem> 
                      {fileRecievers.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
          </PopoverContent>
        </Popover>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] text-base font-semibold"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
            <Select value={searchField} onValueChange={v => setSearchField(v as "name" | "description" | "username")}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Buscar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="description">Descripción</SelectItem>
              <SelectItem value="username">Usuario</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="ALL">
          <div className="flex items-center">
            <TabsList className="flex gap-2">
              {fileStatesRenderDashboard.map((state, index ) => (
                <TabsTrigger 
                  key={index} 
                  value={state.value}
                  onClick={() => (
                      setFilterParams(prevFilters => ({ 
                        ...prevFilters, 
                        state: state.value === "ALL" ? "" : state.value 
                      }))
                  )}
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
                  className="h-7 gap-1 text-base hover:shadow-[inset_7em_0_0_0_var(--accent)] inline-flex items-center justify-center rounded-md transition-all duration-300"
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
              <TabsContent value={filterParams.state || "ALL"}>
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
                                <div className="flex justify-center items-center ">
                                  <LoadingSpinner size={48} />
                                </div>
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
                                      <DropdownMenuItem>Abrir</DropdownMenuItem>
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