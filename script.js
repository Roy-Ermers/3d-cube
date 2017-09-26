var canvas;
var ctx;
var cube = new Cube(0, 0, 0, 2, 2);
var autorotate = true;
var MousePosition;

function changeRotation(value, axis) {
    if (axis == 'x') {
        autorotate = false;
        document.getElementById("AutoRot").checked = false;
        cube.angle.x = value;
    } else if (axis == 'y') {
        autorotate = false;
        document.getElementById("AutoRot").checked = false;
        cube.angle.y = value;
    }
}

function Onload() {
    canvas = document.getElementsByTagName("canvas")[0];
    canvas.addEventListener("mousedown", OnMouseDown);
    canvas.addEventListener("mouseup", function() {
        MousePosition = undefined;
    });
    canvas.addEventListener("mousemove", MouseMove);
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    document.Resize += Resize;
    Resize();
    Redraw();
}

function OnMouseDown(event) {
    MousePosition = { x: event.clientX, y: event.clientY };
}

function MouseMove(event) {
    if (MousePosition == undefined) return;
    autorotate = false;
    document.getElementById("AutoRot").checked = false;

    cube.angle.x = (MousePosition.y - event.clientY) * -0.25;
    cube.angle.y = (MousePosition.x - event.clientX) * 0.25;
}

function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cube.x = window.innerWidth / 2;
    cube.y = window.innerHeight / 2;
}

function Redraw(framerate) {
    if (!autorotate && document.getElementById("settings").classList.contains("running")) {
        document.getElementById("settings").classList.remove("running");
    }
    if (autorotate && !document.getElementById("settings").classList.contains("running")) {
        document.getElementById("settings").classList.add("running");
    }
    var t = new Array();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cube.vertices.length; i++) {
        //get current vertice
        var v = cube.vertices[i];
        //apply rotation
        var r = v.rotateX(cube.angle.x).rotateY(cube.angle.y);
        //apply 3d transformations
        var p = r.project(canvas.width, canvas.height, 500, 3);
        //add this vertice to the drawingqueue
        t.push(p)
    }
    //go trough each face in the cube
    for (var i = 0; i < cube.faces.length; i++) {
        var f = cube.faces[i];
        ctx.beginPath();
        ctx.strokeStyle = cube.color.toString();

        ctx.moveTo(t[f[0]].x, t[f[0]].y);
        ctx.lineTo(t[f[1]].x, t[f[1]].y);
        ctx.lineTo(t[f[2]].x, t[f[2]].y);
        ctx.lineTo(t[f[3]].x, t[f[3]].y);
        ctx.closePath();
        ctx.stroke();
    }
    if (autorotate) {
        document.getElementById("RotX").value = cube.angle.x++ % 360;
        document.getElementById("RotY").value = cube.angle.y++ % 360;
    }
    requestAnimationFrame(Redraw);
}