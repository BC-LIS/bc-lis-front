import LoginForm from "@/components/forms/loginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex w-full h-[100vh] items-center justify-center overflow-hidden">
      {/* Fondos difuminados */}
      <div className="absolute z-10 w-2/3 h-3/4 bg-udea-950 rounded-full blur-2xl"></div>
      <div className="absolute z-20 w-1/2 h-1/2 bg-primary rounded-full blur-2xl opacity-80"></div>

      {/* Card principal */}
      <div className="relative z-30 w-full max-w-4xl max-h-[80vh] lg:h-auto rounded-3xl bg-popover shadow-lg flex flex-col lg:flex-row sm:justify-around items-center gap-4 p-6">
        {/* Imagen */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width={0}
            height={0}
            sizes="100%"
            src="/BCLIS.png"
            className="lg:w-3/4 w-2/3"
            alt="Imagen login"
            priority
          />
        </div>

        {/* Formulario */}
        <div className="w-full lg:w-1/2 bg-popover rounded-3xl flex flex-col justify-center items-center lg:border-l-2 shadow-lg p-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Inicio de Sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
