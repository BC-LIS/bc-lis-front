  import Head from "next/head";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
  import { KeyRound, UserPen } from "lucide-react";
  import GeneralInfoForm from "@/components/auth/GeneralInfoForm";
  import PasswordForm from "@/components/auth/PasswordForm";

  const ProfilePage = () => {
    const router = useRouter();
    const { username } = router.query;
    const [activeTab, setActiveTab] = useState("info");
    const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(
      null
    );

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

          {/* Formularios */}
          <div className="col-span-1 md:col-span-3">
            <Tabs value={activeTab}>
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Información general</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GeneralInfoForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PasswordForm />
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
