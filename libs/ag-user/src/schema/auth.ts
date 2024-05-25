import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidV4 } from 'uuid';
import { UserTable } from './user';

export const AuthTable = pgTable('auth', {
  id: varchar('id', { length: 36 }).$defaultFn(uuidV4).unique().notNull(),
  refreshToken: text('refreshToken'),
  accessToken: text('accessToken'),
  expiresAt: timestamp('expiresAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId: varchar('userId', { length: 36 })
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
});

export type Auth = InferSelectModel<typeof AuthTable>;
export type CreateAuth = InferInsertModel<typeof AuthTable>;
