import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useCreateAppointment, useAppointments } from "@/hooks/use-appointments";
import { insertAppointmentSchema, type InsertAppointment } from "@shared/schema";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const services = [
  { id: "Corte de Cabelo", label: "Corte de Cabelo (R$ 50)" },
  { id: "Barba", label: "Barba (R$ 30)" },
  { id: "Completo", label: "Combo Completo (R$ 70)" },
];

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { data: appointments } = useAppointments();
  const createAppointment = useCreateAppointment();

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Corte de Cabelo",
      time: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    createAppointment.mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
      }
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      form.setValue("date", format(selectedDate, "yyyy-MM-dd"));
      form.setValue("time", ""); // Reset time when date changes
    }
  };

  // Filter available slots based on selected date and existing appointments
  const getAvailableSlots = () => {
    if (!date || !appointments) return timeSlots;
    const dateStr = format(date, "yyyy-MM-dd");
    const takenSlots = appointments
      .filter(app => app.date === dateStr && app.status !== 'cancelled')
      .map(app => app.time);
    return timeSlots.filter(slot => !takenSlots.includes(slot));
  };

  const availableSlots = getAvailableSlots();

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 bg-card border border-primary/20 rounded-2xl text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold mb-4">Agendado!</h3>
        <p className="text-muted-foreground mb-8">
          Seu horário foi reservado com sucesso. Enviamos um email com os detalhes.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)}
          className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90"
        >
          Agendar Outro
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-3xl overflow-hidden shadow-2xl border border-border">
      <div className="grid md:grid-cols-2">
        {/* Left: Date & Time */}
        <div className="p-6 md:p-8 bg-secondary/50 border-r border-border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
            Escolha a Data e Hora
          </h3>
          
          <div className="space-y-8">
            <div className="bg-background rounded-xl p-4 border border-border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                locale={ptBR}
                className="rounded-md mx-auto"
                classNames={{
                  head_cell: "text-muted-foreground font-normal text-[0.8rem]",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Horários Disponíveis</h4>
              {date ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => form.setValue("time", slot, { shouldValidate: true })}
                        className={cn(
                          "px-2 py-2 text-sm rounded-lg border transition-all duration-200",
                          form.watch("time") === slot
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                            : "bg-background border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
                        )}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-sm text-destructive py-4">
                      Nenhum horário disponível nesta data.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4 bg-background/50 rounded-lg border border-dashed">
                  Selecione uma data primeiro
                </p>
              )}
              {form.formState.errors.time && (
                <p className="text-sm text-destructive mt-2">{form.formState.errors.time.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Personal Details */}
        <div className="p-6 md:p-8 bg-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
            Seus Dados
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Serviço</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {services.map((service) => (
                          <FormItem key={service.id} className="flex items-center space-x-3 space-y-0 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={service.id} className="border-primary text-primary" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer w-full">
                              {service.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} className="bg-background border-border focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} className="bg-background border-border focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" {...field} className="bg-background border-border focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={createAppointment.isPending}
                  className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl transition-all hover:-translate-y-0.5"
                >
                  {createAppointment.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar Agendamento"
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao agendar, você concorda com nossa política de cancelamento de 24h.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
