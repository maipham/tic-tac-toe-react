import * as React from 'react';
import './Game.css';
import GameBoard from "../GameBoard/GameBoard";

interface GameProp {
}

interface GameState {
}

export default class Game extends React.Component<GameProp, GameState> {
    constructor(props: Readonly<GameProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                <GameBoard></GameBoard>
            </div>
        );
    }
}
