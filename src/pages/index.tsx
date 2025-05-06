import { InputLogin } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Public_Sans } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const PSans = Public_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${PSans.className} min-h-screen flex items-start md:items-center justify-center px-4 pt-4 md:pt-8`}>
      <Head>
        <title>Base de conocimiento | LIS</title>
      </Head>
      
      {/* Vista móvil - estructura vertical */}
      <div className="flex flex-col w-full md:hidden mt-8 sm:mt-12">
        {/* Título centrado para móvil */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-semibold mb-2 bg-gradient-to-br from-secondary to-udea-500 inline-block text-transparent bg-clip-text">
            Base de conocimiento
          </h1>
          <h6 className="text-sm block text-gray-400 dark:text-gray-200">
            Laboratorio integrado de sistemas <strong>[LIS]</strong>
          </h6>
        </div>
        
        {/* Imagen y búsqueda (centradas) */}
        <div className="flex flex-col items-center justify-center my-6">
          <Image
            width={300}
            height={300}
            src="/BCLIS.png"
            className="object-contain w-48 sm:w-64 max-w-[300px]"
            alt="Logo de la página"
            priority
          />
          <div className="w-full px-4 sm:px-8 mt-4 flex justify-center">
            <div className="w-full max-w-[300px]">
              <InputLogin icon={<Search />} placeholder="Buscar algo..." />
            </div>
          </div>
        </div>
        
        {/* Texto descriptivo */}
        <article className="mt-6 text-center">
          <h2 className="text-lg sm:text-xl font-bold mb-2">¿Qué puedes encontrar?</h2>
          <p className="text-xl text-balance text-gray-400 dark:text-gray-200">
            Esto es una base de conocimiento para encontrar documentos sobre
            diferentes temas, entre ellos: cómo configurar una máquina
            virtual, cómo utilizar OpenVPN, entre otros..
          </p>
        </article>
      </div>
      
      {/* Vista desktop - estructura original con dos columnas */}
      <div className="hidden md:flex md:flex-row items-center justify-center gap-12 w-full max-w-7xl mx-auto">
        {/* Columna izquierda - textos */}
        <div className="max-w-[50%] flex flex-col gap-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-semibold mb-2 bg-gradient-to-br from-secondary to-udea-500 inline-block text-transparent bg-clip-text">
              Base de conocimiento
            </h1>
            <h6 className="text-md mb-2 block text-gray-400 dark:text-gray-200">
              Laboratorio integrado de sistemas <strong>[LIS]</strong>
            </h6>
          </div>
          
          <article>
            <h2 className="text-2xl font-bold mb-2">¿Qué puedes encontrar?</h2>
            <p className="text-3xl lg:text-4xl mb-4 text-balance text-gray-400 dark:text-gray-200">
              Esto es una base de conocimiento para encontrar documentos sobre
              diferentes temas, entre ellos: cómo configurar una máquina
              virtual, cómo utilizar OpenVPN, entre otros..
            </p>
          </article>
        </div>
        
        {/* Columna derecha - imagen y búsqueda */}
        <div className="flex flex-col items-center">
          <Image
            width={300}
            height={300}
            src="/BCLIS.png"
            className="object-contain max-w-[300px]"
            alt="Logo de la página"
            priority
          />
          <div className="w-full max-w-md mt-4">
            <InputLogin icon={<Search />} placeholder="Buscar algo..." />
          </div>
        </div>
      </div>
    </div>
  );
}