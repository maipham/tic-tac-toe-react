
import * as React from 'react';
import './welcomeScreen.css';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
    selectedValue: string;
}

export default class welcomeScreen extends React.Component<welcomeScreenProp, welcomeScreenState> {
    constructor(props: Readonly<welcomeScreenProp>) {
        super(props);
        this.state = {
            game: new TwoPlayerGame(),
            selectedValue: 'friend'
        };
    };

    playWithBot = () => {
        this.setState({
            game: new AIGame()
        });
        this.setState({
            selectedValue: 'bot' });
        console.log('Play with bot');
    };
    playWithFriend = () => {
        this.setState({
            game: new TwoPlayerGame()
        });
        this.setState({ selectedValue: 'friend' });
        console.log('Play with friend');
    };

    updateGame = () => {
        this.setState({
            game: this.state.game
        });
    };

    render() {
        return (
            <Grid container={true} justify={'center'} >
                <Grid item={true} container={true} justify={'center'}>
                    <Grid item={true} xs={12}>
                        <h1>Tic Tac Toe</h1>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <FormControlLabel
                            value="end"
                            label="Play with a friend"
                            labelPlacement="end"
                            control={
                                <Radio
                                    checked={this.state.selectedValue === 'friend'}
                                    onChange={this.playWithFriend}
                                    value="a"
                                    name="radio-button-demo"
                                    aria-label="A"
                                />
                            }
                        />
                        <FormControlLabel
                            value="end"
                            label="Play with bot"
                            labelPlacement="end"
                            control={
                                <Radio
                                    checked={this.state.selectedValue === 'bot'}
                                    onChange={this.playWithBot}
                                    value="b"
                                    name="radio-button-demo"
                                    aria-label="B"
                                />
                            }
                        />
                    </Grid>
                    <Grid item={true}>
                        <GameDisplayer game={this.state.game} updateGame={this.updateGame}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
