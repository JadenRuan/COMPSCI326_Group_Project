let db;

export async function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("RegistrationDB");
    req.onerror = e => reject(e.target.error);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains("users"))
        d.createObjectStore("users", { keyPath: "email" });
      if (!d.objectStoreNames.contains("vendors"))
        d.createObjectStore("vendors", { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
  });
}

export function addRecord(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).add(data)
      .onsuccess = () => resolve();
    tx.onerror = e => reject(e.target.error);
  });
}
