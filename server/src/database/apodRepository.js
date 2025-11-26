import db from './db.js';
import config from '../config/index.js';

const apodRepository = {
  // Get single APOD from cache
  get(date) {
    const stmt = db.prepare('SELECT * FROM apod_cache WHERE date = ?');
    return stmt.get(date);
  },

  // Bulk get multiple APODs
  getMany(dates) {
    if (!dates || dates.length === 0) return [];

    const placeholders = dates.map(() => '?').join(',');
    const stmt = db.prepare(`SELECT * FROM apod_cache WHERE date IN (${placeholders})`);
    return stmt.all(...dates);
  },

  // Get all cached APODs
  getAll() {
    const stmt = db.prepare('SELECT * FROM apod_cache ORDER BY created_at DESC');
    return stmt.all();
  },

  // Set single APOD in cache
  set(date, title, mediaType, data) {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO apod_cache (date, title, media_type, data, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(date, title, mediaType, JSON.stringify(data), Date.now());
  },

  // Bulk insert multiple APODs in single transaction
  setMany(apods) {
    if (!apods || apods.length === 0) return;

    const insert = db.prepare(`
      INSERT OR REPLACE INTO apod_cache (date, title, media_type, data, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const apod of items) {
        insert.run(
          apod.date,
          apod.title,
          apod.media_type,
          JSON.stringify(apod),
          Date.now()
        );
      }
    });

    insertMany(apods);
  },

  // Get cache count
  count() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM apod_cache');
    return stmt.get().count;
  },

  // Probabilistic cleanup - only run if threshold exceeded
  pruneIfNeeded() {
    const count = this.count();
    const threshold = config.cache.maxSize + Math.floor(config.cache.maxSize * 0.1);

    if (count > threshold) {
      this.prune();
    }
  },

  // Prune old entries based on TTL and max size
  prune() {
    const ttlMs = config.cache.ttlHours * 60 * 60 * 1000;
    const expiredTime = Date.now() - ttlMs;

    // Delete expired entries
    const deleteExpired = db.prepare('DELETE FROM apod_cache WHERE created_at < ?');
    deleteExpired.run(expiredTime);

    // If still over max size, delete oldest entries
    const count = this.count();
    if (count > config.cache.maxSize) {
      const toDelete = count - config.cache.maxSize;
      const deleteOldest = db.prepare(`
        DELETE FROM apod_cache
        WHERE date IN (
          SELECT date FROM apod_cache
          ORDER BY created_at ASC
          LIMIT ?
        )
      `);
      deleteOldest.run(toDelete);
    }
  },

  // Check if entry is fresh (within TTL)
  isFresh(entry) {
    if (!entry) return false;
    const ttlMs = config.cache.ttlHours * 60 * 60 * 1000;
    return (Date.now() - entry.created_at) < ttlMs;
  },
};

export default apodRepository;
