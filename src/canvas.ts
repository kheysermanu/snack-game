export const DIM_SQUARE = 20;
export const DIM_STEP_FORWARD = 20;
export const DIM_ROOT = 400;
export const DELAY = 400;
export enum DIRECTION { LEFT = 'left', UP = 'up', RIGHT = 'right', DOWN = 'down' };
export interface IPane {
    originX: number;
    originY: number;
    height: number;
    width: number;
}
export interface ICanvasState {
    x: number;
    y: number;
    direction: DIRECTION;
}
export interface ICheckPosition {
    currentStep: boolean;
    nextStep: boolean;
}
export const PANE: IPane = { originX: 0, originY: 0, height: DIM_ROOT, width: DIM_ROOT };
export const ORI_STATE: ICanvasState = {
    x: PANE.width / 2 - DIM_SQUARE,
    y: PANE.height / 2 - DIM_SQUARE,
    direction: DIRECTION.RIGHT
};
export const drawSquare = (ctx: any, toX: number, toY: number): void => {
    if (ctx) {
        ctx.clearRect(PANE.originX, PANE.originY, PANE.height, PANE.width);
        ctx.fillStyle = 'green';
        ctx.fillRect(toX, toY, DIM_SQUARE, DIM_SQUARE);
    } else {
        console.log('context canvas introuvable');
    }
};
export const checkNewPosition = (newX: number, newY: number): ICheckPosition => {

    const x = Math.abs(newX);
    const y = Math.abs(newY);
    const currentStep = x < PANE.width - PANE.originX && x >= PANE.originX &&
        y < PANE.height - PANE.originY && y >= PANE.originY;
    const nextStep = x + DIM_SQUARE < PANE.width - PANE.originX && x > PANE.originX &&
        y + DIM_SQUARE < PANE.height - PANE.originY && y > PANE.originY;
    console.log('check new position => x:' + newX + ' y:' + newY + ' => ' +
        currentStep + ' ' + nextStep);
    return { currentStep, nextStep };
};
export const checkChangeDirection = (currentDirection: DIRECTION, newDirection: string, isGameOver: boolean) => {
    let change: boolean;
    switch (newDirection) {
        case DIRECTION.LEFT:
            change = currentDirection !== DIRECTION.RIGHT && currentDirection !== DIRECTION.LEFT;
            break;
        case DIRECTION.UP:
            change = currentDirection !== DIRECTION.DOWN && currentDirection !== DIRECTION.UP;
            break;
        case DIRECTION.RIGHT:
            change = currentDirection !== DIRECTION.LEFT && currentDirection !== DIRECTION.RIGHT;
            break;
        case DIRECTION.DOWN:
            change = currentDirection !== DIRECTION.UP && currentDirection !== DIRECTION.DOWN;
            break;
        default:
            change = true;
    }
    return change && !isGameOver;
}


export const drawSnakeFood = (ctx: any, toX: number, toY: number): void => {
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toX, toY, DIM_SQUARE, DIM_SQUARE);
    } else {
        console.log('context canvas introuvable');
    }
};
