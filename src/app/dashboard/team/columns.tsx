"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  team: string;
  // members: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "team",
    header: "Equipe",
  },
 /*  {
    accessorKey: "members",
    header: "Qtde. Membros",
  }, */
];
