import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertAppointment } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useAppointments() {
  return useQuery({
    queryKey: [api.appointments.list.path],
    queryFn: async () => {
      const res = await fetch(api.appointments.list.path);
      if (!res.ok) throw new Error("Falha ao carregar agendamentos");
      return api.appointments.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await fetch(api.appointments.create.path, {
        method: api.appointments.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.appointments.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Erro de validação");
        }
        throw new Error("Falha ao criar agendamento");
      }
      return api.appointments.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.appointments.list.path] });
      toast({
        title: "Agendamento Confirmado!",
        description: "Esperamos você no horário marcado.",
        className: "bg-primary text-primary-foreground border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro no agendamento",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.appointments.delete.path, { id });
      const res = await fetch(url, { method: api.appointments.delete.method });
      if (!res.ok) throw new Error("Falha ao cancelar agendamento");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.appointments.list.path] });
      toast({
        title: "Agendamento Cancelado",
        description: "O horário foi liberado.",
      });
    },
  });
}
