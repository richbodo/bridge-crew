export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agents_state: {
        Row: {
          agent: string
          context_packs: string[]
          created_at: string
          current_run_id: string | null
          current_task: string | null
          display_name: string | null
          duty: string | null
          id: string
          progress: string | null
          session_id: string
          snapshot: string | null
          status: Database["public"]["Enums"]["agent_status"]
          updated_at: string
        }
        Insert: {
          agent: string
          context_packs?: string[]
          created_at?: string
          current_run_id?: string | null
          current_task?: string | null
          display_name?: string | null
          duty?: string | null
          id?: string
          progress?: string | null
          session_id: string
          snapshot?: string | null
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string
        }
        Update: {
          agent?: string
          context_packs?: string[]
          created_at?: string
          current_run_id?: string | null
          current_task?: string | null
          display_name?: string | null
          duty?: string | null
          id?: string
          progress?: string | null
          session_id?: string
          snapshot?: string | null
          status?: Database["public"]["Enums"]["agent_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_state_current_run_id_fkey"
            columns: ["current_run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_state_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      context_docs: {
        Row: {
          body: string
          created_at: string
          id: string
          pack_id: string
          path: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          pack_id: string
          path: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          pack_id?: string
          path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "context_docs_pack_id_fkey"
            columns: ["pack_id"]
            isOneToOne: false
            referencedRelation: "context_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      context_packs: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          name: string
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "context_packs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      contributions: {
        Row: {
          agent: string
          ask: Json | null
          brief: string
          created_at: string
          id: string
          outcome: string | null
          removes: string[]
          run_id: string | null
          session_id: string
          spoken: string
          summon_id: string | null
          updated_at: string
        }
        Insert: {
          agent: string
          ask?: Json | null
          brief?: string
          created_at?: string
          id?: string
          outcome?: string | null
          removes?: string[]
          run_id?: string | null
          session_id: string
          spoken: string
          summon_id?: string | null
          updated_at?: string
        }
        Update: {
          agent?: string
          ask?: Json | null
          brief?: string
          created_at?: string
          id?: string
          outcome?: string | null
          removes?: string[]
          run_id?: string | null
          session_id?: string
          spoken?: string
          summon_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contributions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
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
          actor: string | null
          created_at: string
          detail: string | null
          event: string
          holder: string
          id: string
          run_id: string | null
          session_id: string
          updated_at: string
        }
        Insert: {
          actor?: string | null
          created_at?: string
          detail?: string | null
          event: string
          holder: string
          id?: string
          run_id?: string | null
          session_id: string
          updated_at?: string
        }
        Update: {
          actor?: string | null
          created_at?: string
          detail?: string | null
          event?: string
          holder?: string
          id?: string
          run_id?: string | null
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "floor_events_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
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
          agent: string
          contribution_id: string | null
          created_at: string
          id: string
          resolved_at: string | null
          resolved_by: string | null
          run_id: string | null
          session_id: string
          state: string
          summary: string
          updated_at: string
        }
        Insert: {
          agent: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          run_id?: string | null
          session_id: string
          state?: string
          summary: string
          updated_at?: string
        }
        Update: {
          agent?: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          run_id?: string | null
          session_id?: string
          state?: string
          summary?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hand_raises_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hand_raises_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
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
      made_things: {
        Row: {
          agent: string
          body: string
          contribution_id: string | null
          created_at: string
          id: string
          kind: string
          name: string
          run_id: string | null
          session_id: string
          state: string
          updated_at: string
          version: number | null
        }
        Insert: {
          agent: string
          body: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind: string
          name: string
          run_id?: string | null
          session_id: string
          state?: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          agent?: string
          body?: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind?: string
          name?: string
          run_id?: string | null
          session_id?: string
          state?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "made_things_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "made_things_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "made_things_session_id_fkey"
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
      proposals: {
        Row: {
          answered_at: string | null
          answered_by: string | null
          contribution_id: string | null
          created_at: string
          id: string
          kind: string
          made_thing_id: string | null
          mode: string
          proposed_by: string | null
          question: string
          session_id: string
          source: string
          state: string
          target: string
          task: string
          updated_at: string
        }
        Insert: {
          answered_at?: string | null
          answered_by?: string | null
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind?: string
          made_thing_id?: string | null
          mode?: string
          proposed_by?: string | null
          question: string
          session_id: string
          source: string
          state?: string
          target: string
          task: string
          updated_at?: string
        }
        Update: {
          answered_at?: string | null
          answered_by?: string | null
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind?: string
          made_thing_id?: string | null
          mode?: string
          proposed_by?: string | null
          question?: string
          session_id?: string
          source?: string
          state?: string
          target?: string
          task?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_made_thing_id_fkey"
            columns: ["made_thing_id"]
            isOneToOne: false
            referencedRelation: "made_things"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      runs: {
        Row: {
          agent: string
          created_at: string
          ended_at: string | null
          id: string
          mode: string
          session_id: string
          started_at: string
          state: string
          summoned_by: string | null
          task: string
          updated_at: string
        }
        Insert: {
          agent: string
          created_at?: string
          ended_at?: string | null
          id?: string
          mode?: string
          session_id: string
          started_at?: string
          state?: string
          summoned_by?: string | null
          task: string
          updated_at?: string
        }
        Update: {
          agent?: string
          created_at?: string
          ended_at?: string | null
          id?: string
          mode?: string
          session_id?: string
          started_at?: string
          state?: string
          summoned_by?: string | null
          task?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "runs_session_id_fkey"
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
          settings: Json
          template: string
          title: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          owner_id: string
          settings?: Json
          template?: string
          title?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          owner_id?: string
          settings?: Json
          template?: string
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
          scribe_state: string
          session_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          scribe_state?: string
          session_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          scribe_state?: string
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
          agent: string
          brief: string
          created_at: string
          id: string
          session_id: string
          summoned_by: string | null
          updated_at: string
        }
        Insert: {
          agent: string
          brief: string
          created_at?: string
          id?: string
          session_id: string
          summoned_by?: string | null
          updated_at?: string
        }
        Update: {
          agent?: string
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
          agent: string | null
          author_id: string | null
          author_name: string
          body: string
          contribution_id: string | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["turn_kind"]
          session_id: string
          speaker_role: string | null
          updated_at: string
        }
        Insert: {
          agent?: string | null
          author_id?: string | null
          author_name: string
          body: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["turn_kind"]
          session_id: string
          speaker_role?: string | null
          updated_at?: string
        }
        Update: {
          agent?: string | null
          author_id?: string | null
          author_name?: string
          body?: string
          contribution_id?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["turn_kind"]
          session_id?: string
          speaker_role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcript_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
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
      crew_move_allowed: {
        Args: {
          _from: Database["public"]["Enums"]["agent_status"]
          _to: Database["public"]["Enums"]["agent_status"]
        }
        Returns: boolean
      }
      decline_hail: { Args: { _hail: string }; Returns: string }
      done_speaking: {
        Args: { _agent: string; _session: string }
        Returns: undefined
      }
      expire_stale_runs: {
        Args: { _limit: string; _session: string }
        Returns: string[]
      }
      fail_run: { Args: { _reason: string; _run: string }; Returns: boolean }
      finish_run: {
        Args: {
          _ask?: Json
          _brief: string
          _made?: Json
          _removes?: string[]
          _run: string
          _spoken: string
          _summary: string
        }
        Returns: string
      }
      grant_hail: { Args: { _hail: string }; Returns: Json }
      interrupt_speaker: { Args: { _session: string }; Returns: string }
      is_participant: {
        Args: { _session_id: string; _user_id: string }
        Returns: boolean
      }
      log_event: {
        Args: {
          _detail: string
          _event: string
          _holder: string
          _run: string
          _session: string
        }
        Returns: undefined
      }
      make_current: {
        Args: { _session: string; _version: string }
        Returns: undefined
      }
      put_back_made_thing: { Args: { _thing: string }; Returns: string }
      remove_made_thing: { Args: { _thing: string }; Returns: string }
      rename_made_thing: {
        Args: { _name: string; _thing: string }
        Returns: string
      }
      scribe_done: {
        Args: { _session: string; _slug: string }
        Returns: boolean
      }
      scribe_request: {
        Args: { _session: string; _slug: string }
        Returns: boolean
      }
      start_run: {
        Args: {
          _agent: string
          _mode?: string
          _session: string
          _task: string
        }
        Returns: string
      }
      stop_crew: { Args: { _agent: string; _session: string }; Returns: string }
      use_made_thing: { Args: { _thing: string }; Returns: undefined }
    }
    Enums: {
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
      agent_status: ["idle", "working", "hand_raised", "speaking", "stopped"],
      turn_kind: ["human", "system", "agent"],
    },
  },
} as const

