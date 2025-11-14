import { Element } from './Element.js';
import { zoom, offsetx, offsety, isDragging } from './canvas.js';


export function setupUI(objects, canvas, velocityxInput, velocityyInput, massInput, radiusInput) {


    canvas.addEventListener('click', (e) => {
        if (isDragging) return;
        const rect = canvas.getBoundingClientRect();
        const mousex = e.clientX - rect.left;
        const mousey = e.clientY - rect.top;

        const x = (mousex - offsetx) / zoom;
        const y = (mousey - offsety) / zoom;

        //CONVERTING USER INPUT INTO FLOAT
        const velocityx = parseFloat(velocityxInput.value) || 0;
        const velocityy = parseFloat(velocityyInput.value) || 0;
        const mass = parseFloat(massInput.value) || 1000;
        const radius = parseFloat(radiusInput.value) || 10;

        let type;

        const density = mass / ((4 / 3) * Math.PI * radius * radius * radius);
        const v_radius = radius * 3;



        if (density >= 0 && density < 5) {
            if (radius >= 50) {
                type = 'giant_planet';
            } else {
                type = 'planet';
            }
        }
        else if (density >= 5 && density < 20) {
            type = 'star';
        }
        else if (density >= 20 && density < 50) {
            type = 'neutron_star';
        }
        else if (density >= 50) {
            type = 'blackhole';
        }

        let new_object = new Element(x, y, velocityx, velocityy, mass, radius, v_radius, type);
        console.log('Mass:', mass, 'Radius:', radius, 'Density:', density, 'Type:', type);


        //AUTO ORBIT LOGIC 
        const auto_orbit = document.getElementById('auto_orbit');
        if (auto_orbit.checked && objects.length > 0) {
            let nearest = null;
            let min_dist = Infinity;


            for (let i = 0; i < objects.length; i++) {
                let obj = objects[i];

                if(obj.type !=='star' && obj.type !== 'blackhole' && obj.type !== 'neutron_star'){
                    continue;
                }
                let distancex = new_object.x - obj.x;
                let distancey = new_object.y - obj.y;
                let distance = Math.sqrt(distancex * distancex + distancey * distancey);
                if (distance < min_dist) {
                    min_dist = distance;
                    nearest = obj;
                }
            }

            if (nearest) {
                const G = 5e-4;
                const distancex = new_object.x - nearest.x;
                const distancey = new_object.y - nearest.y;
                const r = Math.sqrt(distancex * distancex + distancey * distancey);
                const speed = Math.sqrt(G * nearest.mass / r);

                new_object.velocityx = - distancey / r * speed;
                new_object.velocityy = distancex / r * speed;
            } else {
                console.warn('no valid center for auto orbit');
            }
        }
        if (new_object) {
            objects.push(new_object);
        }
    });
}

