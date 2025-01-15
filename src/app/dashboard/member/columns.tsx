"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  phone: string;
  fullname: string
  cpf: string;
  team: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "fullname",
    header: "Nome Completo",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "team",
    header: "Equipe",
  },
];
