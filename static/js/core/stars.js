let stars = [];
const numStars = 200;

//ADDING BACKGROUND STARS
export function initStars(canvas) {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.04 + 0.07,
            twinklespeed: Math.random() * 0.01 + 0.004
        });
    }
}

export function drawStars(ctx, canvas) {
    for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();

        //ADDED TWINKLUNG AND DRIFTING EFFECT
        s.alpha += s.twinklespeed;
        if (s.alpha >= 1 || s.alpha <= 0.2) {
            s.twinklespeed *= -1;
        }


        s.y += s.speed;
        if (s.y > canvas.height) {
            s.y = 0;
        }
    }
}