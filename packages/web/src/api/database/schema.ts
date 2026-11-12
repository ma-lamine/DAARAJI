import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export * from './auth-schema';
export const siteContent = sqliteTable('site_content', { id: integer('id').primaryKey(), data: text('data').notNull() });
export const inquiries = sqliteTable('inquiries', {
  id: text('id').primaryKey(), name: text('name').notNull(), age: text('age').notNull(),
  guardian: text('guardian').notNull(), email: text('email').notNull(), phone: text('phone').notNull(),
  level: text('level').notNull(), course: text('course').notNull(), format: text('format').notNull(),
  plan: text('plan').notNull(), availability: text('availability').notNull(), message: text('message').notNull(),
  accompaniment: text('accompaniment').notNull().default('À préciser ensemble'),
  channel: text('channel').notNull(), status: text('status').notNull().default('Nouveau'),
  createdAt: text('created_at').notNull(),
});

/**
 * Define your database schema here, then apply it with `bun run db:push`
 * (from packages/web). Re-export any generated schema from this file
 * (e.g. Better Auth's auth-schema.ts) so drizzle generates complete migrations.
 * Table patterns and conventions: skills/app/references/api.md
 */
