import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Estrutura", href: "#estrutura" },
    { name: "Sobre", href: "#sobre" },
    { name: "Operação", href: "#operação" },
    { name: "O Grupo", href: "#verticais" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className={`max-w-5xl mx-auto px-6 transition-all duration-500 ${
        isScrolled ? "scale-95" : "scale-100"
      }`}>
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/selecto-group-logo.png" 
              alt="Selecto Group Logo" 
              className="h-[50px] md:h-[70px] w-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[13px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#contato"
              className="hidden sm:block px-6 py-2.5 bg-white text-black text-[12px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white/90 transition-all text-center"
            >
              Contato
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white/70 hover:text-white" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs uppercase tracking-[0.3em] text-white/60"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato"
                className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-bold rounded-xl text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
