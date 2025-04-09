// image database class and methods
class ImageDatabase {
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
            request.onerror = (event) => {
                console.error(event.target.error);
                reject("failed to add image.")
            }
        })
    }

    async uploadImage(image) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
        
            r.onload = async () => {
                const d = r.result;
                // const f = true;
                const imageToUpload = {
                    img_id: image.name,
                    flag: true,
                    size: image.size,
                    type: image.type,
                    data: d,
                }

                const k = await this.addImage(imageToUpload);
                resolve(k);
                return true;
            }

            r.onerror = () => { reject(r.error); }

            
            r.readAsArrayBuffer(image); 
            
        }) 
    }

    async getImages() {
        const idb = await this.openImageDatabase();
        const t = idb.transaction("images", "readwrite");
        const store = t.objectStore("images");
        const all = store.getAll();

        return new Promise((resolve, reject) => {
            all.onsuccess = () => { resolve(all.result); }
            all.onerror = () => { reject("failed to get images"); }
        })
    }

    async clearImages() {
        const idb = await this.openImageDatabase();
        const t = idb.transaction("images", "readwrite");
        const store = t.objectStore("images");
        const del = store.clear();

        return new Promise((resolve, reject) => {
            del.onsuccess = () => { resolve("iamge deleted successfully")}
            del.onerror = () => { reject("failed to delete image") }
        })
    }

    
}






const landing = document.getElementById("landing");
const file_input = document.getElementById("file-input");
const idb = new ImageDatabase("idb");
const previewing = document.getElementById('previewing');

// prevent default behaviors
function preventDefaultBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
}

landing.addEventListener('dragover', preventDefaultBehavior); 
landing.addEventListener('drop', preventDefaultBehavior);

// add classes when user is in landing zone
const inLandingZone = () => {landing.classList.add('in-landing-zone')};
const notInLandingZone = () => {landing.classList.remove('in-landing-zone')};
const alreadyDraggedFile = () => {landing.classList.add('already-dragged-file')};

// change message based on classes 
const changeTextDuringHover = () => { // message during hover
    if (landing.classList.contains('already-dragged-file')) {
        document.getElementById('landing-message').innerHTML = "Drag another file?";
    } else {
        document.getElementById('landing-message').innerHTML = "Please ensure you are dragging a file!"
    }
}

const changeTextAfterHover = () => { // message not during hover
    document.getElementById('landing-message').innerHTML = "Drag your files here!"
}

let flag = true;





const fileDrop =  (event) => {
    let counter = 0;
    event.preventDefault(); 

    const files = event.dataTransfer.files; // get files from event

    if (files.length === 0) {
        return;
    } else {
        file_input.files = files; // store files in box
    }

    previewing.classList.add('has-image');

    if (flag) {
        previewing.innerHTML = '';
        flag = false;
    } 
     

    while (counter < file_input.files.length) {
        const f = file_input.files[counter];
        const fr = new FileReader();

        fr.readAsDataURL(f);

        fr.onloadend = async (event) => {
            const prev_img = document.createElement('img');
            if (isValidFileType(f)) {
                prev_img.src = event.target.result;
            }

            try {
                const k =  await idb.uploadImage(f);
                previewing.appendChild(prev_img);
                console.log("added to idb:", k);
                
            } catch {
                console.log("already in idb")
            }
            
                    
        }
        counter += 1;
    } 

}

// const previewFiles = async () => {
//     const files = await idb.getImages();
//     previewing.innerHTML = '';
//     console.log("number of files:", files.length);
//     files.forEach((f)=> {

//         if (f.size !== -1) {

//             const prev_img = document.createElement('img');
//             const b = new Blob([f.data], {type: f.type});
//             const img_url = URL.createObjectURL(b);
//             prev_img.src = img_url;
//             prev_img.onload = () => {
//                 URL.revokeObjectURL(img_url);
//             }


//             previewing.appendChild(prev_img);
//         }
//     })  
// }

const isValidFileType = (f) => { 
    if (f.type == "image/jpeg" || f.type == "image/png") {
        return true;
    } else {
        return false;
    }
}




// add event listeners
landing.addEventListener('dragover', inLandingZone);
landing.addEventListener('dragleave',notInLandingZone);

landing.addEventListener('mouseover', changeTextDuringHover);
landing.addEventListener('mouseleave', changeTextAfterHover);
landing.addEventListener('drop',notInLandingZone); 

landing.addEventListener('drop',alreadyDraggedFile);
landing.addEventListener('drop',fileDrop);

window.addEventListener('beforeunload', () => {idb.clearImages(); });