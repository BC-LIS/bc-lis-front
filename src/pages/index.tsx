import { Public_Sans } from "next/font/google";

const PSans = Public_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`${PSans.className} flex items-center justify-center px-8 gap-12 sm:p-20`}
    >
      Pagina inicial
    </div>
  );
}
