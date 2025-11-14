import { Element } from './Element.js';

//ADDING GRAVITY FEUNCTION BETWEEN TWO OBJECTS
export function calGravity(obj1, obj2) {
    const G = 5e-4;  //SCALED THIS FOR VISUALISATION OTHERWISE WILL BE TOO FAST WILL REDUCE IT FURTHER :P
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

export function physicslogic(objects, timesteps) {
    const toRemove = new Set();
    const newObjects = [];

    // const net_force

    for (let i = 0; i < objects.length; i++) {
        if (toRemove.has(i)) {
            continue;
        }
        let obj = objects[i];
        let totalforcex = 0;
        let totalforcey = 0;
        let mergedthis = false;

        for (let j = i + 1; j < objects.length; j++) {
            if (i === j || toRemove.has(j)) {
                continue;
            }

            const other = objects[j];

            const { forcex, forcey } = calGravity(obj, other);

            //APPLYING NEWTONS THIRD LAW OF EQUAL AND OPPOSITE FORCES
            obj.velocityx += (forcex / obj.mass) * timesteps;
            obj.velocityy += (forcey / obj.mass) * timesteps;
            other.velocityx -= (forcex / other.mass) * timesteps;
            other.velocityy -= (forcey / other.mass) * timesteps;

            //HIERARCHY AND MERSEGE LOGIC
            const distancex = other.x - obj.x;
            const distancey = other.y - obj.y;
            const distance = Math.sqrt(distancex * distancex + distancey * distancey);
            //ANY ELEMENT IF CLOSER THAN THIS WILL MERGE ACCORDING TO THE HIERARCHY
            const critical_distance = 1.5 * (obj.radius + other.radius);


            //SETTING MAIN HIERARCHY LOGIC
            if (distance < critical_distance) {
                const total_mass = obj.mass + other.mass;
                const new_x = (obj.x * obj.mass + other.x * other.mass) / total_mass //WEIGHTED AVERAGE OF POSITION OF BOTH THE ELEEMENTS
                const new_y = (obj.y * obj.mass + other.y * other.mass) / total_mass // SAME ON Y AXIS
                const new_vel_x = (obj.velocityx * obj.mass + other.velocityx * other.mass) / total_mass //WEIGHTER VELOCITY AVERSGE ON X AXIS
                const new_vel_y = (obj.velocityy * obj.mass + other.velocityy * other.mass) / total_mass; //SAME ON Y AXUS


                //WEIGHTED AVERAGE DENSITY
                const density_obj = obj.mass / ((4 / 3) * Math.PI * Math.pow(obj.radius, 3));
                const density_other = other.mass / ((4 / 3) * Math.PI * Math.pow(other.radius, 3));

                const new_density = (density_obj * obj.mass + density_other * other.mass) / total_mass;
                const new_radius = Math.cbrt((3 * total_mass) / (4 * Math.PI * new_density));

                const v_radius = new_radius * 3;
                let type;


                if (new_density >= 0 && new_density < 5) {
                    if (new_radius >= 50) {
                        type = 'giant_planet';
                    } else {
                        type = 'planet';
                    }
                }
                else if (new_density >= 5 && new_density < 20) {
                    type = 'star';
                }
                else if (new_density >= 20 && new_density < 50) {
                    type = 'neutron_star';
                }
                else if (new_density >= 50) {
                    type = 'blackhole';
                }

                let new_object = new Element(new_x, new_y, new_vel_x, new_vel_y, total_mass, new_radius, v_radius, type);
                console.log('Mass:', total_mass, 'Radius:', new_radius, 'Density:', new_density, 'Type:', type);

                ///BOTH OLD ONES MARKED FOR REMOVAL
                toRemove.add(i);
                toRemove.add(j);

                newObjects.push(new_object);
                mergedthis = true;
                break;

            }
        }
    }

    const remaining = objects.filter((_, idx) => !toRemove.has(idx));
    objects.length = 0;
    objects.push(...remaining, ...newObjects);

    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];

        obj.x += obj.velocityx * timesteps;
        obj.y += obj.velocityy * timesteps;
    }
}