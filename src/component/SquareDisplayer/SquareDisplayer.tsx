import * as React from 'react';
import './SquareDisplayer.css';
import GridSquare from "../../entities/gridSquare";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
interface SquareDisplayerProp {
    square: GridSquare;
}

interface SquareDisplayerState {
}

export default class SquareDisplayer extends React.Component<SquareDisplayerProp, SquareDisplayerState> {
    name = 'square';
    size = 75;
    styles = {
        width: this.size + 'px',
        height: this.size + 'px',
        backgroundColor: '#8c9eff',
        justifyContent: 'center',
        fontSize: '50px'
    };
    constructor(props: Readonly<SquareDisplayerProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Grid className={this.name}
                  style={this.styles}>
                X
            </Grid>
        );
    }
}
