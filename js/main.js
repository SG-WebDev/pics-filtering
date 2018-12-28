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
    var ratio = canvasWidth / canvasHeight;
    canvas.attr({width:canvasWidth*ratio,height:canvasHeight*ratio}).css({width: canvasWidth ,height:canvasHeight});
    var ctx = canvas[0].getContext("2d");
    ctx.filter = getComputedStyle(image[0]).getPropertyValue('filter');
    var calcWidth = canvas.attr('width');
    var calcHeight = canvas.attr('height');
    console.log(calcHeight);
    console.log(calcWidth);
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
    if($('#preview img').length !=0) {
        $('#download').removeClass('disabled');
    }
    $('#preview img').removeClass();
    var filterClass = $(this).text();
    $('#preview img').addClass(filterClass);
    convertImageToCanvas();
});
