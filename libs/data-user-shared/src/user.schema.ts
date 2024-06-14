import {
  boolean,
  type InferInsertModel,
  type InferSelectModel,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from '@lib/data-db-shared';
import { v4 as uuidV4 } from '@lib/data-model-shared';

export const RoleEnum = pgEnum('Role', ['USER', 'STAFF', 'ADMIN', 'SUPERUSER']);

export const UserTable = pgTable('user', {
  id: varchar('id', { length: 36 }).$defaultFn(uuidV4).notNull().unique(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('emailVerified').default(false),
  phone: varchar('phone', { length: 255 }),
  phoneVerified: boolean('phoneVerified').default(false),
  avatar: text('avatar'),
  password: varchar('password', { length: 255 }).$defaultFn(uuidV4),
  role: RoleEnum('role').default('USER'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  lastLoginAt: timestamp('lastLoginAt').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof UserTable>;
export type CreateUser = InferInsertModel<typeof UserTable>;
