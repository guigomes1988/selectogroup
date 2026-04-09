import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qual o foco principal do Selecto Group?",
      answer: "Nosso foco é a consolidação de ativos e o desenvolvimento estratégico de negócios através de uma arquitetura empresarial robusta e governança sólida."
    },
    {
      question: "Como as verticais se integram?",
      answer: "As verticais (Capital, Imobiliária e Desenvolvimento) operam sob uma lógica estratégica unificada, permitindo sinergia entre ativos e operações para maximizar o valor de longo prazo."
    },
    {
      question: "O grupo atua em quais regiões?",
      answer: "Atuamos em mercados estratégicos nacionais, focando em oportunidades que permitam escala e crescimento estruturado."
    },
    {
      question: "Como entrar em contato para parcerias?",
      answer: "Você pode utilizar o formulário de contato abaixo ou nos enviar um email direto. Nossa equipe de estratégia analisará a sinergia com o grupo."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-light uppercase tracking-[0.3em] mb-4">FAQ</h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-8 flex justify-between items-center text-left group"
              >
                <span className="text-sm uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                  {idx + 1}. {faq.question}
                </span>
                {openIndex === idx ? (
                  <Minus size={16} className="text-white/40" />
                ) : (
                  <Plus size={16} className="text-white/40 group-hover:text-white transition-colors" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-white/40 font-light text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
