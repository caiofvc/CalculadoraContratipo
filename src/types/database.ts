export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          nickname: string | null
          avatar_url: string | null
          experience_level: 'iniciante' | 'intermediario' | 'avancado' | 'profissional' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          nickname?: string | null
          avatar_url?: string | null
          experience_level?: 'iniciante' | 'intermediario' | 'avancado' | 'profissional' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          nickname?: string | null
          avatar_url?: string | null
          experience_level?: 'iniciante' | 'intermediario' | 'avancado' | 'profissional' | null
          created_at?: string
          updated_at?: string
        }
      }
      aromatic_chemicals: {
        Row: {
          id: string
          name: string
          cas_number: string | null
          olfactive_family: string
          olfactive_note: 'topo' | 'coracao' | 'fundo'
          description: string | null
          min_dosage: number | null
          max_dosage: number | null
          ifra_limit: number | null
          density: number
          is_system: boolean
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          cas_number?: string | null
          olfactive_family: string
          olfactive_note: 'topo' | 'coracao' | 'fundo'
          description?: string | null
          min_dosage?: number | null
          max_dosage?: number | null
          ifra_limit?: number | null
          density?: number
          is_system?: boolean
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          cas_number?: string | null
          olfactive_family?: string
          olfactive_note?: 'topo' | 'coracao' | 'fundo'
          description?: string | null
          min_dosage?: number | null
          max_dosage?: number | null
          ifra_limit?: number | null
          density?: number
          is_system?: boolean
          user_id?: string | null
          created_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          concentration_type: string
          total_volume_ml: number
          calculation_mode: 'volume' | 'massa'
          pct_essence: number | null
          pct_alcohol: number | null
          pct_pg: number | null
          pct_glycerin: number | null
          pct_water: number | null
          alcohol_gl: number | null
          alcohol_density: number | null
          olfactive_family_main: string | null
          olfactive_subfamily: string | null
          fixation_score: number | null
          estimated_duration: string | null
          formula_type: 'base_pronta' | 'quimicos_aromaticos'
          maceration_start_date: string | null
          maceration_target_days: number
          maceration_status: 'aguardando' | 'macerando' | 'pronto' | 'arquivado'
          personal_notes: string | null
          rating: number | null
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          concentration_type: string
          total_volume_ml: number
          calculation_mode?: 'volume' | 'massa'
          pct_essence?: number | null
          pct_alcohol?: number | null
          pct_pg?: number | null
          pct_glycerin?: number | null
          pct_water?: number | null
          alcohol_gl?: number | null
          alcohol_density?: number | null
          olfactive_family_main?: string | null
          olfactive_subfamily?: string | null
          fixation_score?: number | null
          estimated_duration?: string | null
          formula_type?: 'base_pronta' | 'quimicos_aromaticos'
          maceration_start_date?: string | null
          maceration_target_days?: number
          maceration_status?: 'aguardando' | 'macerando' | 'pronto' | 'arquivado'
          personal_notes?: string | null
          rating?: number | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          concentration_type?: string
          total_volume_ml?: number
          calculation_mode?: 'volume' | 'massa'
          pct_essence?: number | null
          pct_alcohol?: number | null
          pct_pg?: number | null
          pct_glycerin?: number | null
          pct_water?: number | null
          alcohol_gl?: number | null
          alcohol_density?: number | null
          olfactive_family_main?: string | null
          olfactive_subfamily?: string | null
          fixation_score?: number | null
          estimated_duration?: string | null
          formula_type?: 'base_pronta' | 'quimicos_aromaticos'
          maceration_start_date?: string | null
          maceration_target_days?: number
          maceration_status?: 'aguardando' | 'macerando' | 'pronto' | 'arquivado'
          personal_notes?: string | null
          rating?: number | null
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      recipe_ingredients: {
        Row: {
          id: string
          recipe_id: string
          chemical_id: string | null
          ingredient_type: 'chemical' | 'alcohol' | 'pg' | 'glycerin' | 'water' | 'essence' | 'carrier_oil'
          olfactive_note: 'topo' | 'coracao' | 'fundo' | null
          percentage: number
          amount_ml: number | null
          amount_g: number | null
          amount_drops: number | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          recipe_id: string
          chemical_id?: string | null
          ingredient_type: 'chemical' | 'alcohol' | 'pg' | 'glycerin' | 'water' | 'essence' | 'carrier_oil'
          olfactive_note?: 'topo' | 'coracao' | 'fundo' | null
          percentage: number
          amount_ml?: number | null
          amount_g?: number | null
          amount_drops?: number | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          recipe_id?: string
          chemical_id?: string | null
          ingredient_type?: 'chemical' | 'alcohol' | 'pg' | 'glycerin' | 'water' | 'essence' | 'carrier_oil'
          olfactive_note?: 'topo' | 'coracao' | 'fundo' | null
          percentage?: number
          amount_ml?: number | null
          amount_g?: number | null
          amount_drops?: number | null
          sort_order?: number
          created_at?: string
        }
      }
      maceration_logs: {
        Row: {
          id: string
          recipe_id: string
          log_date: string
          action: string
          notes: string | null
          smell_rating: number | null
          photo_url: string | null
        }
        Insert: {
          id?: string
          recipe_id: string
          log_date?: string
          action: string
          notes?: string | null
          smell_rating?: number | null
          photo_url?: string | null
        }
        Update: {
          id?: string
          recipe_id?: string
          log_date?: string
          action?: string
          notes?: string | null
          smell_rating?: number | null
          photo_url?: string | null
        }
      }
      user_inventory: {
        Row: {
          id: string
          user_id: string
          chemical_id: string | null
          custom_name: string | null
          quantity_ml: number | null
          purchase_date: string | null
          supplier: string | null
          batch_number: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          chemical_id?: string | null
          custom_name?: string | null
          quantity_ml?: number | null
          purchase_date?: string | null
          supplier?: string | null
          batch_number?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          chemical_id?: string | null
          custom_name?: string | null
          quantity_ml?: number | null
          purchase_date?: string | null
          supplier?: string | null
          batch_number?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
