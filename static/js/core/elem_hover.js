export let mousex = 0;
export let mousey = 0;
const tootltipdiv = document.getElementById('tooltip');


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
    let closest_object = null;
    let min_distance = Infinity;


    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        const distancex = obj.x - mousex;
        const distancey = obj.y - mousey;
        const distance = Math.sqrt(distancex * distancex + distancey * distancey);

        //IF THE CURSOR IS WITHIN THE RADIUS
        if (distance < obj.radius) {
            closest_object = obj;
            min_distance = distance;
        }
    }


    return closest_object;
}

//NOW WILL DRAW TOOL TIP CONTAINING ALL THE DETAILS
export function tootltip(hovered_obj) {

    tootltipdiv.style.display = 'block';

    if (hovered_obj) {

        tootltipdiv.querySelector('#type span').textContent = hovered_obj.type;
        tootltipdiv.querySelector('#radius span').textContent = hovered_obj.radius;
        tootltipdiv.querySelector('#v_radius span').textContent = hovered_obj.v_radius;
        tootltipdiv.querySelector('#mass span').textContent = hovered_obj.mass;
        tootltipdiv.querySelector('#velocityx span').textContent = hovered_obj.velocityx.toFixed(3);
        tootltipdiv.querySelector('#velocityy span').textContent = hovered_obj.velocityy.toFixed(3);
    } else {
        tootltipdiv.querySelector('#type span').textContent = '-';
        tootltipdiv.querySelector('#radius span').textContent = '-';
        tootltipdiv.querySelector('#v_radius span').textContent = '-';
        tootltipdiv.querySelector('#mass span').textContent = '-';
        tootltipdiv.querySelector('#velocityx span').textContent = '-';
        tootltipdiv.querySelector('#velocityy span').textContent = '-';
    }
}