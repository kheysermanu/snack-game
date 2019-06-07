import React from 'react';
import './mycanvas.scss';
import * as Canvas from './canvas';
import * as Tools from 'lodash';
import Button from '@material-ui/core/Button';
import Replay from '@material-ui/icons/Replay';
import { withStyles, createStyles } from '@material-ui/styles';
const KeyboardEventHandler = require('react-keyboard-event-handler/lib/react-keyboard-event-handler');

interface ISnackPropsPane {
        classes?: any;
}

const styles = createStyles({
        divCanvas: {
                flex: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center'
        },
        btn: {
                flex: 'auto',
                width: '100%'
        }
});
const initState = () => {
        return {
                x: Canvas.ORI_STATE.x,
                y: Canvas.ORI_STATE.y,
                direction: Canvas.ORI_STATE.direction,
                game: true
        }
};
export class FirstComponent extends React.Component<ISnackPropsPane> {
        state = initState();
        myCanvas: any;
        intervalID: any = null;
        progressBinded: any;
        componentDidMount() {
                this.startGame();
        }
        componentDidUpdate() {
                this.updateSnack();
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
                console.log('You loose');
        }

        progress = () => {
                let newX = this.state.x;
                let newY = this.state.y;
                switch (this.state.direction) {
                        case Canvas.DIRECTION.RIGHT:
                                // on avance sur X
                                newX = newX + Canvas.DIM_STEP_FORWARD;
                                break;
                        case Canvas.DIRECTION.DOWN:
                                // on avance sur Y
                                newY = newY + Canvas.DIM_STEP_FORWARD;
                                break;
                        case Canvas.DIRECTION.LEFT:
                                // on avance sur X
                                newX = newX - Canvas.DIM_STEP_FORWARD;
                                break;
                        case Canvas.DIRECTION.UP:
                                // on avance sur Y
                                newY = newY - Canvas.DIM_STEP_FORWARD;
                                break;
                        default:
                                console.log('aucune direction definie');
                }
                const check = Canvas.checkNewPosition(newX, newY);
                if (check.currentStep) {
                        this.setState({ x: newX, y: newY, game: check.nextStep });
                }
        }
        updateSnack = () => {
                if (this.myCanvas) {
                        Canvas.drawSquare(this.myCanvas.getContext('2d'), this.state.x, this.state.y);
                }
                if (!this.state.game) {
                        this.looseGame();
                }
        }

        onKeyEvent = (key: string, e: any) => {
                if (Canvas.checkChangeDirection(this.state.direction, key, !this.state.game)) {
                        this.setState({ direction: key });
                } else {
                        console.log('on ne change pas de direction');
                }
        }

        onReplay = () => {
                this.setState(initState());
                this.startGame();
        }

        getButton = (classes: any) => {
                return (
                        <Button
                                className={classes.btn}
                                onClick={this.onReplay}
                                disabled={this.state.game}
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
                                <canvas
                                        className={this.state.game ? 'canvas' : 'loose'}
                                        id='canvasid'
                                        ref={canvas => this.myCanvas = canvas}
                                        width={Canvas.PANE.width}
                                        height={Canvas.PANE.height}
                                >
                                        Canvas is not supported.
                                </canvas>
                                {!this.state.game && this.getButton(classes)}
                        </div>
                );
        }
}

export default withStyles(styles)(FirstComponent);
