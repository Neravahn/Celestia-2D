import { Element } from './Element.js'


export function download_simulation(objects) {
    const data = []
    for (let i = 0; i< objects.length; i++) {
        const obj = objects[i];
        data.push ({
            type: obj.type,
            mass: obj.mass,
            radius: obj.radius,
            x: obj.x,
            y: obj.y,
            velocityx: obj.velocityx,
            velocityy: obj.velocityy,
            v_radius: obj.v_radius,
        });
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'celestia_sims.json';
    a.click();

    URL.revokeObjectURL(url);
}

export function load_simulation(event, objects) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if(!Array.isArray(data)) {
                throw new Error('Invalid simulation file format');
            }

            objects.length = 0;

            for ( let i = 0; i < data.length; i++) {
                const obj_data = data[i];
                const new_obj = new Element(
                    obj_data.x,
                    obj_data.y,
                    obj_data.velocityx,
                    obj_data.velocityy,
                    obj_data.mass,
                    obj_data.radius,
                    obj_data.v_radius,
                    obj_data.type,
                );

                new_obj.trail = obj_data.trail || [];
                new_obj.rotation = obj_data.rotation || 0;
                new_obj.id = obj_data.id || (Math.random() + Date.now()).toString(36);

                objects.push(new_obj);
            }

            console.log('Simulation loaded')
        } catch (err) {
            alert('failed to load simulation');
            console.error(err);
        }
    };

    reader.readAsText(file);
}
