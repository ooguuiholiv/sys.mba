"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar1, Group, LogIn, SquareUser, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItems = () => {
  const pathName = usePathname();
  const NavItems = [
    {
      label: "Programação",
      icon: Calendar1,
      path: "/dashboard/calendar",
    },
    {
      label: "Equipe",
      icon: Group,
      path: "/dashboard/team",
    },
   // { label: "Funcionário", icon: User2, path: "/dashboard/member" },
    { label: "Login", icon: LogIn, path: "/auth/login" },
  ];
  return (
    <nav className="w-full flex flex-col gap-2 px-2 py-4">
      {NavItems.map((item) => {
        const isActive = pathName.startsWith(item.path);
        return (
          <Link key={item.path} href={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full gap-2 justify-start",
                isActive && "bg-accent"
              )}
            >
              <item.icon size={16} />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
