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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          display_order?: number | null
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          price: number
          image_url: string | null
          is_popular: boolean | null
          is_available: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          is_popular?: boolean | null
          is_available?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          is_popular?: boolean | null
          is_available?: boolean | null
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          reservation_date: string
          reservation_time: string
          guests: number
          status: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          reservation_date: string
          reservation_time: string
          guests: number
          status?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          reservation_date?: string
          reservation_time?: string
          guests?: number
          status?: string | null
          message?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          created_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          image_url: string | null
          author: string | null
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          image_url?: string | null
          author?: string | null
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          image_url?: string | null
          author?: string | null
          published_at?: string | null
          created_at?: string
        }
      }
    }
  }
}
