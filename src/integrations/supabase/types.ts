export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      client_projects: {
        Row: {
          client_name: string
          created_at: string
          current_stage: string
          id: string
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_name: string
          created_at?: string
          current_stage?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          client_name?: string
          created_at?: string
          current_stage?: string
          id?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lead_events: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          from_stage: Database["public"]["Enums"]["pipeline_stage"] | null
          id: string
          lead_id: string
          to_stage: Database["public"]["Enums"]["pipeline_stage"] | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          from_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
          id?: string
          lead_id: string
          to_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          from_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
          id?: string
          lead_id?: string
          to_stage?: Database["public"]["Enums"]["pipeline_stage"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          dor_principal: string | null
          id: string
          interesse: string | null
          nome: string
          objetivo: string | null
          origem: string | null
          score: number
          stage: Database["public"]["Enums"]["pipeline_stage"]
          telefone: string
          temperatura: Database["public"]["Enums"]["lead_temperature"]
          tipo_negocio: string | null
          ultima_interacao: string | null
          updated_at: string
          urgencia: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dor_principal?: string | null
          id?: string
          interesse?: string | null
          nome: string
          objetivo?: string | null
          origem?: string | null
          score?: number
          stage?: Database["public"]["Enums"]["pipeline_stage"]
          telefone: string
          temperatura?: Database["public"]["Enums"]["lead_temperature"]
          tipo_negocio?: string | null
          ultima_interacao?: string | null
          updated_at?: string
          urgencia?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dor_principal?: string | null
          id?: string
          interesse?: string | null
          nome?: string
          objetivo?: string | null
          origem?: string | null
          score?: number
          stage?: Database["public"]["Enums"]["pipeline_stage"]
          telefone?: string
          temperatura?: Database["public"]["Enums"]["lead_temperature"]
          tipo_negocio?: string | null
          ultima_interacao?: string | null
          updated_at?: string
          urgencia?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      referral_clicks: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          referral_code_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referral_code_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          referral_code_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_clicks_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_codes: {
        Row: {
          ativo: boolean
          code: string
          comissao_por_venda: number
          created_at: string
          id: string
          nome: string
          saldo_disponivel: number
          saldo_pago: number
          telefone: string | null
          total_clicks: number
          total_leads: number
          total_vendas: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          code: string
          comissao_por_venda?: number
          created_at?: string
          id?: string
          nome: string
          saldo_disponivel?: number
          saldo_pago?: number
          telefone?: string | null
          total_clicks?: number
          total_leads?: number
          total_vendas?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          code?: string
          comissao_por_venda?: number
          created_at?: string
          id?: string
          nome?: string
          saldo_disponivel?: number
          saldo_pago?: number
          telefone?: string | null
          total_clicks?: number
          total_leads?: number
          total_vendas?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          comissao: number
          created_at: string
          data_conversao: string | null
          data_pagamento: string | null
          expires_at: string
          id: string
          lead_id: string | null
          lead_nome: string | null
          lead_telefone: string | null
          referral_code_id: string
          status: string
        }
        Insert: {
          comissao?: number
          created_at?: string
          data_conversao?: string | null
          data_pagamento?: string | null
          expires_at?: string
          id?: string
          lead_id?: string | null
          lead_nome?: string | null
          lead_telefone?: string | null
          referral_code_id: string
          status?: string
        }
        Update: {
          comissao?: number
          created_at?: string
          data_conversao?: string | null
          data_pagamento?: string | null
          expires_at?: string
          id?: string
          lead_id?: string | null
          lead_nome?: string | null
          lead_telefone?: string | null
          referral_code_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          product_id: string | null
          status: string
          stripe_customer_id: string
          stripe_price_id: string | null
          stripe_subscription_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          product_id?: string | null
          status: string
          stripe_customer_id: string
          stripe_price_id?: string | null
          stripe_subscription_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          product_id?: string | null
          status?: string
          stripe_customer_id?: string
          stripe_price_id?: string | null
          stripe_subscription_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_get_subscriptions_for_users: {
        Args: { _user_ids: string[] }
        Returns: {
          cancel_at_period_end: boolean
          current_period_end: string
          product_id: string
          status: string
          stripe_price_id: string
          user_id: string
        }[]
      }
      admin_link_lead_to_user: {
        Args: { _lead_id: string; _user_id: string }
        Returns: undefined
      }
      create_chatbot_lead: {
        Args: {
          _dor_principal?: string
          _interesse?: string
          _nome: string
          _objetivo?: string
          _origem?: string
          _telefone: string
          _tipo_negocio?: string
          _urgencia?: string
        }
        Returns: string
      }
      get_my_referrals: {
        Args: { _code_id: string }
        Returns: {
          comissao: number
          created_at: string
          data_conversao: string
          data_pagamento: string
          expires_at: string
          id: string
          lead_id: string
          lead_nome: string
          referral_code_id: string
          status: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      list_auth_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          id: string
        }[]
      }
      lookup_referral_code: {
        Args: { _code: string }
        Returns: {
          code: string
          comissao_por_venda: number
          id: string
        }[]
      }
      normalize_phone: { Args: { _phone: string }; Returns: string }
      update_chatbot_lead_fields:
        | {
            Args: {
              _dor_principal?: string
              _interesse?: string
              _lead_id: string
              _objetivo?: string
              _tipo_negocio?: string
              _urgencia?: string
            }
            Returns: undefined
          }
        | {
            Args: {
              _dor_principal?: string
              _interesse?: string
              _lead_id: string
              _objetivo?: string
              _score_increment?: number
              _tipo_negocio?: string
              _to_stage?: Database["public"]["Enums"]["pipeline_stage"]
              _urgencia?: string
            }
            Returns: undefined
          }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      lead_temperature: "frio" | "morno" | "quente"
      pipeline_stage:
        | "novo_lead"
        | "engajado"
        | "qualificado"
        | "proposta_apresentada"
        | "checkout_iniciado"
        | "convertido"
        | "perdido"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      lead_temperature: ["frio", "morno", "quente"],
      pipeline_stage: [
        "novo_lead",
        "engajado",
        "qualificado",
        "proposta_apresentada",
        "checkout_iniciado",
        "convertido",
        "perdido",
      ],
    },
  },
} as const
