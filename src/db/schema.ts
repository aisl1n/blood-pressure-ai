import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Tabelas para o sistema de monitoramento de pressão arterial

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().unique(),
  dateOfBirth: date("date_of_birth"),
  gender: text(), // 'M', 'F', 'Other'
  weight: decimal("weight", { precision: 5, scale: 2 }), // em kg
  height: decimal("height", { precision: 5, scale: 2 }), // em cm
  medicalConditions: text("medical_conditions"), // condições médicas existentes
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bloodPressureRecordTable = pgTable("blood_pressure_record", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  systolic: integer().notNull(), // pressão sistólica (máxima)
  diastolic: integer().notNull(), // pressão diastólica (mínima)
  pulse: integer().notNull(), // batimentos por minuto (opcional)
  measurementTime: timestamp("measurement_time").notNull(), // quando foi medido
  position: text(), // 'sitting', 'lying', 'standing'
  arm: text(), // 'left', 'right'
  beforeMedication: boolean("before_medication").default(false), // se foi medido antes da medicação
  notes: text(), // observações sobre a medição
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const medicationRecordTable = pgTable("medication_record", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  medicationName: text("medication_name").notNull(),
  dosage: text().notNull(), // ex: "5mg", "10ml"
  frequency: text().notNull(), // ex: "2x por dia", "a cada 8 horas"
  takenAt: timestamp("taken_at").notNull(), // quando tomou
  notes: text(), // observações sobre a medicação
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const noteTable = pgTable("note", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  title: text(),
  content: text().notNull(),
  category: text(), // 'symptom', 'diet', 'exercise', 'general'
  noteDate: date("note_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Tabela para metas e alertas
export const alertTable = pgTable("alert", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  type: text().notNull(), // 'high_pressure', 'low_pressure', 'irregular_pulse'
  message: text().notNull(),
  severity: text().notNull(), // 'low', 'medium', 'high', 'critical'
  isRead: boolean("is_read").default(false),
  triggerRecordId: uuid("trigger_record_id")
    .references(() => bloodPressureRecordTable.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
