import { InputLogin } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Public_Sans } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

const PSans = Public_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${PSans.className} flex items-center justify-center`}>
      <Head>
        <title>Base de conocimiento | LIS</title>
      </Head>
      <div className="flex items-center justify-center mt-16 gap-12">
        <div className="max-w-[50%] flex flex-col gap-8">
          <div>
            <h1 className="text-6xl font-semibold mb-2 bg-gradient-to-br from-secondary to-udea-500 inline-block text-transparent bg-clip-text">
              Base de conocimiento
            </h1>
            <h6 className="text-md mb-2 block text-gray-400 dark:text-gray-200">
              Laboratorio integrado de sistemas <strong>[LIS]</strong>
            </h6>
          </div>
          <p>
            <h2 className="text-2xl font-bold mb-2">¿Qué puedes encontrar?</h2>
            <p className="text-4xl mb-4 text-balance text-gray-400 dark:text-gray-200">
              Esto es una base de conocimiento para encontrar documentos sobre
              diferentes temas, entre ellos: cómo configurar una máquina
              virtual, cómo utilizar OpenVPN, entre otros..
            </p>
          </p>
        </div>
        <div>
          <Image
            width={300}
            height={300}
            sizes="100%"
            src="/BCLIS.png"
            className="object-contain"
            alt="Logo de la página"
            priority
          />
          <InputLogin icon={<Search />} placeholder="Buscar algo..." />
        </div>
      </div>
    </div>
  );
}
