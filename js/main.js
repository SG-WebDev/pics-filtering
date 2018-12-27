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
function convertImageToCanvas() {
    var image = $('#preview img');
    var canvas = $('#canvas');
    var canvasWidth = (image.width());
    var canvasHeight = (image.height());
    canvas.attr({width:canvasWidth*2,height:canvasHeight*2}).css({width:'100%',height:'auto'});
    var ctx = canvas[0].getContext("2d");
    ctx.drawImage(image[0], 0, 0);
    return canvas;
}
$('#download').click(function () {
    var canvasElement = document.getElementById('canvas');
    downloadCanvas(canvasElement, 'pic-filtering.png');
});
function downloadCanvas(canvas, filename) {
    var link = document.createElement('a'), e;
    link.download = filename;
    link.href = canvas.toDataURL("image/png;base64");
    if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        link.dispatchEvent(e);
    } else if (link.fireEvent) {
        link.fireEvent("click");
    }
}
$('.btn-container button').on('click', function () {
    $('#download').removeClass('disabled');
    $('#preview img').removeClass();
    $('#canvas').removeClass();
    var filterClass = $(this).text();
    $('#preview img').addClass(filterClass);
    $('#canvas').addClass(filterClass);
    convertImageToCanvas();
});
