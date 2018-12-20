import * as React from 'react';
import './GameBoard.css';
import GridSquare from "../../entities/gridSquare";
import SquareDisplayer from "../SquareDisplayer/SquareDisplayer";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Game} from "../../entities/game";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

interface GameBoardProp {
    game: Game;

}

interface GameBoardState {
    width: number;
    height: number;
}

export default class GameBoard extends React.Component<GameBoardProp, GameBoardState> {

    constructor(props: Readonly<GameBoardProp>) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }


    render() {
        const gap = 8;
        const grid = this.props.game.getBoard().getGrid();
        return (
            <div>
                <Grid container={true}
                      spacing={gap}
                      justify={'center'} >
                    {grid.map((row: GridSquare[], i) => {
                        return (
                            <Grid container={true}
                                  item={true} key={i}
                                  xs={12}
                                  justify={'center'}
                                  spacing={gap}>
                                {row.map((square: GridSquare, j) => {
                                        return (
                                            <Grid key={j}
                                                  item={true}>
                                                <Paper>
                                                    <SquareDisplayer game={this.props.game}
                                                                     square={square}
                                                                     _space={gap}/>
                                                </Paper>
                                            </Grid>
                                        )
                                    }
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
                <ScoreBoard player1={this.props.game.getPlayer1()} player2={this.props.game.getPlayer2()}/>
            </div>
        );
    }
}
