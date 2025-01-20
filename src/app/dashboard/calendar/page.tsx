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
} from "@/components/ui/sheet";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
  const [eventDescription, setEventDescription] = React.useState<string>("");
  const [events, setEvents] = React.useState<any[]>([]);
  const [teams, setTeams] = React.useState<any[]>([]);

  const fetchEvents = async (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    try {
      const response = await fetch(`/api/calendar?date=${formattedDate}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data); // Atualiza os eventos no estado
      } else {
        console.error("Erro ao buscar eventos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setTeams(data); // Atualiza as equipes no estado
      } else {
        console.error("Erro ao buscar equipes:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar equipes:", error);
    }
  };


   const handleAddEvent = async () => {
     if (selectedDate && eventDescription && selectedTeam) {
       try {
         // Concatena equipe e descrição
         const formattedDescription = `${selectedTeam} - ${eventDescription}`;

         // Faz a chamada para a API
         const response = await fetch("/api/calendar", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             eventDate: format(selectedDate, "yyyy-MM-dd"), // Data formatada
             description: formattedDescription, // Descrição formatada
           }),
         });

         // Processa a resposta
         if (response.ok) {
           await fetchEvents(selectedDate); // Atualiza os eventos após adicionar
           setEventDescription(""); // Reseta o campo de descrição
           setSelectedTeam(null); // Reseta a equipe selecionada
           alert("Evento adicionado com sucesso!");
         } else {
           console.error("Erro ao adicionar evento:", response.statusText);
           alert("Erro ao adicionar evento.");
         }
       } catch (error) {
         console.error("Erro ao adicionar evento:", error);
         alert("Erro ao adicionar evento.");
       }
     } else {
       alert("Por favor, preencha todos os campos.");
     }
   };




   const handleDeleteEvent = async (eventId: number) => {
     try {
       const response = await fetch("/api/calendar", {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ id: eventId }),
       });

       if (response.ok) {
         fetchEvents(selectedDate!); // Atualiza os eventos após exclusão
         alert("Evento excluído com sucesso!");
       } else {
         console.error("Erro ao excluir evento:", response.statusText);
         alert("Erro ao excluir evento.");
       }
     } catch (error) {
       console.error("Erro ao excluir evento:", error);
       alert("Erro ao excluir evento.");
     }
   };

   React.useEffect(() => {
     if (selectedDate) {
       fetchEvents(selectedDate); // Carregar eventos ao selecionar uma data
     }
     fetchTeams(); // Carregar equipes apenas uma vez
   }, [selectedDate]);

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
              {selectedDate && events.length === 0
                ? "Sem eventos para este dia."
                : ""}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-bold">Eventos do Dia</h3>
            {selectedDate &&
              events.map((event: any) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-300 rounded-md shadow-sm bg-white"
                >
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Excluir Evento
                  </button>
                </div>
              ))}
            {selectedDate && events.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhum evento para este dia.
              </p>
            )}
          </div>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-bold">Adicionar Evento</h3>
            <Select
              onValueChange={(value) => setSelectedTeam(value)}
              value={selectedTeam || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma equipe" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team, index) => (
                  <SelectItem key={index} value={team.team}>
                    {team.team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Descrição do evento"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
              onClick={handleAddEvent}
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Salvar Evento
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
