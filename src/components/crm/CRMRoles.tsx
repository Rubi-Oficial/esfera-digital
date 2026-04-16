import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Shield, ShieldOff, UserPlus } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Grant new role */}
      <div className="bg-card border border-border/30 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus size={16} className="text-primary" />
          <h2 className="text-sm font-semibold">Conceder Role</h2>
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
          disabled={busyId === "__grant__"}
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {busyId === "__grant__" ? "Concedendo..." : "Conceder"}
        </button>
      </div>

      {/* Admins */}
      <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30 flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          <h2 className="text-sm font-semibold">Administradores ({adminRoles.length})</h2>
        </div>
        <div className="divide-y divide-border/20">
          {isLoading ? (
            <div className="px-5 py-6 text-sm text-muted-foreground">Carregando...</div>
          ) : adminRoles.length === 0 ? (
            <div className="px-5 py-10 text-center text-muted-foreground text-sm">Nenhum admin cadastrado.</div>
          ) : adminRoles.map((r) => (
            <div key={r.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{emailFor(r.user_id)}</p>
                <p className="text-xs text-muted-foreground">role: <span className="text-primary">admin</span></p>
              </div>
              <button
                onClick={() => handleRevoke(r)}
                disabled={busyId === r.id}
                className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1.5 disabled:opacity-50"
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
          <div className="px-5 py-4 border-b border-border/30">
            <h2 className="text-sm font-semibold">Outras Roles ({otherRoles.length})</h2>
          </div>
          <div className="divide-y divide-border/20">
            {otherRoles.map((r) => (
              <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{emailFor(r.user_id)}</p>
                  <p className="text-xs text-muted-foreground">role: {r.role}</p>
                </div>
                <button
                  onClick={() => handleRevoke(r)}
                  disabled={busyId === r.id}
                  className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
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
