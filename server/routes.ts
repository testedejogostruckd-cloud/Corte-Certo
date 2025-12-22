import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  try {
    const existing = await storage.getAppointments();
    if (existing.length === 0) {
      await storage.createAppointment({
        name: "João Silva",
        email: "joao@exemplo.com",
        phone: "11999999999",
        service: "Corte de Cabelo",
        date: "2024-01-20",
        time: "10:00"
      });
      await storage.createAppointment({
        name: "Carlos Santos",
        email: "carlos@exemplo.com",
        phone: "11988888888",
        service: "Combo Completo",
        date: "2024-01-21",
        time: "14:00"
      });
      console.log("Database seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Start seeding in background to not block startup
  seedDatabase();

  app.get(api.appointments.list.path, async (req, res) => {
    const appointments = await storage.getAppointments();
    res.json(appointments);
  });

  app.post(api.appointments.create.path, async (req, res) => {
    try {
      const input = api.appointments.create.input.parse(req.body);
      const appointment = await storage.createAppointment(input);
      res.status(201).json(appointment);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.appointments.delete.path, async (req, res) => {
    await storage.deleteAppointment(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}
