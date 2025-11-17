import { Element } from './Element.js';

const G = 5e-4;

function orbitalVelocity(m, r) {
    return Math.sqrt(G * m / r);
}

function binaryVelocity(m, r){
    return Math.sqrt (G * m / (4 * r));
}

export const presets = {
    binaryStars: function() {
        const mass_star1 = 60000;
        const mass_star2 = 60000;

        const r = 120;

        const v = binaryVelocity(mass_star1, r);
        
        const planet_mass = 30;
        const planet_dist = 2000;

        const m_total = mass_star1 + mass_star2; //BARYCENTER MASS OF THE STARS
        

        const planetV = orbitalVelocity(m_total, planet_dist);

        return [

            //STAR 1
            new Element(
                -r, 0, 0,
                v, mass_star1, 10, 30, "star"
            ),

            //STAR2
            new Element (
                r, 0, 0, 
                -v, mass_star2, 10, 30, "star"
            ),

            // SINGLE PLANET ORBITING THE BARYCENTER
            new Element (
                0, planet_dist, planetV, 0,
                planet_mass, 6, 12, "planet"
            )
        ];
    },

    //ACCRETION DISK
     accretionDisk: function () {
        const objects = [];


        const bh_mass = 200000;
        const bh_radius = 20;


        objects.push (
            new Element (
                0, 0,
                0, 0,
                bh_mass,
                bh_radius, bh_radius * 3,
                "blackhole"
            )
        );

        const num_particles = 800;
        const inner_r = 200;
        const outer_r = 400;

        for (let i = 0; i < num_particles; i++) {
            const r = inner_r + Math.random() * ( outer_r - inner_r);
            const angle = Math.random() * Math.PI * 2;


            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;


            const speed = Math.sqrt(G * bh_mass / r)

            const velocityx = -Math.sin(angle) * speed;
            const velocityy =  Math.cos(angle) * speed;


            objects.push (
                new Element (
                    x, y, velocityx, velocityy, 1e-6 , 2, 3, "dust"
                )

            );

        }

        return objects;

    }
}