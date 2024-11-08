import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  surname: varchar("surname").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
});
