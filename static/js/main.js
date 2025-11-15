import { Element } from './core/Element.js';
import { physicslogic } from './core/physics.js';
import { applyzoom, restorezoom, enable_zoomandpan, offsetx, offsety, zoom } from './core/canvas.js';
import { initStars, drawStars} from './core/stars.js';
import { setupUI } from './core/ui.js';
import { track_mouse, get_objects, tooltip } from './core/elem_hover.js';
import { download_simulation, load_simulation } from './core/celestia_io.js';




//DOM ELEMENTS FROM THE MAIN.HTML
const velocityxInput = document.getElementById('velocityx');
const velocityyInput = document.getElementById('velocityy');
const massInput = document.getElementById('mass');
const radiusInput = document.getElementById('radius');
const save = document.getElementById('save')
const loadfile = document.getElementById('loadfile')
const time_slider = document.getElementById('timesteps')
let timesteps = parseFloat(time_slider.value) || 1;
const timestepsSpan = document.getElementById('timesteps_value');

//SETTTING UP THE CANVAS
const canvas = document.getElementById('space_canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//EVENT LISTENEERS
save.addEventListener('click', function() {
    download_simulation(objects);
});
loadfile.addEventListener('change', function (event) {
    load_simulation(event, objects)
});
time_slider.addEventListener('input', () => {
    timesteps = parseFloat(time_slider.value);
    timestepsSpan.textContent = timesteps + 'x';
});


//GLOBALS
const objects = [];


//INITIALIZING EVERYTHING
enable_zoomandpan(canvas);
initStars(canvas);
setupUI(objects, canvas, velocityxInput, velocityyInput, massInput, radiusInput);
track_mouse(canvas);



//ANIMATIONA LOOP
function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    physicslogic(objects, timesteps);

    //TRAIL LOO
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        obj.trail_method(objects, time);
    }

    applyzoom(ctx, canvas);
    drawStars(ctx, canvas, offsetx, offsety, zoom);




    //DRAW LOOP
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        obj.draw(ctx);
    }
    const hovered_obj = get_objects(objects);
    tooltip(hovered_obj)


    restorezoom(ctx);

    requestAnimationFrame(animate);
}
animate();


