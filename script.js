var canvas;
var ctx;

function Onload() {
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");
    document.Resize += Resize();
    Redraw();
}
var x, y = 0;

function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Redraw(framerate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "sans-serif 25px";
    ctx.fillText("hello", x++, y++);
    ctx.fill();

    requestAnimationFrame(Redraw);
}