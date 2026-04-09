import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "../config/site";

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "rgba(37, 211, 102, 0.2)",
        borderColor: "rgba(37, 211, 102, 0.4)",
        boxShadow: "0 0 30px rgba(37, 211, 102, 0.2)"
      }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] flex items-center justify-center w-16 h-16 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full text-white transition-all duration-300 group"
      aria-label="Falar no WhatsApp"
    >
      {/* Glow Sutil de fundo */}
      <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <MessageCircle size={30} strokeWidth={1.5} className="relative z-10 text-white/70 group-hover:text-[#25D366] transition-colors duration-300" />
      
      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse" />
    </motion.a>
  );
};
