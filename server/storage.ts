import { db } from "./db";
import { appointments, type InsertAppointment } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAppointments(): Promise<typeof appointments.$inferSelect[]>;
  createAppointment(appointment: InsertAppointment): Promise<typeof appointments.$inferSelect>;
  deleteAppointment(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAppointments(): Promise<typeof appointments.$inferSelect[]> {
    return await db.select().from(appointments);
  }

  async createAppointment(appointment: InsertAppointment): Promise<typeof appointments.$inferSelect> {
    const [newAppointment] = await db.insert(appointments).values(appointment).returning();
    return newAppointment;
  }

  async deleteAppointment(id: number): Promise<void> {
    await db.delete(appointments).where(eq(appointments.id, id));
  }
}

export const storage = new DatabaseStorage();
