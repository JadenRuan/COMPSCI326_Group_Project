const get_button = document.getElementById("get-button");
const post_button = document.getElementById("post-button");
const delete_button = document.getElementById("delete-button")

const landing_zone = document.getElementById("landing-zone");
const previewing_zone = document.getElementById("previewing-zone")
const file_input = document.getElementById("file-input");

let LOCAL_FILES = []; // store files locally before user uploads them

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

        fileReader.onloadend = (event) => {
            const data = event.target.result;

            const draggedImageObject = {
                data: data,
                name: file.name,
                type: file.type
            }

        
            if (LOCAL_FILES.findIndex(img => img.name === file.name) === -1) {
                
                LOCAL_FILES.push(draggedImageObject);
            }

            counter += 1; // move onto next image

            if (counter === totalFiles) {
                previewLocalFiles();
            }
        }

        
    };
})

function previewLocalFiles() {
    previewing_zone.innerHTML = ''; // remove previous


    console.log(LOCAL_FILES);

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


get_button.addEventListener("click", async () => {

    const data = await fetch("/api/dragged-images", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' 
        },
    });

    const res = await data.json();
    console.log(res.draggedImages);
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
    previewing_zone.innerText = "Preview your images here.";

})

delete_button.addEventListener("click", async () => {
    await fetch("/api/dragged-images", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
})

