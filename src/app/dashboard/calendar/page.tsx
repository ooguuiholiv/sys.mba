"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DashboardCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  const events: Record<string, string[]> = {
    "2025-01-16": ["Reunião de equipe", "Call com cliente"],
    "2025-01-17": ["Treinamento interno"],
  };

  const getDateKey = (date: Date | null) =>
    date ? format(date, "yyyy-MM-dd") : "";

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(data) => {
          setSelectedDate(data || null);
          setDate(data);
          setSheetOpen(true);
        }}
        className="rounded-md border w-full h-full"
      />
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedDate(null);
          setSheetOpen(open);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedDate
                ? format(selectedDate, "dd/MM/yyyy")
                : "Data não selecionada"}
            </SheetTitle>
            <SheetDescription>
              {selectedDate && events[getDateKey(selectedDate)]?.length === 0
                ? "Sem eventos para este dia."
                : ""}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-bold">Eventos do Dia</h3>
            {/* Renderizar eventos como cards */}
            {selectedDate &&
              events[getDateKey(selectedDate)]?.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md shadow-sm bg-white"
                >
                  <p className="text-sm text-gray-600">{event}</p>
                </div>
              ))}
            {selectedDate && events[getDateKey(selectedDate)]?.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhum evento para este dia.
              </p>
            )}
          </div>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-bold">Adicionar Evento</h3>
            <input
              type="text"
              placeholder="Descrição do evento"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded-md">
              Salvar Evento
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
