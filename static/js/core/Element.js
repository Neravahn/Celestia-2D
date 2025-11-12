import { star, blackhole, neutron_star, planet, giant_planet } from './render.js';


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


        //TRAIL ONLY FOR PLANETS
        if( type !== 'star' && type !== 'blackhole'){
            this.trail = []; //STORES PAST POSITION IN WHICH THE TRAIL WILL BE DRAWN
            this.max_trail = 500; //DECIDES THE LENGTH OF THE TRAIL WILL KEEP IT 40 POINTS
        }

    }

    draw(ctx) {
       if (this.trail) {
        ctx.beginPath();
        for (let i = 1; i < this.trail.length - 1; i++){
            const point_1 = this.trail[i];
            const point_2 = this.trail[i+1];
            const alpha = i / this.trail.length;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 2;
            ctx.moveTo( point_1.x , point_1.y);
            ctx.lineTo( point_2.x, point_2.y);
            
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
        else if(this.type === 'planet') {
            planet(ctx, this.x, this.y, this.v_radius);
        }
        else if (this.type === 'neutron_star') {
            neutron_star(ctx, this.x, this.y, this.v_radius);
        }
        else if (this.type === 'giant_planet') {
            giant_planet(ctx, this.x, this.y, this.v_radius);
        }
    }

    trail_method() {
        if(this.trail) {
            this.trail.push({x: this.x, y: this.y});
            if (this.trail.length > this.max_trail) this.trail.shift();
        }
    }
}