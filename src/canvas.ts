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
export interface IPosition {
    x: number;
    y: number;
}
export interface ISnakeHead extends IPosition { }
export interface ISnake {
    head: ISnakeHead;
    body?: ISnakeHead[];
}
export interface IGameState {
    snake: ISnake;
    direction: DIRECTION;
    play: boolean,
    food: IFoodSnake,
    score: number
}
export interface ICheckPosition {
    currentStep: boolean;
    nextStep: boolean;
}
export interface IFoodSnake extends IPosition {
    x: number;
    y: number;
    eated: boolean;
}
export const PANE: IPane = { originX: 0, originY: 0, height: DIM_ROOT, width: DIM_ROOT };
const getRndInteger = (min: number, max: number): number => {
    let res = -1;
    while (res % DIM_SQUARE !== 0) {
        res = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return res;
};
export const genFoodSnake = (): IFoodSnake => {
    return {
        x: getRndInteger(PANE.originX + DIM_SQUARE, PANE.width - DIM_SQUARE * 2),
        y: getRndInteger(PANE.originY + DIM_SQUARE, PANE.height - DIM_SQUARE * 2),
        eated: false
    };
};
export const ORI_STATE: IGameState = {
    snake: { head: { x: PANE.width / 2 - DIM_SQUARE, y: PANE.height / 2 - DIM_SQUARE } },
    direction: DIRECTION.RIGHT,
    play: true,
    food: genFoodSnake(),
    score: 0
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
export const drawSnake = (ctx: any, snake: ISnake) => {
    drawSquare(ctx, snake.head.x, snake.head.y);
}
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
};
export const drawSnakeFood = (ctx: any, foodObj: IFoodSnake): void => {
    console.log('food at position: (' + foodObj.x + ',' + foodObj.y + ')');
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(foodObj.x, foodObj.y, DIM_SQUARE, DIM_SQUARE);
    } else {
        console.log('context canvas introuvable');
    }
};
export const isFoodEated = (foodObj: IFoodSnake, snake: ISnake) => {
    return foodObj.x === snake.head.x && foodObj.y === snake.head.y;
}
export const drawText = (ctx: any, message: string, color: string) => {
    if (ctx) {
        ctx.font = '48px serif';
        ctx.fillStyle = color;
        ctx.fillText(message, 10, 50);
    }
};
