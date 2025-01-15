import { Button } from "@/components/ui/button";
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

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      phone: "(34)99767-4565",
      fullname: "Guilherme Franco Oliveira",
      cpf: "149.352.456-97",
      team: "Latão",
    },
    // ...
  ];
}

export default async function DashboardEmployee() {
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
            <SheetTitle>Cadastro de Funcionários</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Nome Completo
              </Label>
              <Input
                id="fullname"
                value="Nome Completo"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cpf" className="text-right">
                CPF
              </Label>
              <Input id="cpf" value="CPF" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input id="phone" value="Telefone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Equipe
              </Label>
              <Input id="team" value="Equipe" className="col-span-3" />
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
