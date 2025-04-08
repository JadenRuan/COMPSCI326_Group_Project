export class ImageDatabase {
    constructor(dbName) {
        this.dbName = dbName;
    }

    async openImageDatabase() {
        return new Promise((resolve, reject) => {
            if (this.dbName === "") {
                reject("Database name cannot be empty.");
                return;
            }

            let request = indexedDB.open(this.dbName); 
            request.onupgradeneeded = (event) => {
                let db = event.target.result;
                if (!db.objectStoreNames.contains("images")) {
                    db.createObjectStore("images", {keyPath: img_id});
                }
            };

            request.onsuccess = (event) => { resolve(event.target.result)};
            request.onerror = (event) => { reject(event.target.error); }
            
        })
    }




}