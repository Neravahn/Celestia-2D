import { Element } from './Element.js';
import { zoom, offsetx, offsety, isDragging } from './canvas.js';

export function setupUI(objects, canvas, canvasclick, auto_orbitOn) {
    const selector = document.getElementById('element_selector');
    const auto_orbit = document.getElementById('auto_orbit');

    selector.addEventListener('change', () => {
        canvasclick = selector.value;
    });

    auto_orbit.addEventListener('change', e => {
        auto_orbitOn = e.target.checked;
    });



    canvas.addEventListener('click', (e) => {
        if (isDragging) return;
        const rect = canvas.getBoundingClientRect();
        const mousex = e.clientX - rect.left;
        const mousey = e.clientY - rect.top;

        const x = (mousex - canvas.width / 2 - offsetx) / zoom + canvas.width / 2;
        const y = (mousey - canvas.height / 2 - offsety) / zoom + canvas.height / 2;

        let new_object = null;
        if (canvasclick === 'planet') {
            new_object = new Element(x, y, 0, 0, 1000, 10, 'blue', 'planet');
        }

        else if (canvasclick === 'star') {
            new_object = new Element(x, y, 0, 0, 100000, 20, 'yellow', 'star');
        }

        else if (canvasclick === 'blackhole') {
            new_object = new Element(x, y, 0, 0, 2000000, 30, 'purple', 'blackhole');
        }

        if (auto_orbitOn && canvasclick === 'planet') {
            let nearest = null;
            let minimum_distance = Infinity;

            for (let i = 0; i<objects.length; i++) {
                let obj = objects[i]
                if (obj.type === 'star' || obj.type === 'blackhole') {
                    const distancex = obj.x - x;
                    const distancey = obj.y - y;
                    const dist = Math.sqrt(distancex * distancex + distancey * distancey);
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
                const dist = Math.sqrt(distancex * distancex + distancey * distancey);
                const G = 5e-4;

                //CACULATING ORBITAL SPEED
                const velocity = Math.sqrt(G * nearest.mass / dist);

                new_object.velocityx = (-distancey / dist) * velocity;
                new_object.velocityy = (distancex / dist) * velocity;
            }
        }

        if (new_object){
             objects.push(new_object);
        }
    });
}

