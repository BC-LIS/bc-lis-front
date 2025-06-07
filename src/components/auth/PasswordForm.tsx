import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/schemas/PasswordSchema";
import { changePassword } from "@/lib/userServices";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

const PasswordForm = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data: ChangePasswordSchema) => {
    setLoading(true);
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast({
        title: "Contraseña actualizada ✅",
        description: "Tu contraseña ha sido modificada correctamente.",
      });

      form.reset();
      router.push(`/account/${username}`);
    } catch {
      toast({
        title: "Error ❌",
        description: "No se pudo cambiar la contraseña. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePassword)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña actual</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="text-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="text-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} variant="primary">
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
