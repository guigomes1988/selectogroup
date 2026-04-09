import { motion } from "motion/react";

export const About = () => {
  return (
    <section id="sobre" className="section-padding bg-black relative overflow-hidden">
      {/* Background de Grid Tecnológico Suave */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-selecto-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/50">Sobre o Grupo</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-display font-light mb-12 leading-[1.2] text-gradient pb-2 px-2 text-center md:text-left">
            Solidez na <br className="hidden md:block" />
            <span className="font-medium block mt-2 pr-4">Consolidação de Ativos</span>
          </h2>
          
          <div className="space-y-8 text-white/50 font-light leading-relaxed text-xl max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <p className="relative">
               O Selecto Group é um grupo empresarial estruturado com atuação estratégica na consolidação de ativos e no desenvolvimento de negócios.
            </p>
            <p>
               Sua atuação é baseada na construção de uma arquitetura empresarial sólida, integrando diferentes frentes sobre uma mesma lógica estratégica.
            </p>
          </div>

          <div className="mt-16 flex items-center justify-center md:justify-start gap-12 border-t border-white/5 pt-12">
            <div>
              <div className="text-2xl font-display text-white mb-1">2026</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/30">Visão Estratégica</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="text-2xl font-display text-white mb-1">Sólido</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/30">Crescimento</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative group flex justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 5, 0],
              rotateX: [0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10 w-full max-w-[650px] mx-auto perspective-1000"
          >
            <img 
              src="/symbol.png" 
              alt="Selecto Symbol" 
              className="w-full h-auto brightness-90 hover:brightness-100 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
