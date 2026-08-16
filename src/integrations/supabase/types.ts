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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      agents_state: {
        Row: {
          agent: Database["public"]["Enums"]["agent_kind"]
          created_at: string
          current_task: string | null
          id: string
          progress: string | null
          session_id: string
          status: Database["public"]["Enums"]["agent_status"]
          updated_at: string
        }
        Insert: {
          agent: Database["public"]["Enums"]["agent_kind"]
          created_at?: string
          current_task?: string | null
          id?: string
          progress?: string | null
          session_id: string
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string
        }
        Update: {
          agent?: Database["public"]["Enums"]["agent_kind"]
          created_at?: string
          current_task?: string | null
          id?: string
          progress?: string | null
          session_id?: string
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_state_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      contributions: {
        Row: {
          agent: Database["public"]["Enums"]["agent_kind"]
          brief: string
          created_at: string
          id: string
          session_id: string
          spoken: string
          summon_id: string | null
          updated_at: string
        }
        Insert: {
          agent: Database["public"]["Enums"]["agent_kind"]
          brief?: string
          created_at?: string
          id?: string
          session_id: string
          spoken: string
          summon_id?: string | null
          updated_at?: string
        }
        Update: {
          agent?: Database["public"]["Enums"]["agent_kind"]
          brief?: string
          created_at?: string
          id?: string
          session_id?: string
          spoken?: string
          summon_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_summon_id_fkey"
            columns: ["summon_id"]
            isOneToOne: false
            referencedRelation: "summons"
            referencedColumns: ["id"]
          },
        ]
      }
      floor_events: {
        Row: {
          created_at: string
          detail: string | null
          event: string
          holder: string
          id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          detail?: string | null
          event: string
          holder: string
          id?: string
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          detail?: string | null
          event?: string
          holder?: string
          id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "floor_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      hand_raises: {
        Row: {
          agent: Database["public"]["Enums"]["agent_kind"]
          created_at: string
          id: string
          resolved_at: string | null
          resolved_by: string | null
          session_id: string
          state: string
          summary: string
          updated_at: string
        }
        Insert: {
          agent: Database["public"]["Enums"]["agent_kind"]
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          session_id: string
          state?: string
          summary: string
          updated_at?: string
        }
        Update: {
          agent?: Database["public"]["Enums"]["agent_kind"]
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          session_id?: string
          state?: string
          summary?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hand_raises_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          last_sent_at: string | null
          note: string | null
          session_id: string
          status: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          last_sent_at?: string | null
          note?: string | null
          session_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          last_sent_at?: string | null
          note?: string | null
          session_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          color: string
          created_at: string
          display_name: string
          id: string
          last_seen_at: string
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          display_name: string
          id?: string
          last_seen_at?: string
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          display_name?: string
          id?: string
          last_seen_at?: string
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          code: string
          created_at: string
          id: string
          owner_id: string
          title: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          owner_id: string
          title?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          owner_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stage_docs: {
        Row: {
          body: string
          created_at: string
          id: string
          session_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          session_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          session_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_docs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      summons: {
        Row: {
          agent: Database["public"]["Enums"]["agent_kind"]
          brief: string
          created_at: string
          id: string
          session_id: string
          summoned_by: string | null
          updated_at: string
        }
        Insert: {
          agent: Database["public"]["Enums"]["agent_kind"]
          brief: string
          created_at?: string
          id?: string
          session_id: string
          summoned_by?: string | null
          updated_at?: string
        }
        Update: {
          agent?: Database["public"]["Enums"]["agent_kind"]
          brief?: string
          created_at?: string
          id?: string
          session_id?: string
          summoned_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "summons_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      transcript: {
        Row: {
          agent: Database["public"]["Enums"]["agent_kind"] | null
          author_id: string | null
          author_name: string
          body: string
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["turn_kind"]
          session_id: string
          updated_at: string
        }
        Insert: {
          agent?: Database["public"]["Enums"]["agent_kind"] | null
          author_id?: string | null
          author_name: string
          body: string
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["turn_kind"]
          session_id: string
          updated_at?: string
        }
        Update: {
          agent?: Database["public"]["Enums"]["agent_kind"] | null
          author_id?: string | null
          author_name?: string
          body?: string
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["turn_kind"]
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcript_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_participant: {
        Args: { _session_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      agent_kind: "scribe" | "scout" | "advocate" | "skeptic" | "analyst"
      agent_status: "idle" | "working" | "hand_raised" | "speaking" | "stopped"
      turn_kind: "human" | "system" | "agent"
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
      agent_kind: ["scribe", "scout", "advocate", "skeptic", "analyst"],
      agent_status: ["idle", "working", "hand_raised", "speaking", "stopped"],
      turn_kind: ["human", "system", "agent"],
    },
  },
} as const
