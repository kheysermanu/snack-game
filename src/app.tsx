import React, { SyntheticEvent, Component } from 'react';
import FirstComponent from './firstComponent';
import './app.scss';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e3f2fd',
  },
};

interface IAppComponentProps {
  classes?: any;
  compiler: string;
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
        <Typography component='h4' gutterBottom={true}>
          Hello, Welcome to the first Snake game page from {this.props.framework} - {this.props.compiler}
        </Typography>
        <FirstComponent />
      </div>
    );
  }
}

export default withStyles(styles)(AppComponent);
