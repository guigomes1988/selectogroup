import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, Mail, ChevronRight } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simples validação no frontend (a segurança real está na API)
    if (email === "guigomespublI@gmail.com" && password === "Alvinh02704@") {
      localStorage.setItem("admin_auth", btoa(`${email}:${password}`));
      navigate("/painel");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Brilho decorativo */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          
          <div className="text-center mb-8 relative">
            <h1 className="text-2xl font-light tracking-widest text-white uppercase mb-2">Acesso</h1>
            <p className="text-white/40 text-sm">Selecto Group | Gestão de Leads</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/60 ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/60 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full group bg-white text-black py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-[0.98]"
            >
              Entrar no Painel
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate("/")}
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            ← Voltar para o site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
