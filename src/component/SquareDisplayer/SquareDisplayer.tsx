import * as React from 'react';
import './SquareDisplayer.css';
import GridSquare from "../../entities/gridSquare";
import Grid from '@material-ui/core/Grid';
import {MarkerEnum} from "../../entities/marker.enum";
import {Game} from "../../entities/game";

interface SquareDisplayerProp {
    game: Game;
    square: GridSquare;
    space: number;
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
    _spacing = this.props.space;
    _textRatio = 2/3;
    _textSize = this._textDefSize;
    _widthBP = 790;
    _heightBP = 732;



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
        console.log(this.props.game.getCurrentPlayer().getPlayerMarker());
        this.props.game.tick(this.props.square.getPosition());
        this.props.updateGame();
        console.log(this.props.game.getGameStatus());
    };

    setSize(): void {
        if (window.innerWidth <= window.innerHeight) {
            if (window.innerWidth < this._widthBP) {
                this._size = window.innerWidth * this._squareRatio - this._spacing;
                this._textSize = this._size * this._textRatio;
            } else {
                this._size = this._squareDefSize;
                this._textSize = this._textDefSize;
            }
        } else {
            if (window.innerHeight < this._heightBP) {
                this._size = window.innerHeight * this._squareRatio - this._spacing;
                this._textSize = this._size * this._textRatio;
            } else {
                this._size = this._squareDefSize;
                this._textSize = this._textDefSize;
            }
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
            fontSize: this._textSize + 'px',
            fontFamily: 'Quicksand, sans-serif'
        };

        return (
            <div onClick={this.handler}>
                <Grid container={true} style={styles} justify={'center'}>
                    <Grid item={true}>
                        {this.props.square.getMarker()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}
