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
                    db.createObjectStore("images", {keyPath: 'img_id'});
                }
            };

            request.onsuccess = (event) => { resolve(event.target.result); };
            request.onerror = (event) => { reject(event.target.error); }

        })
    }

    async addImage(image) {
        const idb = await this.openImageDatabase();
        const t = idb.transaction("images", "readwrite");
        const store = t.objectStore("images");
        const request = store.add(image);

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            request.onerror = () => {
                reject("failed to add image.")
            }
        })
    }

    async readImage() {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => { resolve(r.result); } 
            r.onerror = () => { reject(r.error); }
            r
        })
    }

    async uploadImage(image) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
        
            r.onload = async () => {
                const d = r.result;

                const imageToUpload = {
                    img_id: image.name,
                    size: image.size,
                    type: image.type,
                    data: d,
                }

                const k = await this.addImage(imageToUpload);
                resolve(k);
            }

            r.onerror = () => { reject(r.error); }

            r.readAsArrayBuffer(image);
        }) 
    }

}