import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Shield, ShieldOff, UserPlus, Users as UsersIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RegisteredUser {
  id: string;
  email: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "moderator" | "user";
}

interface CRMRolesProps {
  registeredUsers: RegisteredUser[];
}

const CRMRoles = ({ registeredUsers }: CRMRolesProps) => {
  const queryClient = useQueryClient();
  const [grantUserId, setGrantUserId] = useState("");
  const [grantRole, setGrantRole] = useState<"admin" | "moderator">("admin");
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id, user_id, role");
      if (error) throw error;
      return data as UserRole[];
    },
    refetchInterval: 15000,
  });

  const emailFor = (uid: string) =>
    registeredUsers.find((u) => u.id === uid)?.email ?? uid;

  const handleGrant = async () => {
    if (!grantUserId) {
      toast.error("Selecione um usuário");
      return;
    }
    setBusyId("__grant__");
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: grantUserId, role: grantRole });
    setBusyId(null);
    if (error) {
      toast.error(error.message.includes("duplicate") ? "Usuário já tem essa role" : "Erro ao conceder role");
      return;
    }
    toast.success(`Role ${grantRole} concedida!`);
    setGrantUserId("");
    queryClient.invalidateQueries({ queryKey: ["user-roles"] });
  };

  const handleRevoke = async (roleRow: UserRole) => {
    const email = emailFor(roleRow.user_id);
    if (!confirm(`Revogar role "${roleRow.role}" de ${email}?`)) return;
    setBusyId(roleRow.id);
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("id", roleRow.id);
    setBusyId(null);
    if (error) {
      toast.error("Erro ao revogar role: " + error.message);
      return;
    }
    toast.success("Role revogada");
    queryClient.invalidateQueries({ queryKey: ["user-roles"] });
  };

  const adminRoles = roles.filter((r) => r.role === "admin");
  const otherRoles = roles.filter((r) => r.role !== "admin");

  const roleBadge = (role: UserRole["role"]) => {
    const styles =
      role === "admin"
        ? "bg-primary/15 text-primary border-primary/30"
        : role === "moderator"
        ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
        : "bg-muted text-muted-foreground border-border/50";
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${styles}`}>
        {role === "admin" && <Shield size={9} />}
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold font-heading tracking-tight">Gestão de Acessos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Conceda ou revogue permissões administrativas para usuários cadastrados.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/30 text-xs text-muted-foreground">
          <UsersIcon size={12} />
          {registeredUsers.length} usuários
        </div>
      </div>

      {/* Grant new role */}
      <div className="bg-card border border-border/30 rounded-xl p-5 space-y-4 hover:border-primary/20 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/15 flex items-center justify-center">
            <UserPlus size={14} className="text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Conceder Role</h2>
            <p className="text-xs text-muted-foreground">Selecione um usuário e o nível de acesso</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={grantUserId}
            onChange={(e) => setGrantUserId(e.target.value)}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 md:col-span-2"
          >
            <option value="">Selecione o usuário</option>
            {registeredUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.email}</option>
            ))}
          </select>
          <select
            value={grantRole}
            onChange={(e) => setGrantRole(e.target.value as "admin" | "moderator")}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            <option value="admin">admin</option>
            <option value="moderator">moderator</option>
          </select>
        </div>
        <button
          onClick={handleGrant}
          disabled={busyId === "__grant__" || !grantUserId}
          className="btn-premium px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busyId === "__grant__" ? "Concedendo..." : "Conceder acesso"}
        </button>
      </div>

      {/* Admins */}
      <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            <h2 className="text-sm font-semibold">Administradores</h2>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
            {adminRoles.length}
          </span>
        </div>
        <div className="divide-y divide-border/20">
          {isLoading ? (
            <div className="px-5 py-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Carregando administradores...
            </div>
          ) : adminRoles.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Shield size={28} className="mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum administrador cadastrado</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Conceda a primeira role acima</p>
            </div>
          ) : adminRoles.map((r) => (
            <div key={r.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                  {emailFor(r.user_id).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{emailFor(r.user_id)}</p>
                  <div className="mt-0.5">{roleBadge(r.role)}</div>
                </div>
              </div>
              <button
                onClick={() => handleRevoke(r)}
                disabled={busyId === r.id}
                className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 transition-colors flex items-center gap-1.5 disabled:opacity-50 shrink-0"
              >
                <ShieldOff size={12} />
                {busyId === r.id ? "Revogando..." : "Revogar Admin"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Other roles */}
      {otherRoles.length > 0 && (
        <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Outras Roles</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40 font-medium">
              {otherRoles.length}
            </span>
          </div>
          <div className="divide-y divide-border/20">
            {otherRoles.map((r) => (
              <div key={r.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground font-semibold text-xs shrink-0">
                    {emailFor(r.user_id).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{emailFor(r.user_id)}</p>
                    <div className="mt-0.5">{roleBadge(r.role)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(r)}
                  disabled={busyId === r.id}
                  className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground border border-border/40 transition-colors disabled:opacity-50 shrink-0"
                >
                  {busyId === r.id ? "Revogando..." : "Revogar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMRoles;
