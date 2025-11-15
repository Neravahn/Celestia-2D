let starinchunks = {};
const tile_size = 800; //INCREASEDN TILES IXE SO ITS NOIT LAGGY
const star_tile =1; //MAN ITS SO LAGGY EVEN ON 1 STAR HELL NAH
const buffer = 1;

function seeded_random(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

//GENERATES STARS FOR A SINGLE TILE
function generate_star(tilex, tiley) {
    const star = [];
    for (let i = 0; i < star_tile; i++) {
        const seed = tilex * 10000 + tiley * 100 + i;
        const x = tilex * tile_size + seeded_random(seed) * tile_size;
        const y = tiley * tile_size + seeded_random(seed + 1) * tile_size;
        star.push({
            x, // X CORDINATE OF THE WORLD
            y, //Y CORDINATE OF THE WORLD
            radius: seeded_random(seed + 2) * 0.5 + 0.5,
            alpha: seeded_random(seed + 3) * 0.8 + 0.2,
            speed: seeded_random(seed + 4) * 0.04 + 0.07,
            twinklespeed: seeded_random(seed + 5) * 0.01 + 0.004
        });
    }
    return star;
}

//ADDING BACKGROUND STARS
export function initStars(canvas) {
    starinchunks = {};
}


//DRAWING STARS IN CURRENT VIEWPORT ZOOM AND PAN
export function drawStars(ctx, canvas, offsetx, offsety, zoom) {
    const left = -offsetx / zoom - buffer;
    const top = -offsety / zoom - buffer;
    const right = left + canvas.width / zoom + 2 * buffer;
    const bottom = top + canvas.height / zoom + 2 * buffer;

    //DETERMINES WHICH TILES INTERSECT THER= VIEWPORT
    const left_tile = Math.floor(left / tile_size) - buffer;
    const right_tile = Math.floor(right / tile_size) + buffer;
    const top_tile = Math.floor(top / tile_size) - buffer;
    const bottom_tile = Math.floor(bottom / tile_size) + buffer;

    let visible_stars = [];

    for (let tilex = left_tile; tilex <= right_tile; tilex++) {
        for (let tiley = top_tile; tiley <= bottom_tile; tiley++) {
            const key = `${tilex},${tiley}`;
            if (!starinchunks[key]) {
                starinchunks[key] = generate_star(tilex, tiley);
            }
            visible_stars.push(...starinchunks[key]);
        }
    }

    for (let i = 0; i < visible_stars.length; i++) {
        let star = visible_stars[i];
        if (star.x >= left && star.x <= right && star.y >= top && star.y <= bottom) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();

            star.alpha += star.twinklespeed;
            if (star.alpha >= 1 || star.alpha <= 0.2) {
                star.twinklespeed *= -1;
            }

            star.y += star.speed;
            if (star.y > bottom) {
                star.y = top;
            }
        }
    }
}