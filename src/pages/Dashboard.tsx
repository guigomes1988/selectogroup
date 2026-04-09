import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LogOut, 
  Download, 
  Trash2, 
  Search, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const auth = localStorage.getItem("admin_auth");
      const response = await fetch("/api/admin/leads", {
        headers: { "Authorization": `Basic ${auth}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        throw new Error("Falha ao carregar leads");
      }
    } catch (error) {
      showNotification('error', 'Erro ao carregar dados do banco.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/acesso");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este lead permanentemente?")) return;

    try {
      const auth = localStorage.getItem("admin_auth");
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Basic ${auth}` }
      });

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== id));
        showNotification('success', 'Lead excluído com sucesso.');
      } else {
        throw new Error("Erro ao excluir");
      }
    } catch (error) {
      showNotification('error', 'Não foi possível excluir o lead.');
    }
  };

  const exportToCSV = () => {
    const headers = ["Nome", "E-mail", "Mensagem", "Data"];
    const csvContent = [
      headers.join(","),
      ...leads.map(l => [
        `"${l.name}"`,
        `"${l.email}"`,
        `"${l.message.replace(/"/g, '""')}"`,
        new Date(l.created_at).toLocaleDateString('pt-BR')
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_selectogroup_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Arquivo CSV gerado com sucesso.');
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light tracking-tighter mb-2">Painel de <span className="font-medium">Leads</span></h1>
          <p className="text-white/40 text-sm italic">Gestão estratégica de contatos recebidos</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/20 transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Stats & Search */}
      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Total de Leads</p>
          <p className="text-4xl font-light">{leads.length}</p>
        </div>
        
        <div className="md:col-span-2 relative self-end">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
          <input 
            type="text"
            placeholder="Pesquisar leads por nome, email ou mensagem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl py-6 pl-12 pr-6 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Data</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Nome</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">E-mail</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Mensagem</th>
                  <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <RefreshCcw className="w-8 h-8 text-white/20 animate-spin mx-auto mb-4" />
                      <p className="text-white/30 text-sm">Carregando dados sincronizados...</p>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-white/20">
                      Nenhum lead encontrado para os critérios de busca.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={lead.id} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-6 text-sm text-white/60 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-6 text-sm font-medium">{lead.name}</td>
                      <td className="p-6 text-sm text-white/60">{lead.email}</td>
                      <td className="p-6 text-sm text-white/40 max-w-xs truncate" title={lead.message}>
                        {lead.message}
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 hover:bg-red-500/10 hover:text-red-400 text-white/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl z-[100] ${
              notification.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
