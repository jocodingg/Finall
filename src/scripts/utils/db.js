import { openDB } from 'idb';

const DB_NAME = 'story-db';
const DB_VERSION = 1;
const STORE_NAME = 'saved-stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const db = {
  async save(story) {
    const db = await dbPromise;
    await db.put(STORE_NAME, story);
  },
  async delete(id) {
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
  },
  async get(id) {
    const db = await dbPromise;
    return db.get(STORE_NAME, id);
  },
  async getAll() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },
};

export default db;
