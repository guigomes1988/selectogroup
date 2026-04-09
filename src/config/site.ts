export const siteConfig = {
  name: "Selecto Group",
  seo: {
    title: "Selecto Group | Arquitetura Empresarial Estratégica",
    description: "Arquitetura empresarial sólida para o crescimento exponencial de ativos e negócios. Soluções premium em Capital, Imobiliário e Desenvolvimento.",
    keywords: "investimentos, imobiliário, desenvolvimento, capital, estratégia empresarial",
  },
  description: "Arquitetura empresarial sólida para o crescimento exponencial de ativos e negócios.",
  
  // Contato e Localização
  contact: {
    email: "contato@selectogroup.com.br",
    address: "Endereço do Grupo, São Paulo - SP",
    phone: "+55 11 0000-0000",
  },

  // WhatsApp Flutuante
  whatsapp: {
    number: "5511999999999", // Apenas números, com DDI (55) e DDD
    message: "Olá! Gostaria de saber mais sobre a estrutura do Selecto Group.",
    formMessage: "Olá! Gostaria de iniciar um atendimento.\n\n*Dados do Lead*:\n- *Nome*: {name}\n- *Email*: {email}\n\n*Mensagem*:\n{message}",
  },

  // Redes Sociais
  social: {
    linkedin: "https://www.linkedin.com/company/selectogroup",
    instagram: "https://www.instagram.com/selecto.group",
  },

  // Endpoints de API
  api: {
    leads: "http://localhost:3001/api/leads", // Altere para a URL de produção futuramente
  }
};

export type SiteConfig = typeof siteConfig;
