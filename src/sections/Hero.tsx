import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GlowEffect } from "../components/GlowEffect";
import { useEffect } from "react";

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section 
      id="estrutura" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black cursor-none md:cursor-default"
    >
      {/* Imagem de Fundo Suave */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] grayscale transition-transform duration-[10s] hover:scale-110"
          style={{ 
            backgroundImage: "url('/bg-hero.jpg')",
          }}
        />
        {/* Máscara de Gradiente para suavizar a imagem */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Glow interativo que segue o mouse */}
      <motion.div
        className="pointer-events-none absolute z-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)",
          left: dx,
          top: dy,
          x: "-50%",
          y: "-50%",
        }}
      />


      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          {/* Badge Topo */}
          <motion.div 
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 flex flex-col items-center relative"
          >
             <div className="h-[120px] md:h-[200px] flex items-center justify-center relative z-10">
                <img 
                  src="/selecto-group-logo.png" 
                  alt="Selecto Group Logo" 
                  className="h-full w-auto object-contain"
                />
             </div>
          </motion.div>

          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-7xl lg:text-8xl font-display font-light leading-[1.1] mb-8"
          >
            <motion.span variants={wordVariants} className="inline-block mr-4 text-gradient">Crescimento</motion.span> <br />
            <motion.span variants={wordVariants} className="inline-block font-medium text-gradient">Estruturado</motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            O Selecto Group integra ativos, operação e estratégia em uma estrutura sólida, orientada por governança e visão de longo prazo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a 
              href="#sobre"
              className="group relative px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold rounded-full overflow-hidden transition-all duration-500 hover:pr-14 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10">Conhecer a estrutura</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500" size={16} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Grid Lines sutil no fundo */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none" />
    </section>
  );
};
