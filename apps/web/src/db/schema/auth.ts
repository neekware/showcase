import { type InferInsertModel, type InferSelectModel, sql } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const RoleEnum = pgEnum('Role', ['USER', 'STAFF', 'ADMIN', 'SUPERUSER']);

export const UserSchema = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  verified: timestamp('verified', { mode: 'date' }),
  avatar: text('avatar'),
  password: text('password').default(sql`gen_random_uuid()`),
  role: RoleEnum('role').default('USER'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow().notNull(),
});

export type IUser = InferSelectModel<typeof UserSchema>;
export type ICreateUser = InferInsertModel<typeof UserSchema>;

export const AccountSchema = pgTable('account', {
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
    .references(() => UserSchema.id, { onDelete: 'cascade' }),
});
