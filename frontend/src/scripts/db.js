let db;

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("RegistrationDB", 1);

    request.onerror = (e) => reject(e.target.error);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      // Create "users" store with email as key
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }

      // Create "vendors" store with auto-incremented ID
      if (!db.objectStoreNames.contains("vendors")) {
        db.createObjectStore("vendors", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
  });
}

export function addRecord(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([storeName], "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}

export function getDB() {
  return db;
}
