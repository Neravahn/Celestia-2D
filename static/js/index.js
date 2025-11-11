const canvas = document.getElementById('starfield-main');
const ctx = canvas.getContext('2d');


let stars = [];
let numStars = 200;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


window.addEventListener('resize', resizeCanvas);
resizeCanvas();


//NOW CREATING STARS ( RANDOM )
function initStars_index() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.04 + 0.07,
            twinkleSpeed: Math.random() * 0.01 + 0.004
        });
    }
}
initStars_index();


//NOW ANIMATOIN OF STAR FEILDS
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        s = stars[i]
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();

        //ADDING TWINKLE EFFECT
        s.alpha += s.twinkleSpeed;
        if (s.alpha >= 1 || s.alpha <= 0.2) {
            s.twinkleSpeed *= -1
        }
        //ADDING DRIFTING EFFECT
        s.y += s.speed;
        if (s.y > canvas.height) {
            s.y = 0;
        }
    }

    requestAnimationFrame(animateStars);
}
animateStars();

//REDIRECTING BUTTON
document.getElementById('enter-btn').addEventListener('click', () => {
    window.location.href = '/main';
});

