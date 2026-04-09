import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { GlassCard } from "../components/GlassCard";
import { siteConfig } from "../config/site";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(siteConfig.api.leads, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        
        // Preparar mensagem para WhatsApp
        const waMessage = siteConfig.whatsapp.formMessage
          .replace("{name}", formData.name)
          .replace("{email}", formData.email)
          .replace("{message}", formData.message);
        
        const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(waMessage)}`;
        
        // Redirecionar após um pequeno delay para o usuário ver o "Sucesso"
        setTimeout(() => {
          window.open(whatsappUrl, "_blank");
          setFormData({ name: "", email: "", message: "" });
        }, 1500);

      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="section-padding bg-black relative">
      <div className="max-w-4xl mx-auto">
        <GlassCard>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-light uppercase tracking-widest mb-4">Fale com o Grupo</h2>
            <p className="text-white/40 font-light">Sua visão estratégica começa com uma estrutura sólida.</p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="py-12 flex flex-col items-center gap-6"
            >
              <CheckCircle2 size={64} className="text-white opacity-80" />
              <p className="text-xl font-light text-white/80">Mensagem recebida com sucesso!</p>
              <button 
                onClick={() => setStatus("idle")} 
                className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white underline underline-offset-8 transition-all"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] uppercase tracking-[0.4em] text-white/30 ml-4">Nome</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-base focus:outline-none focus:border-white/40 transition-all font-light"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] uppercase tracking-[0.4em] text-white/30 ml-4">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-base focus:outline-none focus:border-white/40 transition-all font-light"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[11px] uppercase tracking-[0.4em] text-white/30 ml-4">Mensagem</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[30px] px-6 py-5 text-base focus:outline-none focus:border-white/40 transition-all font-light resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <div className="flex justify-center pt-6">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="group flex items-center gap-3 px-12 py-5 bg-white text-black text-[11px] uppercase tracking-[0.4em] font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              
              {status === "error" && (
                <p className="text-center text-red-400 text-xs uppercase tracking-widest">Ocorreu um erro. Tente novamente.</p>
              )}
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
