"use client"
import { NavItems } from "@/components/pages/dashboard/nav-items";
import { ReactNode } from "react";
import Logo from "@/assets/logo.svg";
import { UserDropdown } from "@/components/pages/dashboard/user-dropdown";
import { ModeToggle } from "@/components/shared/theme-toogle";
import * as React from 'react'
import { Menu, X } from "lucide-react"; // Para ícones


type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };


  return (
    <div className="w-full h-screen overflow-hidden grid lg:grid-cols-[300px,1fr] grid-cols-1">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative z-40 transition-transform duration-300 shadow-lg lg:shadow-none flex flex-col items-center border-r border-muted bg-background text-foreground`}
      >
        <div className="w-full p-6 border-b border-muted flex justify-between items-center">
          <Logo />
          
        </div>
        <NavItems />
        <div className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
          <UserDropdown />
          <ModeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-6 flex flex-col w-full h-full overflow-auto">
        {/* Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-muted/50 text-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted"
        >
          <Menu className="w-6 h-6" />
        </button>
        {children}
      </main>
    </div>
  );
}
