import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

interface FormSchema {
  fileName: string;
  fileDescription: string;
  category:
    | "SERVIDORES"
    | "COMPUTADORAS"
    | "REDES"
    | "BASE_DE_DATOS"
    | "SEGURIDAD"
    | "SISTEMAS_OPERATIVOS"
    | "PROGRAMACIÓN"
    | "OTROS";
  fileReceiver: "ADMINISTRATIVO" | "TÉCNICO" | "DOCENTE" | "ESTUDIANTE";
  fileState: "PUBLICADO" | "BORRADOR" | "ARCHIVADO";
  fileAuthor: string;
}

interface SelectInputProps {
  field: ControllerRenderProps<FormSchema, keyof FormSchema>; // Aquí usas el esquema directamente
  options: string[]; // Para las opciones de tu select
}

export const SelectInput = ({ field, options }: SelectInputProps) => (
  <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      {options.map((option, index) => (
        <SelectItem key={index} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
