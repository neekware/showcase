import { type InferInsertModel, type InferSelectModel, sql } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidV4 } from 'uuid';

export const RoleEnum = pgEnum('Role', ['USER', 'STAFF', 'ADMIN', 'SUPERUSER']);

export const User = pgTable('user', {
  id: varchar('id', { length: 128 }).$defaultFn(uuidV4),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: boolean('emailVerified').default(false),
  phone: varchar('phone', { length: 255 }).unique(),
  phoneVerified: boolean('phoneVerified').default(false),
  avatar: text('avatar'),
  password: text('password').default(sql`gen_random_uuid()`),
  role: RoleEnum('role').default('USER'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow().notNull(),
});

export type UserType = InferSelectModel<typeof User>;
export type CreateUserType = InferInsertModel<typeof User>;
