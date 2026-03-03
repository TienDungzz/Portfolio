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
            projects: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    tech_stack: string[] | null
                    github_url: string | null
                    demo_url: string | null
                    show_github: boolean | null
                    show_demo: boolean | null
                    images: {
                        home?: string
                        product?: string
                        collection?: string
                    } | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    tech_stack?: string[] | null
                    github_url?: string | null
                    demo_url?: string | null
                    show_github?: boolean | null
                    show_demo?: boolean | null
                    images?: {
                        home?: string
                        product?: string
                        collection?: string
                    } | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    tech_stack?: string[] | null
                    github_url?: string | null
                    demo_url?: string | null
                    show_github?: boolean | null
                    show_demo?: boolean | null
                    images?: {
                        home?: string
                        product?: string
                        collection?: string
                    } | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
