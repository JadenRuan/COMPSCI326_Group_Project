const get_button = document.getElementById("get-button");
const post_button = document.getElementById("post-button");
const delete_button = document.getElementById("delete-button")

const landing_zone = document.getElementById("landing-zone");
const previewing_zone = document.getElementById("previewing-zone")
const displaying_zone = document.getElementById("displaying-zone");
const file_input = document.getElementById("file-input");

let LOCAL_FILES = []; // store files locally before user uploads them
let IN_MEMORY_FILES = [];

function preventDefaultBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
}

landing_zone.addEventListener('dragover', preventDefaultBehavior); 
landing_zone.addEventListener('drop', preventDefaultBehavior);

landing_zone.addEventListener('drop', async (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    let totalFiles = files.length;
    let counter = 0; 

    if (files.length === 0) { return ;}
    else { files_input = files; }

    for (const file of files) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onloadend = async (event) => {
            const data = event.target.result;

            const draggedImageObject = {
                data: data,
                name: file.name,
                type: file.type
            }


            const saved = await alreadySaved(draggedImageObject);

            if (LOCAL_FILES.findIndex(img => img.name === file.name) === -1 && !saved) {
                LOCAL_FILES.push(draggedImageObject);
            }

            counter += 1; // move onto next image

            if (counter === totalFiles) {
                previewLocalFiles();
            }
        }

        
    };
})

async function alreadySaved(fileObject) {
    const data = await fetch("/api/dragged-images", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' 
        },
    });

    let returnValue = true;

    const d = await data.json();
    console.log(d.array);
    if (d.array.findIndex(img => img.name === fileObject.name) === -1) {
        returnValue = false;
    } else {
        returnValue = true;
    }

    console.log(returnValue);
    return returnValue;

}


function previewLocalFiles() {
    previewing_zone.innerHTML = ''; // remove previous

    // const p = document.createElement("p");
    // p.classList.add("zone");
    // previewing_zone.append

    LOCAL_FILES.forEach((fileObject) => {
        const preview = document.createElement("img");
        const blob = new Blob([fileObject.data], {type: fileObject.type});
        const url = URL.createObjectURL(blob);
        preview.src = url;
        preview.onload = () => {
            URL.revokeObjectURL(url);
        }
        previewing_zone.appendChild(preview);
    })
}


function displayFiles() {
    displaying_zone.innerHTML = ''; // remove previous

    IN_MEMORY_FILES.forEach((fileObject) => {
        const buffer = new Uint8Array(fileObject.data).buffer;
        const display = document.createElement("img");
        const blob = new Blob([buffer], {type: fileObject.type});
        const url = URL.createObjectURL(blob);
        display.src = url;
        display.onload = () => {
            URL.revokeObjectURL(url);
        }
        displaying_zone.appendChild(display);
    })
}


get_button.addEventListener("click", async () => {

    const data = await fetch("/api/dragged-images", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' 
        },
    });

    const images = await data.json();

    images.array.forEach(async fileObject => {

        const array = fileObject.data; // unit 8 array 
        const values = Object.values(array);

        const newFileObject = {
            data: values,
            name: fileObject.name,
            type: fileObject.type
        }  


        if (IN_MEMORY_FILES.findIndex(img => img.name === newFileObject.name) === -1) {
            IN_MEMORY_FILES.push(newFileObject);
        }


    });

    displayFiles();
})

post_button.addEventListener("click", async () => {

    LOCAL_FILES.forEach(async fileObject => {

        const array = new Uint8Array(fileObject.data);
    
        const body = {
            data: array,
            name: fileObject.name,
            type: fileObject.type
        };

        await fetch("/api/dragged-images", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    })

    LOCAL_FILES = []; // remove after saving
    previewLocalFiles();
    
    const p = document.createElement("p");
    p.innerText = "Images saved.";
    previewing_zone.appendChild(p);

})

delete_button.addEventListener("click", async () => {
    await fetch("/api/dragged-images", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    IN_MEMORY_FILES = [];
    displayFiles();
    
    const p = document.createElement("p");
    p.innerText = "Images deleted.";
    displaying_zone.appendChild(p);
})

