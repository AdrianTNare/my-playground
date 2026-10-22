import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tils\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`body\` text,
  	\`slug\` text,
  	\`date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`tils_slug_idx\` ON \`tils\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tils_updated_at_idx\` ON \`tils\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tils_created_at_idx\` ON \`tils\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tils__status_idx\` ON \`tils\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`tils_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tils\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`tils_texts_order_parent\` ON \`tils_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_tils_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tils\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_tils_v_parent_idx\` ON \`_tils_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_version_version_slug_idx\` ON \`_tils_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_version_version_updated_at_idx\` ON \`_tils_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_version_version_created_at_idx\` ON \`_tils_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_version_version__status_idx\` ON \`_tils_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_created_at_idx\` ON \`_tils_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_updated_at_idx\` ON \`_tils_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tils_v_latest_idx\` ON \`_tils_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`_tils_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tils_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_tils_v_texts_order_parent\` ON \`_tils_v_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`reflections\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`content\` text,
  	\`slug\` text,
  	\`date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`reflections_slug_idx\` ON \`reflections\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`reflections_updated_at_idx\` ON \`reflections\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`reflections_created_at_idx\` ON \`reflections\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`reflections__status_idx\` ON \`reflections\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`reflections_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reflections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`reflections_texts_order_parent\` ON \`reflections_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_reflections_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_content\` text,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reflections\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_reflections_v_parent_idx\` ON \`_reflections_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_version_version_slug_idx\` ON \`_reflections_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_version_version_updated_at_idx\` ON \`_reflections_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_version_version_created_at_idx\` ON \`_reflections_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_version_version__status_idx\` ON \`_reflections_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_created_at_idx\` ON \`_reflections_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_updated_at_idx\` ON \`_reflections_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_reflections_v_latest_idx\` ON \`_reflections_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`_reflections_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_reflections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_reflections_v_texts_order_parent\` ON \`_reflections_v_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`bliki\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`content\` text,
  	\`slug\` text,
  	\`date\` text,
  	\`updated\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`bliki_slug_idx\` ON \`bliki\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`bliki_updated_at_idx\` ON \`bliki\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`bliki_created_at_idx\` ON \`bliki\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`bliki__status_idx\` ON \`bliki\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`bliki_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bliki\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`bliki_texts_order_parent\` ON \`bliki_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_bliki_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_content\` text,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_updated\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bliki\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_bliki_v_parent_idx\` ON \`_bliki_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_version_version_slug_idx\` ON \`_bliki_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_version_version_updated_at_idx\` ON \`_bliki_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_version_version_created_at_idx\` ON \`_bliki_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_version_version__status_idx\` ON \`_bliki_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_created_at_idx\` ON \`_bliki_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_updated_at_idx\` ON \`_bliki_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_bliki_v_latest_idx\` ON \`_bliki_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`_bliki_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bliki_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_bliki_v_texts_order_parent\` ON \`_bliki_v_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`media_reactions_takeaways\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media_reactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`media_reactions_takeaways_order_idx\` ON \`media_reactions_takeaways\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_reactions_takeaways_parent_id_idx\` ON \`media_reactions_takeaways\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`media_reactions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`source\` text,
  	\`source_url\` text,
  	\`by\` text,
  	\`body\` text,
  	\`slug\` text,
  	\`date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`media_reactions_slug_idx\` ON \`media_reactions\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_reactions_updated_at_idx\` ON \`media_reactions\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_reactions_created_at_idx\` ON \`media_reactions\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_reactions__status_idx\` ON \`media_reactions\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`_media_reactions_v_version_takeaways\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_media_reactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_takeaways_order_idx\` ON \`_media_reactions_v_version_takeaways\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_takeaways_parent_id_idx\` ON \`_media_reactions_v_version_takeaways\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_media_reactions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_source\` text,
  	\`version_source_url\` text,
  	\`version_by\` text,
  	\`version_body\` text,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media_reactions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_parent_idx\` ON \`_media_reactions_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_version_slug_idx\` ON \`_media_reactions_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_version_updated_at_idx\` ON \`_media_reactions_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_version_created_at_idx\` ON \`_media_reactions_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_version_version__status_idx\` ON \`_media_reactions_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_created_at_idx\` ON \`_media_reactions_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_updated_at_idx\` ON \`_media_reactions_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_media_reactions_v_latest_idx\` ON \`_media_reactions_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`refs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`url\` text,
  	\`note\` text,
  	\`slug\` text,
  	\`date\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`refs_slug_idx\` ON \`refs\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`refs_updated_at_idx\` ON \`refs\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`refs_created_at_idx\` ON \`refs\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`refs__status_idx\` ON \`refs\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`refs_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`refs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`refs_texts_order_parent\` ON \`refs_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_refs_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_url\` text,
  	\`version_note\` text,
  	\`version_slug\` text,
  	\`version_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`refs\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_refs_v_parent_idx\` ON \`_refs_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_version_version_slug_idx\` ON \`_refs_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_version_version_updated_at_idx\` ON \`_refs_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_version_version_created_at_idx\` ON \`_refs_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_version_version__status_idx\` ON \`_refs_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_created_at_idx\` ON \`_refs_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_updated_at_idx\` ON \`_refs_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_refs_v_latest_idx\` ON \`_refs_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`_refs_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_refs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_refs_v_texts_order_parent\` ON \`_refs_v_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_links_order_idx\` ON \`projects_links\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_links_parent_id_idx\` ON \`projects_links\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`summary\` text,
  	\`description\` text,
  	\`preview\` text,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`projects_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`projects_texts_order_parent\` ON \`projects_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_version_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_links_order_idx\` ON \`_projects_v_version_links\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_links_parent_id_idx\` ON \`_projects_v_version_links\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_summary\` text,
  	\`version_description\` text,
  	\`version_preview\` text,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`_projects_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_projects_v_texts_order_parent\` ON \`_projects_v_texts\` (\`order\`,\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`section\` text,
  	\`category\` text,
  	\`url\` text,
  	\`why\` text,
  	\`details\` text,
  	\`slug\` text,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tools_updated_at_idx\` ON \`tools\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`tools__status_idx\` ON \`tools\` (\`_status\`);`,
  );
  await db.run(sql`CREATE TABLE \`_tools_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_section\` text,
  	\`version_category\` text,
  	\`version_url\` text,
  	\`version_why\` text,
  	\`version_details\` text,
  	\`version_slug\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_tools_v_parent_idx\` ON \`_tools_v\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_version_version_slug_idx\` ON \`_tools_v\` (\`version_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_version_version_updated_at_idx\` ON \`_tools_v\` (\`version_updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_version_version_created_at_idx\` ON \`_tools_v\` (\`version_created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_version_version__status_idx\` ON \`_tools_v\` (\`version__status\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_created_at_idx\` ON \`_tools_v\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_updated_at_idx\` ON \`_tools_v\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`_tools_v_latest_idx\` ON \`_tools_v\` (\`latest\`);`,
  );
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`,
  );
  await db.run(
    sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tils_id\` integer,
  	\`reflections_id\` integer,
  	\`bliki_id\` integer,
  	\`media_reactions_id\` integer,
  	\`refs_id\` integer,
  	\`projects_id\` integer,
  	\`tools_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tils_id\`) REFERENCES \`tils\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reflections_id\`) REFERENCES \`reflections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bliki_id\`) REFERENCES \`bliki\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_reactions_id\`) REFERENCES \`media_reactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`refs_id\`) REFERENCES \`refs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_tils_id_idx\` ON \`payload_locked_documents_rels\` (\`tils_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_reflections_id_idx\` ON \`payload_locked_documents_rels\` (\`reflections_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_bliki_id_idx\` ON \`payload_locked_documents_rels\` (\`bliki_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_reactions_id_idx\` ON \`payload_locked_documents_rels\` (\`media_reactions_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_refs_id_idx\` ON \`payload_locked_documents_rels\` (\`refs_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`tools_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`now_sections_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`now_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`now_sections_paragraphs_order_idx\` ON \`now_sections_paragraphs\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`now_sections_paragraphs_parent_id_idx\` ON \`now_sections_paragraphs\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`now_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`now_sections_order_idx\` ON \`now_sections\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`now_sections_parent_id_idx\` ON \`now_sections\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`now\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated\` text NOT NULL,
  	\`location\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `);
  await db.run(sql`CREATE TABLE \`unoffice_hours_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`unoffice_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_intro_order_idx\` ON \`unoffice_hours_intro\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_intro_parent_id_idx\` ON \`unoffice_hours_intro\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`unoffice_hours_good_for\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`unoffice_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_good_for_order_idx\` ON \`unoffice_hours_good_for\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_good_for_parent_id_idx\` ON \`unoffice_hours_good_for\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`unoffice_hours_not_for\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`unoffice_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_not_for_order_idx\` ON \`unoffice_hours_not_for\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`unoffice_hours_not_for_parent_id_idx\` ON \`unoffice_hours_not_for\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`unoffice_hours\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`booking_url\` text,
  	\`duration_minutes\` numeric DEFAULT 30 NOT NULL,
  	\`timezone\` text DEFAULT 'SAST (UTC+2)' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tils\`;`);
  await db.run(sql`DROP TABLE \`tils_texts\`;`);
  await db.run(sql`DROP TABLE \`_tils_v\`;`);
  await db.run(sql`DROP TABLE \`_tils_v_texts\`;`);
  await db.run(sql`DROP TABLE \`reflections\`;`);
  await db.run(sql`DROP TABLE \`reflections_texts\`;`);
  await db.run(sql`DROP TABLE \`_reflections_v\`;`);
  await db.run(sql`DROP TABLE \`_reflections_v_texts\`;`);
  await db.run(sql`DROP TABLE \`bliki\`;`);
  await db.run(sql`DROP TABLE \`bliki_texts\`;`);
  await db.run(sql`DROP TABLE \`_bliki_v\`;`);
  await db.run(sql`DROP TABLE \`_bliki_v_texts\`;`);
  await db.run(sql`DROP TABLE \`media_reactions_takeaways\`;`);
  await db.run(sql`DROP TABLE \`media_reactions\`;`);
  await db.run(sql`DROP TABLE \`_media_reactions_v_version_takeaways\`;`);
  await db.run(sql`DROP TABLE \`_media_reactions_v\`;`);
  await db.run(sql`DROP TABLE \`refs\`;`);
  await db.run(sql`DROP TABLE \`refs_texts\`;`);
  await db.run(sql`DROP TABLE \`_refs_v\`;`);
  await db.run(sql`DROP TABLE \`_refs_v_texts\`;`);
  await db.run(sql`DROP TABLE \`projects_links\`;`);
  await db.run(sql`DROP TABLE \`projects\`;`);
  await db.run(sql`DROP TABLE \`projects_texts\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_version_links\`;`);
  await db.run(sql`DROP TABLE \`_projects_v\`;`);
  await db.run(sql`DROP TABLE \`_projects_v_texts\`;`);
  await db.run(sql`DROP TABLE \`tools\`;`);
  await db.run(sql`DROP TABLE \`_tools_v\`;`);
  await db.run(sql`DROP TABLE \`users_sessions\`;`);
  await db.run(sql`DROP TABLE \`users\`;`);
  await db.run(sql`DROP TABLE \`payload_kv\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_migrations\`;`);
  await db.run(sql`DROP TABLE \`now_sections_paragraphs\`;`);
  await db.run(sql`DROP TABLE \`now_sections\`;`);
  await db.run(sql`DROP TABLE \`now\`;`);
  await db.run(sql`DROP TABLE \`unoffice_hours_intro\`;`);
  await db.run(sql`DROP TABLE \`unoffice_hours_good_for\`;`);
  await db.run(sql`DROP TABLE \`unoffice_hours_not_for\`;`);
  await db.run(sql`DROP TABLE \`unoffice_hours\`;`);
}
