export let zoom = 1;
export let offsetx = 0;
export let offsety = 0;
export let isDragging = false;

export function applyzoom(ctx) {
    ctx.setTransform(zoom, 0, 0, zoom, offsetx, offsety)
}

export function restorezoom(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
        const mousex = e.clientX;
        const mousey = e.clientY;
        let zoomfactor;

        if (e.deltaY < 0) {
            zoomfactor = 1 + zoomamount;
        } else {
            zoomfactor = 1 / (1 + zoomamount);
        }
        const worldx = (mousex - offsetx) / zoom;
        const worldy = (mousey - offsety) / zoom;

        zoom *= zoomfactor;

        offsetx = mousex - worldx * zoom;
        offsety = mousey - worldy * zoom;
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

            const dragx = e.clientX - dragstartx;
            const dragy = e.clientY - dragstarty;

            if (Math.sqrt(dragx*dragx + dragy*dragy) > 3){
                isDragging = true;
            }
            offsetx = e.clientX - dragstartx;
            offsety = e.clientY - dragstarty;

        }
    });

    canvas.addEventListener('mouseup', () => {
        dragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });



}