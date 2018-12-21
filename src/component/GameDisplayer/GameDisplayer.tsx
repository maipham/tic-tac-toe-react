import * as React from 'react';
import './GameDisplayer.css';
import {Game} from "../../entities/game";
import BoardDisplayer from "../BoardDisplayer/BoardDisplayer";
import ScoreDisplayer from "../ScoreDisplayer/ScoreDisplayer";
import {GameStatus} from "../../entities/gameStatus.enum";

interface GameDisplayerProp {
    game: Game;
    updateGame: () => void;
}

interface GameDisplayerState {
    width: number;
    height: number;
}

export default class GameDisplayer extends React.Component<GameDisplayerProp, GameDisplayerState> {

    constructor(props: Readonly<GameDisplayerProp>) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    };

    updateStatus(): string {
        let status = '';
        if (this.props.game.getGameStatus() === GameStatus.PLAYING) {
            status = this.props.game.getCurrentPlayer().getPlayerMarker() +
                ' TURN';
        } else if (this.props.game.getGameStatus() === GameStatus.WIN) {
            status = this.props.game.getWinner().getPlayerMarker() +
                ' WIN';
        } else if (this.props.game.getGameStatus() === GameStatus.DRAW) {
            status = 'DRAW';
        }
        return status;
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', () => {
            this.setState({width: window.innerWidth, height: window.innerHeight});
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        const style = {
            alignItems: 'center'
        };

        return (
            <div style={style}>
                <ScoreDisplayer player1={this.props.game.getPlayer1()}
                                player2={this.props.game.getPlayer2()}
                                updateGame={this.props.updateGame}/>
                <BoardDisplayer game={this.props.game} updateGame={this.props.updateGame}/>
            </div>
        );
    }
}
