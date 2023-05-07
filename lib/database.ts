export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          checked: boolean
          created_at: string | null
          description: string | null
          id: number
          title: string
          user_id: string
        }
        Insert: {
          checked: boolean
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
          user_id: string
        }
        Update: {
          checked?: boolean
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deleteUser: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
