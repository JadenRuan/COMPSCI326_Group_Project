const get_button = document.getElementById("get-button");
const post_button = document.getElementById("post-button");

const landing_zone = document.getElementById("landing-zone");
const previewing_zone = document.getElementById("previewing-zone")
const file_input = document.getElementById("file-input");

const LOCAL_FILES = []; // store files locally before user uploads them

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
        
            LOCAL_FILES.push(draggedImageObject);
            counter += 1;

            // console.log(counter, LOCAL_FILES.length);
            if (counter === totalFiles) {
                console.log("same");
                previewLocalFiles();
            }
        }

        
    };
})

function previewLocalFiles() {
    previewing_zone.innerHTML = ''; // remove previous

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

    const bodyData = { data: "example data"}; // replace with image data 

    const data = await fetch("/api/dragged-images", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(bodyData)
    });
})
