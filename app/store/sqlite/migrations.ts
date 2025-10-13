// src/db/migrations.ts
import type { SQLiteDatabase } from "expo-sqlite";

/**
 * Each migration is an async fn that receives the open db
 * and performs schema changes or data migrations.
 */
const migrations: ((db: SQLiteDatabase) => Promise<void>)[] = [
  // v1: create table
  async (db) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS __migrations (version INTEGER PRIMARY KEY);
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  },

  // v2: example — add an 'extra' column (safe if not already present)
  async (db) => {
    // ALTER might fail if column exists; a safe approach is to try/catch or create a temp table in complex cases.
    try {
      await db.execAsync(`ALTER TABLE items ADD COLUMN extra TEXT DEFAULT ''`);
    } catch {
      // Column already exists -> ignore
    }
  },
];

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // ensure migrations table exists (v1 does this too, but safe here)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS __migrations (version INTEGER PRIMARY KEY);
  `);

  // get last applied version (0 if none)
  const lastRow = await db.getFirstAsync<{ version: number }>(
    "SELECT MAX(version) as version FROM __migrations;"
  );
  const currentVersion = lastRow?.version ?? 0;

  for (let i = currentVersion; i < migrations.length; i++) {
    const migrationIndex = i; // 0-based
    const migration = migrations[migrationIndex];
    await migration(db); // run migration
    const appliedVersion = migrationIndex + 1; // human-friendly migration number
    await db.runAsync(
      "INSERT INTO __migrations (version) VALUES (?);",
      appliedVersion
    );
    console.log("Applied migration", appliedVersion);
  }
}
