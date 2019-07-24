export const getContext = (id: string): any => {
    const canvas: any = document.getElementById(id);
    return canvas ? canvas.getContext('2d') : null;
}

export const drawAxes = (ctx: any, height: number, width: number) => {
    // draw X
    ctx.fillRect(0, height - 10, width, 1);
    // draw Y
    ctx.fillRect(0, 0, 1, height - 10)
}

export const drawGraph = (idCanvas: string, height: number, width: number) => {
    const ctx: any = getContext(idCanvas);
    if (ctx) {
        ctx.clearRect(0, 0, height, width);
        drawAxes(ctx, height, width);
    }
}
