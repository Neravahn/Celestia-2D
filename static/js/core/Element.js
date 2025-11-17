import { star, blackhole, neutron_star, planet, giant_planet, dust } from './render.js';


export class Element {
    constructor(x, y, velocityx, velocityy, mass, radius, v_radius, type) { //ADDED VISUAL RADIUS SO THE LEMENTS CAN BE VISUAL WHILE MAINTAINING THE RAL PHYYSICS
        this.x = x;
        this.y = y;
        this.velocityx = velocityx;
        this.velocityy = velocityy;
        this.mass = mass;
        this.radius = radius;
        this.v_radius = v_radius;
        this.type = type;
        this.lastTrailTime = 0;


        //TRAIL ONLY FOR PLANETS
        if (type !== 'star' && type !== 'blackhole') {
            this.trail = []; //STORES PAST POSITION IN WHICH THE TRAIL WILL BE DRAWN
            this.max_trail = 500; //DECIDES THE LENGTH OF THE TRAIL WILL KEEP IT 40 POINTS
        }

    }

    draw(ctx) {


        if( this.trail){
            ctx.beginPath();
            for( let i = 1; i < this.trail.length; i++) {
                const p1 = this.trail[i -1];
                const p2 = this.trail[i];
                const alpha = i / this.trail.length;
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = 12;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
        }

        //DRAW ELEMENTS
        if (this.type === 'blackhole') {
            blackhole(ctx, this.x, this.y, this.v_radius);
        }

        else if (this.type === 'star') {
            star(ctx, this.x, this.y, this.v_radius);
        }
        else if (this.type === 'planet') {
            planet(ctx, this.x, this.y, this.v_radius);
        }
        else if (this.type === 'neutron_star') {
            neutron_star(ctx, this.x, this.y, this.v_radius);
        }
        else if(this.type === 'dust'){
            dust(ctx, this.x, this.y, this.v_radius);
        }
        else if (this.type === 'giant_planet') {
            giant_planet(ctx, this.x, this.y, this.v_radius);
        }
    }

    istable_orbit(objects) {
        let center = null;
        let min_dist = Infinity;

        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];

            if (obj.type === 'star' || obj.type === 'blackhole' || obj.type === 'neutron_star' || obj.type === 'dust') {
                const distancex = this.x - obj.x;
                const distancey = this.y - obj.y;
                const dist = Math.sqrt(distancex * distancex + distancey * distancey);

                if (dist < min_dist) {
                    min_dist = dist;
                    center = obj;
                }
            }
        }

        if (!center) {
            return false;
        }

        //CIRCULAR ORBITAL SPEED
        const G = 5e-4;
        const v_expected = Math.sqrt((G * center.mass) / min_dist);

        //ACTUAL VLEOCITY
        const v_actual = Math.sqrt(this.velocityx ** 2 + this.velocityy ** 2);


        //APPLYING ONLY 10% TOLERACE
        return Math.abs(v_actual - v_expected) / v_expected < 0.10;
    }

    updatetrailLength(dist) {
        const base = 200;
        const scale = dist * 0.5;
        this.max_trail= Math.floor(base + scale, 5000);
    }

    trail_method(objects, currentTime) {
        if (!this.trail) {
            return;
        }

    
        const trail_time = 1;
        if (currentTime - this.lastTrailTime < trail_time){
            return;
        }

        this.lastTrailTime = currentTime;

        let min_dist  = Infinity;

        for (let i = 0; i < objects.length; i++){
            const obj= objects[i];

            if ( obj.type === 'star' || obj.type === 'blackhole' || obj.type === 'neutron_star' || obj.type === 'dust'){
                const distancex = this.x - obj.x;
                const distancey = this.y - obj.y;
                const dist = Math.sqrt(distancex * distancex + distancey * distancey);
                if (dist< min_dist) {
                    min_dist = dist;
                }
            }
        }

        this.updatetrailLength(min_dist);


        //ONLY DRAW TAIL WHEN ORBIT IS STABLE
        if ( this.istable_orbit(objects)){
            this.trail.push({x: this.x, y: this.y});
            if ( this.trail.length > this.max_trail) {
                this.trail.shift();
            }
        }
    }
}