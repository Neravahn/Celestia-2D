//MAKING BLACKHOLE DESGIN
let rotation = 0; //WILL GIVE IT MORE BLACKHOLISH LOOK
export function blackhole(ctx, x, y, radius) {

    ctx.save();
    ctx.translate(x, y);
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

export function star(ctx, x, y, radius) {
    ctx.save();
    for (let i = 3; i > 0; i--) {
        ctx.beginPath();
        ctx.arc(x, y, radius * (1 + i * 0.3), 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 215, 0, ${0.2 / i})`;
        ctx.shadowBlur = radius * i * 2;
        ctx.shadowColor = '#ffd700';
        ctx.fill()
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.restore();
}


export function planet(ctx, x, y, radius){
    const gradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
    gradient.addColorStop(0, '#4da6ff');
    gradient.addColorStop(0.6, '#0059b3');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius*0.9, 0, 2*Math.PI);
    ctx.strokeStyle = `rgba(255,255,255,0.15)`;
    ctx.lineWidth = 1;
    ctx.stroke();
}

export function neutron_star (ctx, x, y, radius) {
    ctx.save();
    for (let i = 3; i>0 ; i--) {
        ctx.beginPath();
        ctx.arc(x, y, radius * (1 + i * 0.25), 0, 2*Math.PI);
        ctx.fillStyle = `rgba(173, 216, 255, ${0.25 / i})`;
        ctx.shadowBlur = radius * i * 3;
        ctx.shadowColor = '#99ccff';
        ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
}

export function giant_planet(ctx,x, y, radius) {
    const gradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
    gradient.addColorStop(0, '#ffcc66');
    gradient.addColorStop(0.6, '#cc9933');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 *Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.3, radius * 0.2, Math.PI / 6, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(x, y, radius * 1.05, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
}