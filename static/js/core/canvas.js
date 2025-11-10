export let zoom = 1;
export let offsetx = 0;
export let offsety = 0;
export let isDragging = false;

export function applyzoom(ctx, canvas) {
    ctx.save();
    ctx.translate(canvas.width / 2 + offsetx, canvas.height / 2 + offsety);
    ctx.scale(zoom, zoom);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}
export function restorezoom(ctx) {
    ctx.restore();
}

//ZOOM AND PANN EVENTLISTENER
export function enable_zoomandpan(canvas) {
    let dragging = false;
    let dragstartx = 0;
    let dragstarty = 0;
    //MOUSE WHEEL ZOON
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomamount = 0.1;
        zoom *= e.deltaY < 0 ? 1 + zoomamount : 1 / (1 + zoomamount);
    });
    //MOUSE DRAG FOR PANNING
    canvas.addEventListener('mousedown', (e) => {
        dragging = true;
        dragstartx = e.clientX - offsetx;
        dragstarty = e.clientY - offsety;
        isDragging = false;

    });

    canvas.addEventListener('mousemove', (e) => {
        if (dragging) {
            offsetx = e.clientX - dragstartx;
            offsety = e.clientY - dragstarty;
            isDragging = true;
        }
    });

    canvas.addEventListener('mouseup', () => dragging = false);
    canvas.addEventListener('mouseleave', () => dragging = false);
}