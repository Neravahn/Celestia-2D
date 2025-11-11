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

    for (let i = 0; i < objects.length; i++) {
        if ( toRemove.has(i)) {
            continue;
        }
        let obj = objects[i];
        let totalforcex = 0;
        let totalforcey = 0;
        let mergedthis = false;

        for (let j = 0; j < objects.length; j++) {
            if (i === j || toRemove.has(j)) {
                continue;
            }

            const other = objects[j];

            const { forcex, forcey } = calGravity(obj, other);
            totalforcex += forcex;
            totalforcey += forcey;

            //HIERARCHY AND MERSEGE LOGIC
            const distancex = other.x - obj.x;
            const distancey = other.y - obj.y;
            const distance = Math.sqrt(distancex * distancex + distancey * distancey);
            //ANY ELEMENT IF CLOSER THAN THIS WILL MERGE ACCORDING TO THE HIERARCHY
            const critical_distance = 1 * (obj.radius + other.radius);


            //SETTING MAIN HIERARCHY LOGIC
            if (distance < critical_distance) {
                const total_mass = obj.mass + other.mass;
                const new_x = (obj.x * obj.mass + other.x * other.mass) / total_mass //WEIGHTED AVERAGE OF POSITION OF BOTH THE ELEEMENTS
                const new_y = (obj.y * obj.mass + other.y * other.mass) / total_mass // SAME ON Y AXIS
                const new_vel_x = (obj.velocityx * obj.mass + other.velocityx * other.mass) / total_mass //WEIGHTER VELOCITY AVERSGE ON X AXIS
                const new_vel_y = (obj.velocityy * obj.mass + other.velocityy * other.mass) / total_mass; //SAME ON Y AXUS


                const new_radius = Math.cbrt(total_mass);

                const new_color = 'red';

                const merged = new Element(
                    new_x,
                    new_y,
                    new_vel_x,
                    new_vel_y,
                    total_mass,
                    new_radius,
                    new_color,
                    'merged'
                )

                ///BOTH OLD ONES MARKED FOR REMOVAL
                toRemove.add(i);
                toRemove.add(j);

                newObjects.push(merged);
                mergedthis = true;
                break;

            }
        }
        if (mergedthis) {
            continue;
        }
        //UPDATING VELOCIT
        obj.velocityx += (totalforcex / obj.mass) * timesteps;
        obj.velocityy += (totalforcey / obj.mass) * timesteps;
    }
    const remaining = objects.filter((_, idx) => !toRemove.has(idx));

    //UPDATE POSITION
    objects.length = 0;
    objects.push(...remaining, ...newObjects);

    // Update positions in place
    for (let obj of objects) {
        obj.x += obj.velocityx * timesteps;
        obj.y += obj.velocityy * timesteps;
    }
}    