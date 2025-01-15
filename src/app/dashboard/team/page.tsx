import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      team: "Latão",
      members: 8,
    },
    // ...
  ];
}

export default async function DashboardTeam() {
  const data = await getData();

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
              <Input id="team" value="Lider da Equipe" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="bg-green-500 text-white font-bold"
                type="submit"
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
