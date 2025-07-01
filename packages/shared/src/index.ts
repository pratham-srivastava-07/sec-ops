import { PrismaClient } from "@prisma/client"
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./supabase/server";
export * from "./supabase/client";


export const prismaClient = new PrismaClient()

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
