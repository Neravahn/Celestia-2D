//MAKING BLACKHOLE DESGIN
let rotation = 0; //WILL GIVE IT MORE BLACKHOLISH LOOK
export function blackhole(ctx, x, y, radius) {
    rotation += 0.03; //ROTATION SPEEED

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.translate(-x, -y);


    const gradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(0.7, 'magenta');
    gradient.addColorStop(1, 'transparent');


    //GRADIANT
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.1, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    //BLACKHOLE
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

}


//MAKING STAR DESGIN
export function star(ctx, x, y, radius) {
    ctx.save();

    ctx.shadowBlur = radius * 1;// INTENSITY OF THE GLOW.. WILL REDUCE IF ITD MORE
    ctx.shadowColor = '#ffd700';


    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();

    ctx.restore();
}
