import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface RsvpResponse {
  id: string;
  guest_name: string;
  response: "accept" | "decline";
  message?: string;
  created_at: string;
}

export interface CeremonyMember {
  id: string;
  category: "roses" | "candles" | "treasures";
  position: number;
  name: string;
  relation: string;
  message: string;
  gift?: string;
  updated_at?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  storage_path?: string;
  position: number;
  created_at?: string;
}

export interface AppSetting {
  key: string;
  value: string;
  updated_at?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  url: string;
  storage_path?: string;
  position: number;
  created_at?: string;
}
