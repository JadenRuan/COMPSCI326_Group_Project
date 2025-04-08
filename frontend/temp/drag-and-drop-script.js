const landing = document.getElementById("landing");
const file_input = document.getElementById("file-input");
console.log(file_input);

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

const fileDrop = (event) => {
    event.preventDefault(); 

    const files = event.dataTransfer.files;

    if (files.length !== 0) {
        file_input.files = files;
    }

     
    
    let counter = 0;
    while (counter < file_input.files.length) {
        const f = file_input.files[counter];
        const fr = new FileReader();
        fr.readAsDataURL(f);
        fr.onloadend = (event) => {
            const prev_img = document.createElement('img');
            if (isValidFileType(f)) {
                prev_img.src = event.target.result;
            }

            const previewing = document.getElementById('previewing');
            previewing.classList.add('has-image');
            previewing.innerHTML = '';
            previewing.appendChild(prev_img); 
        }
        counter += 1;
    }   
}

const isValidFileType = (file) => { return true; }




// add event listeners
landing.addEventListener('dragover', inLandingZone);
landing.addEventListener('dragleave',notInLandingZone);

landing.addEventListener('mouseover', changeTextDuringHover);
landing.addEventListener('mouseleave', changeTextAfterHover);
landing.addEventListener('drop',notInLandingZone); 

landing.addEventListener('drop',alreadyDraggedFile);
landing.addEventListener('drop',fileDrop);
