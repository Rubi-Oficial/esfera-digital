import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PROJECT_STAGES, TOTAL_ESTIMATED_DAYS } from "./data";

export function useMyProject() {
  const [userName, setUserName] = useState("");
  const [stageNotification, setStageNotification] = useState<{ from: string; to: string } | null>(null);
  const hasShownToast = useRef(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name
        || data.user?.user_metadata?.name
        || data.user?.email?.split("@")[0]
        || "Cliente";
      setUserName(name);
    });
  }, []);

  const { data: myProject } = useQuery({
    queryKey: ["my-project"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("client_projects")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (!myProject) return;
    const storageKey = `project_stage_${myProject.id}`;
    const lastSeen = localStorage.getItem(storageKey);
    if (lastSeen && lastSeen !== myProject.current_stage && !hasShownToast.current) {
      const fromLabel = PROJECT_STAGES.find(s => s.key === lastSeen)?.label || lastSeen;
      const toLabel = PROJECT_STAGES.find(s => s.key === myProject.current_stage)?.label || myProject.current_stage;
      setStageNotification({ from: fromLabel, to: toLabel });
      hasShownToast.current = true;
      toast.success("Seu projeto avançou! 🎉", {
        description: `De "${fromLabel}" para "${toLabel}"`,
        duration: 8000,
      });
    }
    localStorage.setItem(storageKey, myProject.current_stage);
  }, [myProject?.current_stage, myProject?.id]);

  const currentStageIndex = myProject
    ? PROJECT_STAGES.findIndex(s => s.key === myProject.current_stage)
    : -1;
  const progressPercent = currentStageIndex >= 0
    ? ((currentStageIndex + 1) / PROJECT_STAGES.length) * 100
    : 0;

  const daysSinceStart = myProject
    ? Math.floor((Date.now() - new Date(myProject.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const estimatedDaysRemaining = myProject
    ? Math.max(0, Math.round(TOTAL_ESTIMATED_DAYS * (1 - progressPercent / 100)))
    : 0;

  return {
    userName,
    myProject,
    stageNotification,
    setStageNotification,
    currentStageIndex,
    progressPercent,
    daysSinceStart,
    estimatedDaysRemaining,
  };
}
