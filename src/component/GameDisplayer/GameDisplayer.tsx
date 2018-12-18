import * as React from 'react';
import './GameDisplayer.css';
import {Game} from "../../entities/game";
import GameBoard from "../GameBoard/GameBoard";
import Grid from '@material-ui/core/Grid';
import ScoreBoard from "../ScoreBoard/ScoreBoard";

interface GameDisplayerProp {
    game: Game;
}

interface GameDisplayerState {
    game: Game;
}

export default class GameDisplayer extends React.Component<GameDisplayerProp, GameDisplayerState> {
    constructor(props: Readonly<GameDisplayerProp>) {
        super(props);
        this.state = {
            game: this.props.game,
        };
    };

    updateGameState = () => {

    };

    render() {
        const style = {
            alignItems: 'center'
        };
        return (

            <div style={style}>
                <h1>Tic Tac Toe</h1>
                <GameBoard game={this.props.game}/>
            </div>
        );
    }
}
