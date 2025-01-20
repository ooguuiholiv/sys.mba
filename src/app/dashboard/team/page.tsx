"use client"
import {useState, useEffect} from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { db } from "@/app/db/drizzle";
import { teams } from "@/app/db/schema/schema";

export default function DashboardTeam() {
  const [data, setData] = useState<Payment[]>([]);
  const [newTeam, setNewTeam] = useState("");

 const fetchTeamsFromDB = async () => {
   try {
     const response = await fetch("/api/teams");
     const teamsData = await response.json();
     setData(teamsData);
   } catch (error) {
     console.error("Erro ao buscar equipes:", error);
   }
 };

  const saveTeamToDB = async (team: string) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team }),
      });

      if (response.ok) {
        fetchTeamsFromDB(); // Atualiza os dados após inserir
      }
    } catch (error) {
      console.error("Erro ao salvar equipe:", error);
    }
  };

  useEffect(() => {
    fetchTeamsFromDB();
  }, []);

  const handleSaveTeam = async () => {
    if (newTeam.trim() === "") {
      alert("Por favor, insira o nome da equipe.");
      return;
    }
    await saveTeamToDB(newTeam); // Salva no banco
    setNewTeam(""); // Limpa o input
  };

  return (
    <div className="container mx-auto py-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="mb-2">
            Cadastrar
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cadastro de Equipes</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Lider da Equipe
              </Label>
              <Input id="team" value={newTeam} onChange={(e) => {setNewTeam(e.target.value)}} className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                onClick={handleSaveTeam}
                className="bg-green-500 text-white font-bold"
                type="button"
              >
                Salvar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
