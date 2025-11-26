import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '../../data/apod.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create optimized schema
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS apod_cache (
    date TEXT PRIMARY KEY,
    title TEXT,
    media_type TEXT,
    data TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`;

const createIndexSQL = `
  CREATE INDEX IF NOT EXISTS idx_created_at ON apod_cache(created_at)
`;

db.exec(createTableSQL);
db.exec(createIndexSQL);

export default db;
