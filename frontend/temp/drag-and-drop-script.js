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

landing.addEventListener('dragover', inLandingZone);
landing.addEventListener('dragleave', notInLandingZone);