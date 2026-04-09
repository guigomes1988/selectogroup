import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { GlassCard } from "../components/GlassCard";

export const Verticals = () => {
  const verticals = [
    {
      title: "Selecto Capital",
      logo: "/selecto-capital.png",
      color: "#066FDE",
      desc: "Estrutura de participações e organização estratégica dos negócios do grupo."
    },
    {
      title: "Selecto Negócios Imobiliários",
      logo: "/selecto-negocios.png",
      color: "#C08D5A",
      desc: "Atuação em ativos e operações imobiliárias com visão estruturada de crescimento."
    },
    {
      title: "Selecto Desenvolvimento Empresarial",
      logo: "/selecto-desenvolvimento.png",
      color: "#BA2252",
      desc: "Expansão e desenvolvimento estratégico de operações empresariais."
    }
  ];

  return (
    <section id="verticais" className="section-padding bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 text-center md:text-left">
          <span className="section-label mb-4 block">Ecossistema</span>
          <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-[0.3em] text-gradient">O Grupo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verticals.map((v, idx) => (
            <GlassCard key={idx} delay={idx * 0.2}>
              <div className="flex flex-col items-center text-center h-full relative z-10">
                <div className="mb-16 flex justify-center items-center h-20 w-full">
                  <img 
                    src={v.logo} 
                    alt={v.title} 
                    className="max-w-[200px] w-full h-auto object-contain brightness-90 group-hover:brightness-100 transition-all duration-500"
                  />
                </div>

                <h3 className="text-sm font-display font-medium tracking-[0.2em] mb-4 uppercase text-white/80 group-hover:text-white transition-colors">
                  {v.title}
                </h3>
                <p className="text-white/40 text-base font-light leading-relaxed mb-8 grow group-hover:text-white/60 transition-colors">
                  {v.desc}
                </p>
                
                {/* Borda inferior colorida (Highlight) - Cores Exatas Aplicadas */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[3px] z-20 opacity-70 group-hover:opacity-100 transition-all duration-500"
                  style={{ 
                    backgroundColor: v.color,
                    boxShadow: `0 0 15px ${v.color}20` 
                  }}
                />
              </div>

              {/* Glow sutil ao fundo do card usando a cor exata */}
              <div 
                className="absolute -bottom-10 -right-10 w-32 h-32 opacity-5 blur-[50px] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: v.color }}
              />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
