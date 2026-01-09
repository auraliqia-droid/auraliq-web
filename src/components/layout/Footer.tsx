import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-10 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-3 font-semibold text-white text-lg">
          <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-slate-800 shadow-sm bg-slate-900">
            <Image src="/auraliq-logo.svg" alt="Auraliq IA" fill className="object-cover" sizes="36px" />
          </div>
          <div className="flex flex-col leading-tight">
            <span>Auraliq IA</span>
            <span className="text-xs font-medium text-slate-400">Voz y texto listos para vender</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-300">
          <Link href="#terminos" className="hover:text-white transition-colors">
            Términos y condiciones
          </Link>
          <Link href="#privacidad" className="hover:text-white transition-colors">
            Política de privacidad
          </Link>
        </div>

        <p className="text-slate-500">© {new Date().getFullYear()} Auraliq IA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
