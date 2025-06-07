import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { generalInfoSchema, GeneralInfoSchema } from "@/schemas/UserInfoSchema";

const GeneralInfoForm = () => {
  const ENDPOINT_UPDATE_PROFILE = process.env.NEXT_PUBLIC_API_URL_USERS;

  const form = useForm<GeneralInfoSchema>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      form.setValue("name", parsed.name || "");
      form.setValue("lastname", parsed.lastname || "");
    }
  }, [form]);

  const handleSubmit = async (data: GeneralInfoSchema) => {
    try {
      const token = localStorage.getItem("session");

      const response = await fetch(
        `${ENDPOINT_UPDATE_PROFILE}?username=${username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "No se pudo actualizar tu perfil.",
        });
        return;
      }

      // Actualizar localStorage con los nuevos datos
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const updatedUser = {
          ...parsedUser,
          name: data.name,
          lastname: data.lastname,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      }

      toast({
        title: "Perfil actualizado ✅",
        description: "Tu información fue guardada correctamente.",
      });

      // Recargar la página para reflejar los cambios
      router.reload();
    } catch {
      toast({
        title: "Error ❌",
        description: "Ocurrió un problema al actualizar tu perfil.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} className="text-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input {...field} className="text-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary">
          Guardar cambios
        </Button>
      </form>
    </Form>
  );
};

export default GeneralInfoForm;
