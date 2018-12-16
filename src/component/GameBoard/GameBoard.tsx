import * as React from 'react';
import './GameBoard.css';

interface GameBoardProp {
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
            <div>
                GameBoard works!
            </div>
        );
    }
}
