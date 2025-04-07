const landing = document.getElementById("landing");
const file_input = document.getElementById("file-input");

function preventDefaultBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
}


landing.addEventListener('dragover', preventDefaultBehavior);

// landing.addEventListener('drop', handleDrop);

// function colorWhenDragover() {
//     landing.classList.add("drag-over");
// }

// landing.addEventListener('',colorWhenDragover);

const inLandingZone = () => {landing.classList.add('in-landing-zone')};
const notInLandingZone = () => {landing.classList.remove('in-landing-zone')};

const changeTextDuringHover = () => {
    document.getElementById('landing-message').innerHTML = "Please ensure you are dragging a file!"
}

const changeTextAfterHover = () => {
    document.getElementById('landing-message').innerHTML = "Drag your files here!"
}


landing.addEventListener('mouseover', changeTextDuringHover);
landing.addEventListener('mouseleave', changeTextAfterHover);

landing.addEventListener('dragover', inLandingZone);
landing.addEventListener('dragleave', notInLandingZone);