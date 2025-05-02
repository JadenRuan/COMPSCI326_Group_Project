// db.js
let db;

export async function initDB() {
  return new Promise((resolve, reject) => {
    // open existing DB version or create if missing
    const request = indexedDB.open("RegistrationDB");
    request.onerror = (e) => reject(e.target.error);
    request.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains("users")) {
        d.createObjectStore("users", { keyPath: "email" });
      }
      if (!d.objectStoreNames.contains("vendors")) {
        d.createObjectStore("vendors", { keyPath: "id", autoIncrement: true });
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
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.add(data);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}
