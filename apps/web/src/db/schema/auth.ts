import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
// eslint-disable-next-line import/named
import { v4 as uuidV4 } from 'uuid';
import { user } from './user';

export const auth = pgTable('auth', {
  id: varchar('id', { length: 36 }).$defaultFn(uuidV4).notNull().unique(),
  refreshToken: text('refreshToken'),
  accessToken: text('accessToken'),
  expiresAt: timestamp('expiresAt'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId: varchar('userId', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export type Auth = InferSelectModel<typeof auth>;
export type CreateAuth = InferInsertModel<typeof auth>;
