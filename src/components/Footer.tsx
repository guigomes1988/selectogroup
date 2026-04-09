import { Linkedin, Instagram } from "lucide-react";
import { siteConfig } from "../config/site";

export const Footer = () => {
  return (
    <footer className="bg-black pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 text-center md:text-left">
          {/* Logo e Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <img 
                src="/selecto-group-logo.png" 
                alt="Selecto Group Logo" 
                className="h-[120px] w-auto object-contain brightness-75 hover:brightness-100 transition-all"
              />
            </div>
            <p className="text-xs text-white/30 tracking-widest leading-relaxed max-w-xs mx-auto md:mx-0">
              Arquitetura empresarial sólida para o crescimento exponencial de ativos e negócios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-6">Grupo</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#estrutura" className="hover:text-white transition-colors">Estrutura</a></li>
              <li><a href="#operação" className="hover:text-white transition-colors">Operação</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-6">Negócios</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] text-white/40">
              <li><a href="#verticais" className="hover:text-white transition-colors">Capital</a></li>
              <li><a href="#verticais" className="hover:text-white transition-colors">Imóveis</a></li>
              <li><a href="#verticais" className="hover:text-white transition-colors">Desenvolvimento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-6">Social</h4>
            <div className="flex gap-6 justify-center md:justify-start">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-all transform hover:-translate-y-1">
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-all transform hover:-translate-y-1">
                <Instagram size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 opacity-30">
          <div className="text-[10px] uppercase tracking-[0.3em]">
            © 2026 Selecto Group. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
