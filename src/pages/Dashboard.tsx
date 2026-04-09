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
  AlertCircle,
  Users,
  MessageSquare,
  Plus,
  Mail,
  Lock,
  UserPlus
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface AdminUser {
  id: number;
  email: string;
  created_at: string;
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  // States para novo usuário
  const [showAddUser, setShowAddUser] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();
  const auth = localStorage.getItem("admin_auth");

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads", {
        headers: { "Authorization": `Basic ${auth}` }
      });
      if (response.ok) setLeads(await response.json());
    } catch (error) {
      showNotification('error', 'Erro ao carregar leads.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: { "Authorization": `Basic ${auth}` }
      });
      if (response.ok) setAdminUsers(await response.json());
    } catch (error) {
      showNotification('error', 'Erro ao carregar usuários.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    if (activeTab === 'leads') await fetchLeads();
    else await fetchUsers();
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/acesso");
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm("Excluir este lead permanentemente?")) return;
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Basic ${auth}` }
      });
      if (response.ok) {
        setLeads(leads.filter(l => l.id !== id));
        showNotification('success', 'Lead excluído.');
      }
    } catch (error) {
      showNotification('error', 'Erro ao excluir.');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { 
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: newEmail, password: newPassword })
      });

      if (response.ok) {
        showNotification('success', 'Usuário criado com sucesso!');
        setShowAddUser(false);
        setNewEmail("");
        setNewPassword("");
        fetchUsers();
      } else {
        const err = await response.json();
        showNotification('error', err.error || 'Erro ao criar usuário.');
      }
    } catch (error) {
      showNotification('error', 'Erro de conexão.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Remover este acesso administrativo?")) return;
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Basic ${auth}` }
      });
      if (response.ok) {
        setAdminUsers(adminUsers.filter(u => u.id !== id));
        showNotification('success', 'Acesso removido.');
      } else {
        const err = await response.json();
        showNotification('error', err.error);
      }
    } catch (error) {
      showNotification('error', 'Erro ao remover.');
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
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showNotification('success', 'CSV exportado.');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-white selection:text-black">
      {/* Header Centralizado */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light tracking-tighter mb-2">Painel <span className="font-medium">Sincronizado</span></h1>
          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${activeTab === 'leads' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4" />
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${activeTab === 'users' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Users className="w-4 h-4" />
              Usuários
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {activeTab === 'leads' && (
            <button onClick={exportToCSV} className="btn-secondary flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-all">
              <Download className="w-4 h-4" /> Exportar
            </button>
          )}
          {activeTab === 'users' && (
            <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all">
              <Plus className="w-4 h-4" /> Novo Usuário
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/20 transition-all">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'leads' ? (
            <motion.div key="leads" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
               {/* Search no topo da tabela */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text"
                  placeholder="Filtrar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-white/30 transition-all"
                />
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                      <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Data</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Nome / E-mail</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium">Mensagem</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-white/60 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                       <tr><td colSpan={4} className="p-20 text-center"><RefreshCcw className="w-8 h-8 animate-spin mx-auto text-white/20" /></td></tr>
                    ) : (
                      leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.email.toLowerCase().includes(searchTerm.toLowerCase())).map(lead => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-6 text-sm text-white/40">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                          <td className="p-6">
                            <p className="text-sm font-medium">{lead.name}</p>
                            <p className="text-xs text-white/40">{lead.email}</p>
                          </td>
                          <td className="p-6 text-sm text-white/60 italic">"{lead.message}"</td>
                          <td className="p-6 text-right">
                            <button onClick={() => handleDeleteLead(lead.id)} className="p-2 hover:text-red-400 text-white/20 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full p-20 text-center"><RefreshCcw className="w-8 h-8 animate-spin mx-auto text-white/20" /></div>
                ) : (
                  adminUsers.map(user => (
                    <div key={user.id} className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center justify-between group">
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Criado em {new Date(user.created_at).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-400 text-white/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Novo Usuário */}
      <AnimatePresence>
        {showAddUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[110]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowAddUser(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white"
              >✕</button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-medium">Novo Administrador</h2>
                <p className="text-white/40 text-sm mt-1">Conceda acesso ao painel de leads</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">E-mail de Acesso</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="email" 
                      required 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Senha Provisória</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="password" 
                      required 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <button 
                  disabled={isCreating}
                  className="w-full bg-white text-black py-4 rounded-xl font-medium hover:bg-white/90 transition-all disabled:opacity-50 mt-4"
                >
                  {isCreating ? 'Criando...' : 'Criar Acesso'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notificações */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl z-[120] ${
              notification.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
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
