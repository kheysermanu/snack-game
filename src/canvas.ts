import Game from 'model/game';

export const DIM_SQUARE = 20;
export const DIM_STEP_FORWARD = 20;
export const DIM_ROOT = 400;
export const DELAY = 400;
export const SNAKE_COLOR = 'green';
export const FOOD_COLOR = 'white';
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
export interface ISnakeBody extends IPosition { }
export interface ISnake {
    body: ISnakeBody[];
}
export interface IGameState {
    snake: ISnake;
    direction: DIRECTION;
    play: boolean,
    food: IFoodSnake,
    game: Game
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
export const ORI_STATE = (): IGameState => ({
    snake: { body: [{ x: PANE.width / 2 - DIM_SQUARE, y: PANE.height / 2 - DIM_SQUARE }] },
    direction: DIRECTION.RIGHT,
    play: true,
    food: genFoodSnake(),
    game: new Game()
});
export const clearPanel = (ctx: any) => {
    if (ctx) {
        ctx.clearRect(PANE.originX, PANE.originY, PANE.height, PANE.width);
    }
}
export const drawSquare = (ctx: any, toX: number, toY: number, color: string): void => {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(toX, toY, DIM_SQUARE, DIM_SQUARE);
    } else {
        console.log('context canvas introuvable');
    }
};
export const drawSnake = (ctx: any, snake: ISnake) => {
    if (snake.body) {
        clearPanel(ctx);
        snake.body.forEach(value => {
            drawSquare(ctx, value.x, value.y, SNAKE_COLOR);
        });
    }
}
export const checkNewPosition = (newX: number, newY: number): ICheckPosition => {

    const x = Math.abs(newX);
    const y = Math.abs(newY);
    const currentStep = x < PANE.width - PANE.originX && x >= PANE.originX &&
        y < PANE.height - PANE.originY && y >= PANE.originY;
    const nextStep = x + DIM_SQUARE < PANE.width - PANE.originX && x > PANE.originX &&
        y + DIM_SQUARE < PANE.height - PANE.originY && y > PANE.originY;
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
    drawSquare(ctx, foodObj.x, foodObj.y, FOOD_COLOR);
};
export const isFoodEated = (foodObj: IFoodSnake, snake: ISnake) => {
    return foodObj.x === snake.body[0].x && foodObj.y === snake.body[0].y;
};
export const drawText = (ctx: any, message: string, color: string) => {
    if (ctx) {
        ctx.font = '48px serif';
        ctx.fillStyle = color;
        ctx.fillText(message, 10, 50);
    }
};
export const moveSnake = (snake: ISnake, newX: number, newY: number) => {
    let pos = snake.body.length - 1;
    while (pos - 1 > -1) {
        snake.body[pos].x = snake.body[pos - 1].x;
        snake.body[pos].y = snake.body[pos - 1].y;
        pos = pos - 1;
    }
    snake.body[0] = { x: newX, y: newY };
};
export const addBodyToSnake = (snake: ISnake, direction: DIRECTION) => {
    switch (direction) {
        case DIRECTION.DOWN:
            snake.body.push({
                x: snake.body[snake.body.length - 1].x,
                y: snake.body[snake.body.length - 1].y - DIM_SQUARE
            });
            break;
        case DIRECTION.LEFT:
            snake.body.push({
                x: snake.body[snake.body.length - 1].x + DIM_SQUARE,
                y: snake.body[snake.body.length - 1].y
            });
            break;
        case DIRECTION.RIGHT:
            snake.body.push({
                x: snake.body[snake.body.length - 1].x - DIM_SQUARE,
                y: snake.body[snake.body.length - 1].y
            });
            break;
        case DIRECTION.UP:
            snake.body.push({
                x: snake.body[snake.body.length - 1].x,
                y: snake.body[snake.body.length - 1].y + DIM_SQUARE
            });
            break;
        default:

    }

};
export const progressPosition = (pos: IPosition, direction: DIRECTION): IPosition => {
    let newPos: IPosition = { x: pos.x, y: pos.y };
    switch (direction) {
        case DIRECTION.RIGHT:
            // on avance sur X
            newPos.x = newPos.x + DIM_STEP_FORWARD;
            break;
        case DIRECTION.DOWN:
            // on avance sur Y
            newPos.y = newPos.y + DIM_STEP_FORWARD;
            break;
        case DIRECTION.LEFT:
            // on avance sur X
            newPos.x = newPos.x - DIM_STEP_FORWARD;
            break;
        case DIRECTION.UP:
            // on avance sur Y
            newPos.y = newPos.y - DIM_STEP_FORWARD;
            break;
        default:
            console.log('aucune direction definie');
    }
    return newPos;
};
