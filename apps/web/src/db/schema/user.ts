import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
// eslint-disable-next-line import/named
import { v4 as uuidV4 } from 'uuid';

export const RoleEnum = pgEnum('Role', ['USER', 'STAFF', 'ADMIN', 'SUPERUSER']);

export const user = pgTable('user', {
  id: varchar('id', { length: 36 }).$defaultFn(uuidV4).notNull().unique(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  phone: varchar('phone', { length: 255 }).unique().notNull(),
  phoneVerified: boolean('phoneVerified').default(false).notNull(),
  avatar: text('avatar'),
  password: varchar('password', { length: 255 }).notNull().$defaultFn(uuidV4),
  role: RoleEnum('role').default('USER').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  lastLoginAt: timestamp('lastLoginAt').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof user>;
export type CreateUser = InferInsertModel<typeof user>;
