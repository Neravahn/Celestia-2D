import { Element } from './core/Element.js';
import { physicslogic } from './core/physics.js';
import { applyzoom, restorezoom, enable_zoomandpan, offsetx, offsety, zoom } from './core/canvas.js';
import { initStars, drawStars} from './core/stars.js';
import { setupUI } from './core/ui.js';
import { track_mouse, get_objects, tooltip } from './core/elem_hover.js';
import { download_simulation, load_simulation } from './core/celestia_io.js';
import { presets } from './core/presets.js';




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
const presetSelect = document.getElementById('load_presets')

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

    //DRAWS POINTER FOR OFF SCREEN OBJ
    for (let i = 0; i < objects.length; i++){
        const obj = objects[i];
        const { screenx, screeny} = worldtoscreen(obj.x , obj.y);

        if ( isoffscreen ( screenx, screeny)) {
            drawPointer(ctx, obj, canvas);
        }
    }

    requestAnimationFrame(animate);
}
animate();

//FOR OFF SCREEN ELEMENTS
function worldtoscreen(x, y){
    return {
        screenx: x * zoom + offsetx,
        screeny: y * zoom + offsety
    };
}

//CHECKS IF THE OBJECT IS OUTSIDE THE VIEWPORT
function isoffscreen(screenx, screeny){
    return (
    screenx < 0 ||
    screenx> canvas.width ||
    screeny < 0 ||
    screeny > canvas.height
    );
}

//DRAWS POINTER FOR OBJECTS OF SCREEEN
function drawPointer(ctx, obj, canvas){
    const { screenx, screeny} = worldtoscreen(obj.x, obj.y);

    const centerx = canvas.width/2;
    const centery = canvas.height/2;


    const angle = Math.atan2(screeny -centery, screenx - centerx);

    const edgex = centerx + Math.cos(angle) * ( canvas.width / 2 - 30);
    const edgey = centery + Math.sin(angle) * (canvas.height/ 2 - 30);


    ctx.save();
    ctx.translate(edgex, edgey);
    ctx.rotate(angle);

    //TRIANGLE ARROW
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-12, 6);
    ctx.lineTo(-12, -6);
    ctx.closePath();

    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.restore();
}

//PRESETS
presetSelect.addEventListener('change', () => {
    const selected = presetSelect.value;
    console.log('Selected preset:', selected);
    if (presets[selected]){
        console.log('Applying preset...');
        objects.length = 0;
        objects.push(...presets[selected]());
    } else {
        console.warn('Preset not found!');
    }
});