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
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        let totalforcex = 0;
        let totalforcey = 0

        for (let j = 0; j < objects.length; j++) {

            if (i === j) {
                continue;
            }
            const { forcex, forcey } = calGravity(obj, objects[j]);
            totalforcex += forcex;
            totalforcey += forcey;
        }
        //UPDATING VELOCITY USING ACCELERATION ON X AND Y AXIS
        obj.velocityx += (totalforcex / obj.mass) * timesteps;
        obj.velocityy += (totalforcey / obj.mass) * timesteps;
    }

    //UPDATE POSITION USING VRLOCITY ON X ANG Y AXIS
    objects.forEach(obj => {
        obj.x += obj.velocityx * timesteps;
        obj.y += obj.velocityy * timesteps;
    });

}