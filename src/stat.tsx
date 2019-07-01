import React from 'react';
import { connect } from 'react-redux';
import Game from 'model/game';
import { withStyles, createStyles } from '@material-ui/styles';
import { Typography, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { List } from 'immutable';
import moment from 'moment';
import { Link, RouteComponentProps } from 'react-router-dom';
import * as Constants from './constants';
import Replay from '@material-ui/icons/Replay';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import GraphComponent  from 'graph';

interface IStatProps extends RouteComponentProps {
    classes?: any;
    stat: List<Game>;
}
const styles = (theme: Theme) => createStyles(
    {
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        typo: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.dark,
            height: '3rem',
            justifyContent: 'center',
            flexDirection: 'column',
            flex: '1'
        },
        paper: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        button: {
            margin: theme.spacing.unit,
        },
    }
);
class StatComponent extends React.Component<IStatProps> {
    constructor(props: Readonly<IStatProps>) {
        super(props);
    }
    getDuration = (game: Game): number => {
        return (moment(game.endGame).toDate().getTime() -
            moment(game.startGame).toDate().getTime()) / 1000;
    }
    getTableBodyRow = (game: Game) => {
        return (
            <TableRow key={game.startGame}>
                <TableCell component='th' scope='row'>
                    {game.startGame}
                </TableCell>
                <TableCell align='right'>{game.endGame}</TableCell>
                <TableCell align='right'>{this.getDuration(game)}</TableCell>
                <TableCell align='right'>{game.score}</TableCell>
            </TableRow>
        );
    }
    getTableBody = () => {
        return (
            <>
                {this.props.stat && this.props.stat.map(row => this.getTableBodyRow(row))}
            </>
        );
    }
    onClick = (event: React.MouseEvent<HTMLElement>): any => {
        this.props.history.push(event.currentTarget.id);
    }
    getTableContent = (classes: any) => {
        return (
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date de début</TableCell>
                            <TableCell align='right'>Date de fin</TableCell>
                            <TableCell align='right'>Temps(s)</TableCell>
                            <TableCell align='right'>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.getTableBody()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    getHeaderButtons = (classes: any) => {
        return (
            <div>
                <Button
                    variant='contained'
                    id={Constants.GAME_URL}
                    className={classes.button}
                    onClick={this.onClick}
                >
                    <Replay /> Replay
                </Button>
                <Button
                    variant='contained'
                    id={Constants.ROOT_URL}
                    className={classes.button}
                    onClick={this.onClick}
                >
                    <Home /> Accueil
                </Button>
            </div>
        );
    }
    getGraphHisto = () => {
        return (
            <GraphComponent />
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.typo} component='h2' gutterBottom={true}>
                    Stat Game
                </Typography>
                {this.getHeaderButtons(classes)}
                {this.getTableContent(classes)}
                {this.getGraphHisto()}
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    stat: store.statReducer.game
});
export default connect(mapStateToProps, null)(withStyles(styles)(withRouter(StatComponent)));
