import React from 'react';
import * as Canvas from './canvas';
import * as Tools from 'lodash';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/Replay';
import Star from '@material-ui/icons/Star';
import { withStyles, createStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { connect } from 'react-redux';
import Game from 'model/game';
import { saveStat } from 'actions/stat.action';
import moment from 'moment';
const KeyboardEventHandler = require('react-keyboard-event-handler/lib/react-keyboard-event-handler');

interface ISnakePropsPane {
        classes?: any;
        onSave: Function;
}

const styles = (theme: Theme) => createStyles(
        {
                divCanvas: {
                        width: '100%',
                        height: '100%',
                        flex: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyItems: 'center',
                        backgroundColor: theme.palette.common.black
                },
                btn: {
                        flex: 'auto',
                        width: '100%'
                },
                canvas: {
                        border: 'solid 1px white'
                },
                loose: {
                        border: 'solid 2px red'
                },
                typo: {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        color: theme.palette.primary.light,
                        flexDirection: 'row-reverse'
                }
        });
class FirstComponent extends React.Component<ISnakePropsPane> {
        state = Canvas.ORI_STATE();
        myCanvas: any;
        intervalID: any = null;
        progressBinded: any;
        constructor(props: Readonly<ISnakePropsPane>) {
                super(props);
        }
        componentDidMount() {
                this.startGame();
        }
        componentDidUpdate(prevState: any) {
                this.updateSnack();
                if (this.state.play && (prevState.food === undefined || this.state.food.eated !== prevState.food.eated)) {
                        this.showFood();
                }
        }
        componentWillUnmount() {
                if (this.intervalID) {
                        clearTimeout(this.intervalID);
                        this.intervalID = null;
                }
        }

        startGame = () => {
                if (this.intervalID === null) {
                        this.intervalID = setInterval(() => { this.progress() }, Canvas.DELAY);
                }
        }

        looseGame = () => {
                clearTimeout(this.intervalID);
                this.intervalID = null;
                Canvas.drawText(this.myCanvas.getContext('2d'), 'You loose', 'red');
        }

        progress = () => {
                const { x, y } = Canvas.progressPosition(this.state.snake.body[0], this.state.direction);
                const check = Canvas.checkNewPosition(x, y);
                if (check.currentStep) {
                        const isFoodEated = Canvas.isFoodEated(this.state.food, this.state.snake);
                        const food: Canvas.IFoodSnake = isFoodEated ? Canvas.genFoodSnake() : this.state.food;
                        const snake: Canvas.ISnake = this.state.snake;
                        const game: Game = this.state.game;
                        game.score = isFoodEated ?
                                game.score + 1 : game.score;
                        if (!check.nextStep) {
                                game.endGame = moment().format();
                        }
                        Canvas.moveSnake(snake, x, y);
                        if (isFoodEated) {
                                Canvas.addBodyToSnake(snake, this.state.direction);
                        }
                        this.setState({
                                snake: snake,
                                play: check.nextStep,
                                game: game,
                                food: food
                        });
                }
        }
        showFood = () => {
                Canvas.drawSnakeFood(this.myCanvas.getContext('2d'), this.state.food);
        }
        updateSnack = () => {
                if (this.myCanvas) {
                        Canvas.drawSnake(this.myCanvas.getContext('2d'), this.state.snake);
                }
                if (!this.state.play) {
                        this.looseGame();
                        this.props.onSave(this.state.game);
                }
        }

        onKeyEvent = (key: string, e: any) => {
                if (Canvas.checkChangeDirection(this.state.direction, key, !this.state.play)) {
                        this.setState({ direction: key });
                } else {
                        console.log('on ne change pas de direction');
                }
        }

        onReplay = () => {
                this.setState(Canvas.ORI_STATE());
                this.startGame();
        }

        getButton = (classes: any) => {
                return (
                        <Button
                                className={classes.btn}
                                onClick={this.onReplay}
                                disabled={this.state.play}
                                color={'primary'}
                        >
                                <Replay color={'primary'} />
                        </Button>
                );
        }

        render() {
                const { classes } = this.props;
                return (
                        <div className={classes.divCanvas}>
                                <KeyboardEventHandler
                                        handleKeys={Tools.toArray(Canvas.DIRECTION)}
                                        onKeyEvent={this.onKeyEvent}
                                />
                                <Typography className={classes.typo} component='h4' gutterBottom={true}>
                                        <Star /> {this.state.game.score}
                                </Typography>
                                <canvas
                                        className={this.state.play ? classes.canvas : classes.loose}
                                        id='canvasid'
                                        ref={canvas => this.myCanvas = canvas}
                                        width={Canvas.PANE.width}
                                        height={Canvas.PANE.height}
                                >
                                        Canvas is not supported.
                                </canvas>
                                {!this.state.play && this.getButton(classes)}
                        </div>
                );
        }
}
const mapDispatchToProps = { onSave: saveStat };

export default connect(null, mapDispatchToProps)(withStyles(styles)(FirstComponent));
