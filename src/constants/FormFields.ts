type InputField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  description: string;
};

export const inputFields: InputField[] = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Fulano",
    type: "text",
    description: "Ingresa tu nombre",
  },
  {
    name: "lastname",
    label: "Apellido",
    placeholder: "Fulanita",
    type: "text",
    description: "Ingresa tu apellido",
  },
  {
    name: "password",
    label: "Contraseña",
    placeholder: "********",
    type: "password",
    description: "Al menos 8 caracteres",
  },
  {
    name: "email",
    label: "Correo",
    placeholder: "fulano.fulanita@udea.edu.co",
    type: "email",
    description: "Ingresa un correo válido",
  },
];
