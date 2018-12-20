import * as React from 'react';
import './GameDisplayer.css';
import {Game} from "../../entities/game";
import GameBoard from "../GameBoard/GameBoard";
import Grid from '@material-ui/core/Grid';
import ScoreBoard from "../ScoreBoard/ScoreBoard";

interface GameDisplayerProp {
    game: Game;
    updateGame: () => void;
}

interface GameDisplayerState {
}

export default class GameDisplayer extends React.Component<GameDisplayerProp, GameDisplayerState> {
    constructor(props: Readonly<GameDisplayerProp>) {
        super(props);
        this.state = {
        };
    };

    render() {
        const style = {
            alignItems: 'center'
        };
        return (

            <div style={style}>
                <GameBoard game={this.props.game} updateGame={this.props.updateGame}/>
            </div>
        );
    }
}
