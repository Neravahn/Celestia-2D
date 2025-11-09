const canvas = document.getElementById('space_canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const objects = []
let canvasclick;
let auto_orbit_enabled = false;

class Element {
    constructor(x, y, velocityx, velocityy, mass, radius, color, type) {
        this.x = x;
        this.y = y;
        this.velocityx = velocityx;
        this.velocityy = velocityy;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        // this.fixed = this.fixed;
        this.type = type;

    }

    draw(ctx) {
        if (this.type === 'blackhole') {
            blackhole(ctx, this.x, this.y, this.radius);
        }

        else if (this.type === 'star') {
            star(ctx, this.x, this.y, this.radius);
        }

        else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //CLEARS CANVAS EVRY FRAM
    physicslogic(objects, 0.5); //UPDATES PHYSICS
    objects.forEach(obj => obj.draw(ctx)); //DRAWA BODY
    requestAnimationFrame(animate); //RECURSIVE CALL
}
animate();

//ADDING GRAVITY FEUNCTION BETWEEN TWO OBJECTS
function calGravity(obj1, obj2) {
    const G = 1e-4;  //SCALED THIS FOR VISUALISATION OTHERWISE WILL BE TOO FAST WILL REDUCE IT FURTHER :P
    const distancex = obj2.x - obj1.x;
    const distancey = obj2.y - obj1.y;
    const distance = Math.sqrt(distancex * distancex + distancey * distancey);

    if (distance === 0)
        return {
            forcex: 0,
            forcey: 0
        };

    const force = (G * obj1.mass * obj2.mass) / (distance * distance); //NEWTONS GRAVITATIONAL FORCE FORMULA

    return {
        forcex: force * distancex / distance,
        forcey: force * distancey / distance
    };
}

function physicslogic(objects, timesteps) {
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let totalforcex = 0;
        let totalforcey = 0

        for (let j = 0; j < objects.length; j++) {

            if (i === j) continue;

            const { forcex, forcey } = calGravity(obj, objects[j]);
            totalforcex += forcex;
            totalforcey += forcey;
        }
        //UPDATING VELOCITY USING ACCELERATION ON X AND Y AXIS
        obj.velocityx += (totalforcex / obj.mass) * timesteps;
        obj.velocityy += (totalforcey / obj.mass) * timesteps;
    }

    //UPDATE POSITION USING VRLOCITY ON X ANG Y AXIS
    objects.forEach(obj => {
        obj.x += obj.velocityx * timesteps;
        obj.y += obj.velocityy * timesteps;
    });

}

//MAKING BLACKHOLE DESGIN
let rotation = 0; //WILL GIVE IT MORE BLACKHOLISH LOOK
function blackhole(ctx, x, y, radius) {
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
function star(ctx, x, y, radius) {
    ctx.save();

    ctx.shadowBlur = radius *1 ;// INTENSITY OF THE GLOW WILL REDUCE IF ITD MORE
    ctx.shadowColor = '#ffd700';


    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();

    ctx.restore();
}

//ADDING AUTO ORBIT IF USER SETS IT TO YE THE ELEMENT WILL ORBIT THE NEAREST STAR
document.getElementById('auto_orbit').addEventListener('change', (e) =>{
    auto_orbit_enabled = e.target.checked;
});


//ADDING ELEMENTS ON CLICK AKA THE MAIN CLICK HANDLER
canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    let new_object = null ;

    if (canvasclick === 'planet') {
        new_object = new Element(x, y, 0, 0, 1000, 10, 'blue', 'element');
    }

    else if (canvasclick === 'star') {
        new_object = new Element(x, y, 0, 0, 100000, 20, 'yellow', 'star');
    }

    else if (canvasclick === 'blackhole') {
        new_object = new Element(x, y, 0, 0, 2000000, 30, 'purple', 'blackhole');
    }

    if (auto_orbit_enabled) {
        let nearest = null;
        let minimum_distance = Infinity;

        for (let obj of objects) {
            if (obj.type === 'star' || obj.type === 'blackhole') {
                const distancex = obj.x - x;
                const distancey = obj.y - y;
                const dist = Math.sqrt( distancex * distancex + distancey * distancey);
                if (dist < minimum_distance) {
                    minimum_distance = dist;
                    nearest = obj;
                }
            }
        }

        //SETTING ORBITAL VELOCITY FOR THE PLANETS'
        if (nearest) {
            const distancex = x - nearest.x;
            const distancey = y - nearest.y;
            const dist = Math.sqrt ( distancex * distancex + distancey * distancey);
            const G = 1e-4; 

            //CACULATING ORBITAL SPEED
            const velocity= Math.sqrt(G * nearest.mass / dist);

            new_object.velocityx =  ( -distancey / dist) * velocity;
            new_object.velocityy = ( distancex / dist) * velocity;
        }
    }

    objects.push(new_object);
})






//HAMBURGER DROPDOWN
const element_selector = document.getElementById('element_selector');
if (element_selector) {
    element_selector.addEventListener('change', () => {
        canvasclick = element_selector.value
    });
}

