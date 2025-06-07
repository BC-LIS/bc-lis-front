import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { changePassword } from "@/lib/userServices";
import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/schemas/PasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { KeyRound, UserPen } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [activeTab, setActiveTab] = useState("info");
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      router.push("/account/login");
      return;
    }
    const parsed = JSON.parse(userInfo);
    setAuthenticatedUser(parsed.username);

    if (parsed.username !== username) {
      router.push("/");
    }
  }, [router, username]);

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
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "No se pudo cambiar la contraseña. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authenticatedUser !== username) return null;

  return (
    <section className="max-w-6xl mx-auto my-10 p-4">
      <Head>
        <title>Perfil de {username}</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <Card className="col-span-1 h-fit">
          <CardHeader className="text-center">
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs>
              <TabsList className="flex flex-col h-fit gap-4">
                <TabsTrigger
                  value="info"
                  className="w-full flex gap-4"
                  onClick={() => setActiveTab("info")}
                >
                  <UserPen />
                  <span>Información general</span>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="w-full flex gap-4"
                  onClick={() => setActiveTab("password")}
                >
                  <KeyRound />
                  <span>Cambiar contraseña</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="col-span-1 md:col-span-3">
          <Tabs value={activeTab}>
            {/* Info General Placeholder */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Información general</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aquí se editará la información general del perfil.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cambiar contraseña */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar contraseña</CardTitle>
                </CardHeader>
                <CardContent>
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
                              <Input type="password" {...field} />
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
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={loading}
                        variant="primary"
                      >
                        {loading ? "Guardando..." : "Guardar cambios"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
