
import * as React from 'react';
import './welcomeScreen.css';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import GameDisplayer from "../GameDisplayer/GameDisplayer";
import {Game} from "../../entities/game";
import HumanPlayer from "../../entities/humanPlayer";
import AIPlayer from "../../entities/AIPlayer";
import {TwoPlayerGame} from "../../entities/TwoPlayerGame";
import {AIGame} from "../../entities/AIGame";

interface welcomeScreenProp {
}

interface welcomeScreenState {
    game: Game;
}

export default class welcomeScreen extends React.Component<welcomeScreenProp, welcomeScreenState> {
    constructor(props: Readonly<welcomeScreenProp>) {
        super(props);
        this.state = {
            game: new TwoPlayerGame()
        };
    };

    playWithBot = () => {
        this.setState({
            game: new AIGame()
        });
        console.log(this.state.game);
        console.log('Play with bot');
    };
    playWithFriend = () => {
        this.setState({
            game: new TwoPlayerGame()
        });
        console.log('Play with friend');
    };
    render() {
        return (
            <Grid container={true} >
                <Grid item={true} container={true}>
                    <Grid item={true} xs={12}>
                        <h1>Tic Tac Toe</h1>
                        {this.state.game.toString()}
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button variant={'contained'} onClick={this.playWithFriend}>Play with your friend</Button>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button variant={'contained'} onClick={this.playWithBot}>Play with Bot</Button>
                    </Grid>
                    <Grid item={true}>
                        <GameDisplayer game={this.state.game}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
