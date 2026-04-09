import { motion } from "motion/react";

interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: string;
  delay?: number;
}

export const GlowEffect = ({ 
  className = "", 
  color = "rgba(255,255,255,0.05)", 
  size = "600px",
  delay = 0 
}: GlowEffectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay }}
      className={`absolute pointer-events-none rounded-full blur-[120px] ${className}`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        zIndex: 0
      }}
    />
  );
};
