import { sql } from "drizzle-orm";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema/schema";

export async function getUserRoleById(userId: string): Promise<string | null> {
  try {
    userId = userId.replace(/^"|"$/g, "");
    const result = await db.execute(
      sql`SELECT role FROM ${users} WHERE id = ${userId}`
    );

    const roleString = JSON.stringify(result);
    const role = roleString.split('"role":"')[1]?.split('"')[0] || null;

    return role;
  } catch (error) {
    console.error("Erro ao buscar a role do usuário:", error);
    throw error;
  }
}
getUserRoleById("3a542170-43ab-4f2f-a2d5-0820dddbf830");
