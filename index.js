

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;


var points = [];
var ends = [];

let lightAngle = 45;


function setup() {
    createCanvas(width, height);
    background(30);
    // angleMode(DEGREES);
    noiseDetail(1)


    let density = 80;
    let gap = width / density

    for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
            var point = createVector(x, y);
            var end = createVector(x, y)
            points.push(point);
            ends.push(end);
        }
    }

}



function draw() {
    stroke(255);
    background(30);

    let noiseLevel = 255;
    let length = 20;
    let mult = 0.005;



    for (let i = 0; i < points.length; i++) {
        var p = points[i];
        var end = ends[i];

        let driftMult = random(0.0001, 0.001);



        var angle = map(noise(end.x * mult, end.y * mult, frameCount * 0.015), 0, 1, 0, 2 * Math.PI);

        length = map(angle, 0, Math.PI, 0, 60);
        end.x = p.x + cos(angle) * length;
        end.y = p.y + sin(angle) * length;

        let r = map(angle, 0, Math.PI / 2, 0, 255);
        let g = map(angle, 0, Math.PI, 0, 255);
        let b = map(angle, 0, Math.PI, 0, 255);
        let a = map(noise(end.x * 0.02, end.y * 0.01), 0, 1, 0, 400)

        let lightness = cos(lightAngle - angle) * 255;

        stroke(r, g + lightness, b + lightness, a);

        p.x += cos(p.x * Math.PI) * driftMult;
        p.y += sin(p.y * Math.PI) * driftMult;
        line(p.x, p.y, end.x, end.y)
        //ellipse(end.x, end.y, 2);



    }

}


