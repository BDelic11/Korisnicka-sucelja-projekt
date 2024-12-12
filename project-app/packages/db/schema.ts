import { pgEnum, primaryKey } from 'drizzle-orm/pg-core';
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['user', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  surname: varchar('surname').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  role: userRole('role').notNull().default('user'),
});

export const salons = pgTable('salons', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description', { length: 255 }),
  phoneNumber: varchar('phone_number').notNull(),
  locationUrl: varchar('location_url').notNull(),
  followersNumber: integer('followers_number').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  adminId: integer('admin_id')
    .references(() => users.id)
    .notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('image_url').notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  likesNumber: integer('likes_number').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  salonId: integer('salon_id')
    .references(() => salons.id)
    .notNull(),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
});

export const postsToTags = pgTable(
  'posts_to_tags',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.postId, table.tagId] }),
      },
    ];
  }
);

export const likes = pgTable(
  'likes',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.postId, table.userId] }),
      },
    ];
  }
);
