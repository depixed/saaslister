import Database from 'better-sqlite3';
import { directories } from '../src/data/directories.js';

const db = new Database('directories.db');

// Create the directories table
db.exec(`
  CREATE TABLE IF NOT EXISTS directories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    da INTEGER NOT NULL,
    pa INTEGER NOT NULL,
    dr INTEGER NOT NULL,
    niches TEXT NOT NULL,
    traffic INTEGER NOT NULL,
    isPaid INTEGER NOT NULL,
    logo TEXT,
    description TEXT,
    linkType TEXT
  )
`);

// Clear existing data
db.exec('DELETE FROM directories');

// Insert sample data
const stmt = db.prepare(`
  INSERT INTO directories (id, name, url, da, pa, dr, niches, traffic, isPaid, logo, description, linkType)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

directories.forEach(directory => {
  stmt.run(
    directory.id,
    directory.name,
    directory.url,
    directory.da,
    directory.pa,
    directory.dr,
    JSON.stringify(directory.niches),
    directory.traffic,
    directory.isPaid ? 1 : 0,
    directory.logo || null,
    directory.description || null,
    directory.linkType || null
  );
});

console.log('Database initialized with sample data!');
db.close();