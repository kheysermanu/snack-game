import React, { SyntheticEvent, Component } from 'react';
import FirstComponent from './firstComponent';
import './app.scss';
import { createStyles, withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.common.black,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center'
  },
  typo: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.light
  }
});

interface IAppComponentProps {
  classes?: any;
  framework: string;
};

class AppComponent extends React.Component<IAppComponentProps> {

  constructor(props: IAppComponentProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.typo} component='h4' gutterBottom={true}>
          Hello, Welcome to my first Snake game page from {this.props.framework}
        </Typography>
        <FirstComponent />
      </div>
    );
  }
}

export default withStyles(styles)(AppComponent);
