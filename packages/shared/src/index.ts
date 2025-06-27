import { PrismaClient } from "./generated/prisma"
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./supabase/client";


export const prismaClient = new PrismaClient()

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
