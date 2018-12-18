import * as React from 'react';
import './SquareDisplayer.css';
import GridSquare from "../../entities/gridSquare";
import Grid from '@material-ui/core/Grid';
import {MarkerEnum} from "../../entities/marker.enum";
import {Game} from "../../entities/game";
import {GameStatus} from "../../entities/game-status.enum";

interface SquareDisplayerProp {
    game: Game;
    square: GridSquare;
    _space: number;
}

interface SquareDisplayerState {
    width: number;
    height: number;
    marker: MarkerEnum;
    game: Game;
}

export default class SquareDisplayer extends React.Component<SquareDisplayerProp, SquareDisplayerState> {
    name = 'square';
    defaultSize = 150;
    _size = this.defaultSize;
    _ratio = 1 / 5;
    _spacing = this.props._space;


    constructor(props: Readonly<SquareDisplayerProp>) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            marker: this.props.square.getMarker(),
            game: this.props.game,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setSize();
    };

    handler = () => {
        this.props.game.tick(this.props.square.getPosition());
        this.setState({ //
            marker: this.props.square.getMarker(),
            game: this.props.game
        });
    };

    setSize(): void {
        if (window.innerWidth < 790) {
            this._size = window.innerWidth * this._ratio - this._spacing;
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
        this.setSize();
    }

    render() {
        const styles = {
            width: this._size + 'px',
            height: this._size + 'px',
            backgroundColor: '#8c9eff',
            fontSize: '50px'
        };

        return (
            <div onClick={this.handler}>
                <Grid className={this.name}
                      style={styles}>
                    {this.state.marker}
                </Grid>
            </div>
        );
    }
}
