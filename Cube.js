function Cube(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertices = [
        new Vector3(-1, 1, -1),
        new Vector3(1, 1, -1),
        new Vector3(1, -1, -1),
        new Vector3(-1, -1, -1),
        new Vector3(-1, 1, 1),
        new Vector3(1, 1, 1),
        new Vector3(1, -1, 1),
        new Vector3(-1, -1, 1)
    ];
    this.angle = new Vector3(0, 0, 0);
    this.color = Color.Red;
}

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.toString = function() {
        return "rgb(" + r + "," + g + "," + b + ");";
    }
}
Color.Red = new Color(255, 0, 0);
Color.Green = new Color(0, 255, 0);
Color.Blue = new Color(0, 0, 255);


function Vector3(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotateX = function(angle) {
        var rad, cosa, sina, y, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        y = this.y * cosa - this.z * sina
        z = this.y * sina + this.z * cosa
        return new Vector3(this.x, y, z)
    }

    this.rotateY = function(angle) {
        var rad, cosa, sina, x, z
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        z = this.z * cosa - this.x * sina
        x = this.z * sina + this.x * cosa
        return new Vector3(x, this.y, z)
    }

    this.rotateZ = function(angle) {
        var rad, cosa, sina, x, y
        rad = angle * Math.PI / 180
        cosa = Math.cos(rad)
        sina = Math.sin(rad)
        x = this.x * cosa - this.y * sina
        y = this.x * sina + this.y * cosa
        return new Vector3(x, y, this.z)
    }

    this.project = function(viewWidth, viewHeight, fov, viewDistance) {
        var factor, x, y
        factor = fov / (viewDistance + this.z)
        x = this.x * factor + viewWidth / 2
        y = this.y * factor + viewHeight / 2
        return new Vector3(x, y, this.z)
    }
}