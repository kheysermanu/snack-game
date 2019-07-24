import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import { Theme, WithStyles } from '@material-ui/core';
import { drawGraph } from 'actions/graph';

export interface IGraphProps {
    data?: [];
    classes?: any;
}

const styles = (theme: Theme) => createStyles(
    {
        root: {
            flex: '3 auto',
            padding: '10px'
        }
    }
);

const DIV_ID = 'graphComponent';

const ID_GRAPH = 'graph';

class GraphComponent extends React.Component<IGraphProps> {
    state = {
        width: 20,
        height: 20
    }
    /**
       * Add event listener
       */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {
        drawGraph(ID_GRAPH, this.state.height, this.state.width);
    }

    updateDimensions = () => {
        const divRoot: HTMLElement | null = document.getElementById(DIV_ID);
        if (divRoot) {
            this.setState({
                height: divRoot.clientHeight - 10 * 2,
                width: divRoot.clientWidth - 10 * 2
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} id={DIV_ID}>
                <canvas id={ID_GRAPH} height={this.state.height} width={this.state.width} >
                    <p>Désolé, votre navigateur ne supporte pas Canvas. Mettez-vous à jour</p>
                </canvas >
            </div>
        );
    }
}

export default withStyles(styles)(GraphComponent);
