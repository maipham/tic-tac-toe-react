
import * as React from 'react';
import './GameDisplayer.css';
import {Game} from "../../entities/game";
import GameBoard from "../GameBoard/GameBoard";

interface GameDisplayerProp {
    game: Game;
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
        return (
            <Grid>
                <
                <GameBoard board={this.props.game.getBoard()}/>
            </Grid>
        );
    }
}
