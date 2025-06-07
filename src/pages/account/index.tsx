import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { UserTable } from "@/components/layout/accounts/UserTable";

function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      router.push("/account/login");
      return;
    }

    const user = JSON.parse(userInfo);
    if (user?.role !== "ADMIN") {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner size={48} />
        <span className="text-lg font-bold mt-4">
          No tienes permisos para acceder a esta página
        </span>
      </div>
    );
  }

  return (
    <div className="my-8 sm:p-4 h-full w-full mx-auto max-w-7xl">
      <Head>
        <title>Gestión de Usuarios</title>
        <meta
          name="description"
          content="Administración de usuarios registrados"
        />
      </Head>
      <UserTable />
    </div>
  );
}

export default AccountPage;
