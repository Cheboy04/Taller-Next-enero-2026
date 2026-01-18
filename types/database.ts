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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      credit: {
        Row: {
          billing_order: number | null
          category: Database["public"]["Enums"]["credit_category"]
          character_name: string | null
          id: number
          job: string | null
          movie_id: number
          person_id: number
        }
        Insert: {
          billing_order?: number | null
          category: Database["public"]["Enums"]["credit_category"]
          character_name?: string | null
          id?: number
          job?: string | null
          movie_id: number
          person_id: number
        }
        Update: {
          billing_order?: number | null
          category?: Database["public"]["Enums"]["credit_category"]
          character_name?: string | null
          id?: number
          job?: string | null
          movie_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "credit_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person"
            referencedColumns: ["id"]
          },
        ]
      }
      genre: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      movie: {
        Row: {
          created_at: string
          id: number
          plot: string | null
          poster_url: string | null
          release_date: string | null
          runtime_minutes: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          plot?: string | null
          poster_url?: string | null
          release_date?: string | null
          runtime_minutes?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          plot?: string | null
          poster_url?: string | null
          release_date?: string | null
          runtime_minutes?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      movie_genre: {
        Row: {
          genre_id: number
          movie_id: number
        }
        Insert: {
          genre_id: number
          movie_id: number
        }
        Update: {
          genre_id?: number
          movie_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "movie_genre_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genre"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_genre_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movie"
            referencedColumns: ["id"]
          },
        ]
      }
      person: {
        Row: {
          biography: string | null
          birth_date: string | null
          created_at: string
          death_date: string | null
          id: number
          picture_url: string | null
          primary_name: string
          updated_at: string
        }
        Insert: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string
          death_date?: string | null
          id?: number
          picture_url?: string | null
          primary_name: string
          updated_at?: string
        }
        Update: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string
          death_date?: string | null
          id?: number
          picture_url?: string | null
          primary_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      credit_category:
        | "actor"
        | "actress"
        | "director"
        | "writer"
        | "producer"
        | "composer"
        | "cinematographer"
        | "editor"
        | "production_designer"
        | "sound"
        | "vfx"
        | "stunts"
        | "misc"
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
      credit_category: [
        "actor",
        "actress",
        "director",
        "writer",
        "producer",
        "composer",
        "cinematographer",
        "editor",
        "production_designer",
        "sound",
        "vfx",
        "stunts",
        "misc",
      ],
    },
  },
} as const
