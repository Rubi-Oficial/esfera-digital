import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string | null;
  product_id: string | null;
  status: string;
  environment: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useSubscription(userId?: string) {
  const queryClient = useQueryClient();
  const env = getStripeEnvironment();

  const query = useQuery({
    queryKey: ["subscription", userId, env],
    queryFn: async (): Promise<Subscription | null> => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("environment", env)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Subscription | null;
    },
    enabled: !!userId,
  });

  // Realtime: refresh when subscription changes
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`subscription-${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${userId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["subscription", userId, env] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, env, queryClient]);

  const sub = query.data;
  const now = Date.now();
  const periodActive =
    !sub?.current_period_end || new Date(sub.current_period_end).getTime() > now;
  const isActive = !!sub && (sub.status === "active" || sub.status === "trialing") && periodActive;

  return { ...query, subscription: sub, isActive };
}
