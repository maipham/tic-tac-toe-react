import * as React from 'react';
import './GameBoard.css';
import {Board} from "../../entities/board";
import GridSquare from "../../entities/gridSquare";
import FlexView from 'react-flexview';
import SquareDisplayer from "../SquareDisplayer/SquareDisplayer";
import Grid from '@material-ui/core/Grid';

interface GameBoardProp {
    board: Board;
}

interface GameBoardState {
}

export default class GameBoard extends React.Component<GameBoardProp, GameBoardState> {

    constructor(props: Readonly<GameBoardProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Grid alignContent={'center'} alignItems={'center'} justify={'center'}>
                <Grid  container spacing={16}>
                    {/*{this.props.board.getGrid().map((row: GridSquare[]) =>{*/}
                        {/*<Grid item xs={12}>*/}
                            {/*{this.props.board.getGrid()*/}
                        {/*</Grid>*/}
                    {/*})}*/}
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={16}>
                            {this.props.board.getGrid()[0].map((square: GridSquare) =>{
                                return <SquareDisplayer square={square}/>
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={16}>
                            {this.props.board.getGrid()[1].map((square: GridSquare) =>{
                                return <SquareDisplayer square={square}/>
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={16}>
                            {this.props.board.getGrid()[2].map((square: GridSquare) =>{
                                return <SquareDisplayer square={square}/>
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
