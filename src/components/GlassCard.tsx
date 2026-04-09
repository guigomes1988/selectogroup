import { motion } from "motion/react";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-white/20 transition-all duration-500 ${className}`}
      style={{
        background: '#080808'
      }}
    >
      {/* Brilho Superior de Reflexo (Simulando luz batendo no vidro) */}
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
      
      {/* Borda interna de realce (Topo e Esquerda) */}
      <div className="absolute inset-0 p-[1px] rounded-2xl pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-t border-l border-white/10 group-hover:border-white/30 transition-colors duration-500" />
      </div>

      {/* Conteúdo */}
      {/* Conteúdo */}
      <div className="relative z-10 p-6 py-10 md:px-10 md:pb-10 md:pt-[80px] h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
