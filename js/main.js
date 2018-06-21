"use strict";
function dragNdrop(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.querySelector('#preview');
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
    preview.scrollIntoView();
}
function drag() {
    document.querySelector('.dragBox').style.transform = "scale(1.1)";
}
function drop() {
    document.querySelector('.dragBox').style.transform = "scale(1.0)";
}
