import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Game from 'model/game';
import { saveStat } from 'actions/stat.action';
import { withStyles, createStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { List } from 'immutable';

interface IStatProps {
    classes?: any;
    stat?: List<Game>;
}
const styles = (theme: Theme) => createStyles(
    {
        typo: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.light
        }
    }
);
export class StatComponent extends React.Component<IStatProps>{
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography className={classes.typo} component='h2' gutterBottom={true}>
                    Stat Game
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    stat: store.statReducer.game
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, null))
    (StatComponent);
