import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId, priceIds, quantity, customerEmail, userId, returnUrl, environment } = await req.json();

    const env = (environment || 'sandbox') as StripeEnv;
    const stripe = createStripeClient(env);

    // Support single priceId or array of priceIds
    const lookupKeys: string[] = priceIds || (priceId ? [priceId] : []);
    if (!lookupKeys.length || lookupKeys.some((k: string) => typeof k !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(k))) {
      return new Response(JSON.stringify({ error: "Invalid priceId(s)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Resolve all prices
    const prices = await stripe.prices.list({ lookup_keys: lookupKeys });
    if (prices.data.length !== lookupKeys.length) {
      return new Response(JSON.stringify({ error: "One or more prices not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const hasRecurring = prices.data.some(p => p.type === "recurring");
    const lineItems = prices.data.map(p => ({ price: p.id, quantity: quantity || 1 }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: hasRecurring ? "subscription" : "payment",
      ui_mode: "embedded",
      return_url: returnUrl || `${req.headers.get("origin")}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      ...(customerEmail && { customer_email: customerEmail }),
      ...(userId && {
        metadata: { userId },
        ...(hasRecurring && { subscription_data: { metadata: { userId } } }),
      }),
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
