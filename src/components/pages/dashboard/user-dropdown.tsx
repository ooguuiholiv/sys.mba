import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut, SquareUser } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

type UserDropdownProps = {
  user?: User;
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  if (!user) return "Convidado";

  const initial = user?.name
    ?.split(" ")
    ?.slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full gap-2 justify-start px-2">
          <Avatar className="w-7 h-7 block">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem
          className="gap-2 text-red-500"
          onClick={() => {
            signOut({ callbackUrl: "/dashboard/calendar" });
          }}
        >
          <LogOut size={16} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
