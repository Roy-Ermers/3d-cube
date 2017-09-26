var canvas;
var ctx;
var cube = new Cube(0, 0, 0, 2, 2);

function Onload() {
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");
    document.Resize += Resize;
    Resize();
    Redraw();
}
var x = 0,
    y = 1;

function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Redraw(framerate) {
    var t = new Array();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cube.vertices.length; i++) {
        var v = cube.vertices[i];
        var r = v.rotateX(cube.angle.x).rotateY(cube.angle.y);
        var p = r.project(400, 250, 200, 4);
        t.push(p)
    }
    ctx.beginPath();
    //move to first position and removes the vector from the drawing queue
    ctx.moveTo(t[0].x, t[0].y);
    t.shift();
    (t).forEach(function(element) {
        ctx.lineTo(element.x, element.y);
    }, this);
    ctx.strokeStyle = cube.color.toString();
    ctx.en
    ctx.stroke();
    cube.angle.y += 2;
    cube.angle.x += 0.1;
    requestAnimationFrame(Redraw);
}