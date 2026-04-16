import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PROJECT_STAGES_OPTIONS } from "./types";

interface ClientProject {
  id: string;
  client_name: string;
  user_id: string;
  current_stage: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface RegisteredUser {
  id: string;
  email: string;
  created_at: string;
}

interface CRMProjetosProps {
  clientProjects: ClientProject[];
  registeredUsers: RegisteredUser[];
  onRefetch: () => void;
}

const CRMProjetos = ({ clientProjects, registeredUsers, onRefetch }: CRMProjetosProps) => {
  const [projectForm, setProjectForm] = useState({ client_name: "", user_id: "", current_stage: "briefing", notes: "" });
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const handleSaveProject = async () => {
    if (!projectForm.client_name || !projectForm.user_id) {
      toast.error("Preencha nome e ID do usuário");
      return;
    }
    if (editingProject) {
      const { error } = await supabase.from("client_projects").update({
        client_name: projectForm.client_name,
        current_stage: projectForm.current_stage,
        notes: projectForm.notes || null,
      }).eq("id", editingProject);
      if (error) { toast.error("Erro ao atualizar"); return; }
      toast.success("Projeto atualizado!");
    } else {
      const { error } = await supabase.from("client_projects").insert({
        client_name: projectForm.client_name,
        user_id: projectForm.user_id,
        current_stage: projectForm.current_stage,
        notes: projectForm.notes || null,
      });
      if (error) { toast.error("Erro ao criar projeto"); return; }
      toast.success("Projeto criado!");
    }
    setProjectForm({ client_name: "", user_id: "", current_stage: "briefing", notes: "" });
    setEditingProject(null);
    onRefetch();
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <div className="bg-card border border-border/30 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold">{editingProject ? "Editar Projeto" : "Novo Projeto"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Nome do cliente"
            value={projectForm.client_name}
            onChange={(e) => setProjectForm((p) => ({ ...p, client_name: e.target.value }))}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <select
            value={projectForm.user_id}
            onChange={(e) => setProjectForm((p) => ({ ...p, user_id: e.target.value }))}
            disabled={!!editingProject}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
          >
            <option value="">Selecione o cliente</option>
            {registeredUsers.map((u) => (
              <option key={u.id} value={u.id}>{u.email}</option>
            ))}
          </select>
          <select
            value={projectForm.current_stage}
            onChange={(e) => setProjectForm((p) => ({ ...p, current_stage: e.target.value }))}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            {PROJECT_STAGES_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <input
            placeholder="Notas (opcional)"
            value={projectForm.notes}
            onChange={(e) => setProjectForm((p) => ({ ...p, notes: e.target.value }))}
            className="bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveProject}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {editingProject ? "Salvar" : "Criar Projeto"}
          </button>
          {editingProject && (
            <button
              onClick={() => { setEditingProject(null); setProjectForm({ client_name: "", user_id: "", current_stage: "briefing", notes: "" }); }}
              className="px-5 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/30">
          <h2 className="text-sm font-semibold">Projetos ({clientProjects.length})</h2>
        </div>
        <div className="divide-y divide-border/20">
          {clientProjects.length === 0 ? (
            <div className="px-5 py-10 text-center text-muted-foreground text-sm">Nenhum projeto cadastrado.</div>
          ) : clientProjects.map((p) => (
            <div key={p.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{p.client_name}</p>
                <p className="text-xs text-muted-foreground">
                  {registeredUsers.find((u) => u.id === p.user_id)?.email || p.user_id}
                  {" · "}{PROJECT_STAGES_OPTIONS.find((s) => s.value === p.current_stage)?.label || p.current_stage}
                  {p.notes && ` · ${p.notes}`}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject(p.id);
                  setProjectForm({ client_name: p.client_name, user_id: p.user_id, current_stage: p.current_stage, notes: p.notes || "" });
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMProjetos;
