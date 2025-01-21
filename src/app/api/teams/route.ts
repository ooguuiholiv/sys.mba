import { NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { teams } from "@/app/db/schema/schema";
import { getUserRoleById } from "@/app/api/user/route";
import { auth } from "@/lib/auth";

// Função que busca os dados do banco
export async function GET() {
  try {
    const teamsData = await db.select().from(teams);
    return NextResponse.json(teamsData);
  } catch (error) {
    console.error("Erro ao buscar equipes:", error);
    return NextResponse.error();
  }
}

// Função que insere dados no banco
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ message: "Nenhum usuário autenticado!" });
  const userId = session?.user?.id;
  const role = await getUserRoleById(JSON.stringify(userId));
  if (role !== "admin") {
    return NextResponse.json(
      { message: "Usuário não autorizado a executar esta ação" },
      { status: 401 }
    );
  }
  const { team } = await request.json();
  try {
    await db.insert(teams).values({ team });
    return NextResponse.json({ message: "Equipe salva com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar equipe:", error);
    return NextResponse.error();
  }
}
