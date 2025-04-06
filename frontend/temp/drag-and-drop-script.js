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

landing.addEventListener('dragover', () => {
    landing.classList.add('drag-over');
});