function radians(degrees) {
    var TAU = 2 * Math.PI;
    return degrees * TAU / 360;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.translate(135,135);

async function draw() {
    for (let k=0; k<1000;k++){
    ctx.clearRect(-100, -100, 400, 400);
    if (angle_deg < 90-5){
        angle_deg = angle_deg +5;
    } else {
        angle_deg = 0;
    }

    for (let i=0; i<8;i++){
        rotated_3d_points[i][0] = orig_points[i][0]* Math.cos(radians(angle_deg))-orig_points[i][2]*Math.sin(radians(angle_deg));
        rotated_3d_points[i][1] = orig_points[i][1];
        rotated_3d_points[i][2] = orig_points[i][0]* Math.sin(radians(angle_deg))+orig_points[i][2]*Math.cos(radians(angle_deg))+z_offset;

        points[i][0] = Math.round(64+rotated_3d_points[i][0]/rotated_3d_points[i][2] * cube_size);
        points[i][1] = Math.round(32+rotated_3d_points[i][1]/rotated_3d_points[i][2] * cube_size);

    }

drawLine(ctx, points[0],points[1],'green',1);
drawLine(ctx, points[1],points[2],'green',1);
drawLine(ctx, points[2],points[3],'green',1);
drawLine(ctx, points[3],points[0],'green',1);

drawLine(ctx, points[4],points[5],'green',1);
drawLine(ctx, points[5],points[6],'green',1);
drawLine(ctx, points[6],points[7],'green',1);
drawLine(ctx, points[7],points[4],'green',1);

drawLine(ctx, points[0],points[4],'green',1);
drawLine(ctx, points[5],points[1],'green',1);
drawLine(ctx, points[7],points[3],'green',1);
drawLine(ctx, points[6],points[2],'green',1);
await sleep(100); 
}
}


let points = [
    [64-28,32-28],
    [64+28,32-28],
    [64+28,32+28],
    [64-28,32+28],

    [64-16,32-16],
    [64+16,32-16],
    [64+16,32+16],
    [64-16,32+16]];


let orig_points = [
    [-1,-1,1],
    [1,-1,1],
    [1,1,1],
    [-1,1,1],
    [-1,-1,-1],
    [1,-1,-1],
    [1,1,-1],
    [-1,1,-1]
];

let rotated_3d_points=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let angle_deg = 30.0;
let z_offset = -3.0;
let cube_size = 100.0;


draw();
