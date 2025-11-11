import { Element } from './core/Element.js';
import { physicslogic } from './core/physics.js';
import { applyzoom, restorezoom, enable_zoomandpan, offsetx, offsety, zoom } from './core/canvas.js';
import { initStars, drawStars} from './core/stars.js';
import { setupUI } from './core/ui.js';
import { track_mouse, get_objects, tootltip } from './core/elem_hover.js';


//DOM ELEMENTS FROM THE MAIN.HTML
const velocityxInput = document.getElementById('velocityx');
const velocityyInput = document.getElementById('velocityy');
const massInput = document.getElementById('mass');
const radiusInput = document.getElementById('radius');


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
setupUI(objects, canvas, velocityxInput, velocityyInput, massInput, radiusInput);
track_mouse(canvas);



//ANIMATIONA LOOP
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    physicslogic(objects, 0.5);

    //TRAIL LOOP
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        obj.trail_method();
    }

    applyzoom(ctx, canvas);
    drawStars(ctx, canvas, offsetx, offsety, zoom);




    //DRAW LOOP
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        obj.draw(ctx);
    }
    const hovered_obj = get_objects(objects);
    tootltip(hovered_obj)


    restorezoom(ctx);

    requestAnimationFrame(animate);
}
animate();
