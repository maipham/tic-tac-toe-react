import * as React from 'react';
import './welcomeScreen.css';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import GameDisplayer from "../GameDisplayer/GameDisplayer";
import {Game} from "../../entities/game";
import {TwoPlayerGame} from "../../entities/TwoPlayerGame";
import {BotGame} from "../../entities/BotGame";
import {GameStatus} from "../../entities/game-status.enum";
import Button from '@material-ui/core/Button';

interface welcomeScreenProp {
}

interface welcomeScreenState {
    game: Game;
    selectedValue: string;
}

export default class welcomeScreen extends React.Component<welcomeScreenProp, welcomeScreenState> {
    status: string = '';

    constructor(props: Readonly<welcomeScreenProp>) {
        super(props);
        this.state = {
            game: new TwoPlayerGame(),
            selectedValue: 'friend'
        };
        console.log(this.state.game.getGameStatus());
    };

    resetGame = () => {
        if (this.state.game instanceof BotGame) {
            this.setState({game: new BotGame(), selectedValue: 'bot'});
        } else if (this.state.game instanceof TwoPlayerGame) {
            this.setState({game: new TwoPlayerGame(), selectedValue: 'friend'});
        }
    };

    resetBoard = () => {
        this.state.game.newBoard();
        this.state.game.setGameStatus(GameStatus.PLAYING);
        if (this.state.game instanceof BotGame) {
            this.state.game.setCurrentPlayer(this.state.game.getPlayer1());
        }
        this.updateGame();
    };

    playWithBot = () => {
        this.setState({
            game: new BotGame(),
            selectedValue: 'bot'

        });
    };
    playWithFriend = () => {
        this.setState({
            game: new TwoPlayerGame(),
            selectedValue: 'friend'
        });
    };

    updateGame = () => {
        this.setState({
            game: this.state.game
        });
    };

    render() {
        const gameOver = this.state.game.getGameStatus() === GameStatus.PLAYING;
        return (
            <Grid container={true}
                  justify={'center'}>
                <Grid item={true}
                      container={true}
                      justify={'center'}>
                    <Grid item={true}
                          xs={12}>
                        <h1 style={{fontWeight: 'bold'}}>Tic Tac Toe</h1>
                    </Grid>
                    <Grid item={true}
                          container={true}
                          justify={'center'}
                          xs={12}
                          style={{width: 'fit-content'}}>
                        <Grid item={true}>
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
                        </Grid>
                        <Grid item={true}>
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
                                        aria-label="B"/>
                                }
                            />
                        </Grid>
                        <Grid item={true}
                              style={{width: '40px'}}/>
                    </Grid>
                    <Grid item={true}>
                        <GameDisplayer game={this.state.game}
                                       updateGame={this.updateGame}/>
                    </Grid>
                    <Grid item={true}
                          container={true} xs={12}>
                        <Grid container={true}
                              item={true}
                              xs={5}
                              justify={'flex-end'}>
                            <Grid item={true}>
                                <Button onClick={this.resetGame}
                                        color="secondary"
                                        variant={'contained'}
                                        style={{
                                            marginTop: '6px', marginBottom: '6px',
                                            paddingBottom: '0', paddingTop: '0'
                                        }}>
                                    Reset Game </Button>
                            </Grid>
                        </Grid>

                        <Grid item={true} xs={2}/>

                        <Grid container={true}
                              item={true}
                              xs={5}
                              justify={'flex-start'}>
                            <Grid item={true}>
                                <Button onClick={this.resetBoard}
                                        color="secondary"
                                        variant={'contained'}
                                        disabled={gameOver}
                                        style={{
                                            marginTop: '6px', marginBottom: '6px',
                                            paddingBottom: '0', paddingTop: '0'
                                        }}>
                                    Next Round </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
