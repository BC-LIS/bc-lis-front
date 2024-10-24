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
  name: string;
  description: string;
  categories:
    | "SERVIDORES"
    | "COMPUTADORAS"
    | "REDES"
    | "BASE_DE_DATOS"
    | "SEGURIDAD"
    | "Docker"
    | "servers"
    | "string";
  typeName: "programming" | "administrative" | "both";
  state: "PUBLISHED" | "ARCHIVED" | "DRAFT";
  username: string;
  file: File;
}

interface SelectInputProps {
  field: ControllerRenderProps<FormSchema, keyof FormSchema>;
  placeholder: string;
  options: string[];
}

export const SelectInput = ({
  field,
  placeholder,
  options,
}: SelectInputProps) => (
  <Select onValueChange={field.onChange}>
    <FormControl>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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
