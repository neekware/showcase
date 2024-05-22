import { type InferInsertModel, type InferSelectModel, sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { User } from './user';

export const Auth = pgTable('auth', {
  id: text('id').notNull().primaryKey(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('userId')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),
});

export type AuthType = InferSelectModel<typeof Auth>;
export type CreateAuthType = InferInsertModel<typeof Auth>;
