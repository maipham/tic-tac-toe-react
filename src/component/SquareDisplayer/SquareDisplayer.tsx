import * as React from 'react';
import './SquareDisplayer.css';
import GridSquare from "../../entities/gridSquare";
import Grid from '@material-ui/core/Grid';
import {MarkerEnum} from "../../entities/marker.enum";
import {Game} from "../../entities/game";
import {GameStatus} from "../../entities/game-status.enum";
import {BotGame} from "../../entities/BotGame";
import BotPlayer from "../../entities/BotPlayer";

interface SquareDisplayerProp {
    game: Game;
    square: GridSquare;
    _space: number;
    updateGame: () => void;
}

interface SquareDisplayerState {
    width: number;
    height: number;
    marker: MarkerEnum;
    game: Game;
}

export default class SquareDisplayer extends React.Component<SquareDisplayerProp, SquareDisplayerState> {
    _squareDefSize = 150;
    _textDefSize = 100;
    _size = this._squareDefSize;
    _squareRatio = 1 / 5;
    _spacing = this.props._space;
    _textRatio = 1/3;
    _textSize = this._textDefSize;



    constructor(props: Readonly<SquareDisplayerProp>) {
        super(props);
        const row = this.props.square.getPosition().getRow();
        const col = this.props.square.getPosition().getCol();
        this.state = {
            width: 0,
            height: 0,
            marker: this.props.game.getBoard().getGrid()[row][col].getMarker(),
            game: this.props.game,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setSize();
    };

    handler = () => {
        this.props.game.tick(this.props.square.getPosition());
        this.props.updateGame();
    };

    setSize(): void {
        if (window.innerWidth < 790) {
            this._size = window.innerWidth * this._squareRatio - this._spacing;
            this._textSize = this._size * this._textRatio;
        } else {
            this._size = this._squareDefSize;
            this._textSize = this._textDefSize;
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        document.title = 'Tic Tac Toe';
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
            fontSize: this._textSize + 'px',
        };

        console.log(this._size);
        return (
            <div onClick={this.handler}>
                <Grid style={styles}>
                    {this.props.square.getMarker()}
                </Grid>
            </div>
        );
    }
}
