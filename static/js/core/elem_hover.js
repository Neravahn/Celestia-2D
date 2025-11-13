export let mousex = 0;
export let mousey = 0;
const tootltipdiv = document.getElementById('tooltip');
import { zoom, offsetx, offsety} from './canvas.js'


//TRACKING MOUSE FUNCTIONS
export function track_mouse(canvas) {
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousex = e.clientX - rect.left;
        mousey = e.clientY - rect.top;
    });
}

//OBJECTS UNDER THE MOUSE
export function get_objects(objects) {
    const world_mousex = (mousex - offsetx) / zoom;
    const world_mousey = (mousey - offsety) / zoom;

    let closest_object = null;
    let min_distance = Infinity;

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        const distancex = obj.x - world_mousex;
        const distancey = obj.y - world_mousey;
        const distance = Math.sqrt(distancex * distancey + distancey * distancey);


        if (distance < obj.radius && distance < min_distance) {
            closest_object = obj;
            min_distance = distance;
        }
    }
    return closest_object;
}

export function tooltip(hovered_obj) {
    if (!hovered_obj) {
        tootltipdiv.style.display = 'none';
        return;
    }

    tootltipdiv.style.display = 'block';

    tootltipdiv.querySelector('#type span').textContent = hovered_obj.type;
    tootltipdiv.querySelector('#radius span').textContent = hovered_obj.radius.toFixed(2);
    tootltipdiv.querySelector('#v_radius').textContent = hovered_obj.v_radius.toFixed(2);
    tootltipdiv.querySelector('#mass span').textContent = hovered_obj.mass.toFixed(2);
    tootltipdiv.querySelector('#velocityx span').textContent = hovered_obj.velocityx.toFixed(3);
    tootltipdiv.querySelector('#velocityy span').textContent = hovered_obj.velocityy.toFixed(3);
}