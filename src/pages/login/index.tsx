import LoginForm from "@/components/forms/loginForm";

export default function LoginPage() {
  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-primary">
      <div className="absolute z-10 w-2/3 h-3/4 bg-chart-5 rounded-full blur-2xl"></div>
      <div className="absolute z-20 w-1/2 h-1/2 bg-primary rounded-full blur-2xl opacity-80"></div>

      <div className="absolute z-20 w-3/5 h-2/3 rounded-3xl bg-popover shadow-lg flex lg:flex-row flex-col sm:justify-around items-center gap-10">
        <div className="w-2/3 flex justify-center">
          <img src="../BCLIS.png" className="lg:w-3/4 ld:h-3/4 w-2/3 md:mt-8 sm:mt-4" alt="login" />
        </div>
        <div className="h-full w-full bg-popover rounded-3xl flex flex-col justify-center items-center lg:border-l-2 shadow-lg">
          <h1 className="text-5xl font-bold mb-10 text-center">Inicio de Sesión</h1>
          <div className="md:mb-8 sm:mb-4">
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
