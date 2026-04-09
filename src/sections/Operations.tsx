import { motion } from "motion/react";
import { Layers, ShieldCheck, TrendingUp } from "lucide-react";
import { GlassCard } from "../components/GlassCard";

export const Operations = () => {
  const operations = [
    {
      icon: <Layers size={32} strokeWidth={1} />,
      title: "Estrutura organizada",
      desc: "Processos e governança que garantem a fluidez e segurança das operações."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      title: "Integração de ativos",
      desc: "Sinergia entre diferentes frentes de negócio para maximizar resultados."
    },
    {
      icon: <TrendingUp size={32} strokeWidth={1} />,
      title: "Crescimento estruturado",
      desc: "Expansão planejada com foco em sustentabilidade e valor de longo prazo."
    }
  ];

  return (
    <section id="operação" className="section-padding bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <span className="section-label mb-4 block">Metodologia</span>
          <h2 className="text-3xl md:text-4xl font-display font-light uppercase tracking-[0.3em] text-gradient">Como o grupo opera</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {operations.map((op, idx) => (
            <GlassCard key={idx} delay={idx * 0.2}>
              <div className="flex flex-col items-center text-center">
                <div className="text-white/30 group-hover:text-white transition-colors duration-500 mb-6">
                  {op.icon}
                </div>
                <h3 className="text-sm font-display font-medium tracking-[0.2em] mb-4 uppercase text-white/80 group-hover:text-white transition-colors">
                  {op.title}
                </h3>
                <p className="text-white/40 text-base font-light leading-relaxed group-hover:text-white/60 transition-colors">
                  {op.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      {/* Background de Malha de Pontos (Dot Matrix) Intensificado */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
          }}
        />
      </div>
    </section>
  );
};
