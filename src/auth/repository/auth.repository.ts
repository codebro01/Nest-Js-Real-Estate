import { Inject, Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('DB') private readonly DbProvider: NodePgDatabase<typeof import('@src/db/schema')>,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient ) {}
  async loginUser(data: { email: string; password: string }) {
    const user = await this.supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    return user;
  }
}