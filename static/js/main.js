import { Element } from './core/Element.js';
import { physicslogic } from './core/physics.js';
import { applyzoom, restorezoom, enable_zoomandpan } from './core/canvas.js';
import { initStars, drawStars } from './core/stars.js';
import { setupUI } from './core/ui.js';

//SETTTING UP THE CANVAS
const canvas = document.getElementById('space_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//GLOBALS
const objects = [];
const canvasclick = { value: 'planet' };
const auto_orbitOn = { value: false };



//INITIALIZING EVERYTHING
enable_zoomandpan(canvas);
initStars(canvas);
setupUI(objects, canvas, canvasclick, auto_orbitOn);


//ANIMATIONA LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    physicslogic(objects, 0.5);

    //TRAIL LOOP
    for (let i = 0 ; i< objects.length; i ++) {
        let obj = objects[i];
        obj.trail_method();
    }

    drawStars(ctx, canvas);

    applyzoom(ctx, canvas);


    //DRAW LOOP
    for (let i = 0; i< objects.length; i ++) {
        let obj = objects[i];
        obj.draw(ctx);
    }


    restorezoom(ctx);
    
    requestAnimationFrame(animate);
}
animate();
