import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { teamEvents } from "@/app/db/schema/schema";
import { sql } from "drizzle-orm";
import { getUserRoleById } from "@/app/api/user/route";
import { auth } from "@/lib/auth";

// Obter eventos por data
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "A data não foi fornecida." },
      { status: 400 }
    );
  }

  try {
    const events = await db
      .select()
      .from(teamEvents)
      .where(sql`${teamEvents.eventDate} = ${date}`); // Comparação direta com SQL
    return NextResponse.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar eventos." },
      { status: 500 }
    );
  }
}

// Adicionar evento
export async function POST(req: NextRequest) {

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

  const body = await req.json();
  const { eventDate, description } = body;

  if (!eventDate || !description) {
    return NextResponse.json(
      { message: "Os dados do evento estão incompletos." },
      { status: 400 }
    );
  }

  try {
    const newEvent = await db.insert(teamEvents).values({
      eventDate,
      description,
    });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar evento:", error);
    return NextResponse.json(
      { message: "Erro ao adicionar evento." },
      { status: 500 }
    );
  }
}

// Deletar evento
export async function DELETE(req: NextRequest) {
  
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

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { message: "O ID do evento não foi fornecido." },
      { status: 400 }
    );
  }

  try {
    await db.delete(teamEvents).where(sql`${teamEvents.id} = ${id}`);
    return NextResponse.json(
      { message: "Evento excluído com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
    return NextResponse.json(
      { message: "Erro ao excluir evento." },
      { status: 500 }
    );
  }
}
