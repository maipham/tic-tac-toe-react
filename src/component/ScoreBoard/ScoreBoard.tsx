import * as React from 'react';
import './ScoreBoard.css';
import {Player} from "../../entities/player";
import Grid from '@material-ui/core/Grid';

interface ScoreBoardProp {
    player1: Player;
    player2: Player;
}

interface ScoreBoardState {
}

export default class ScoreBoard extends React.Component<ScoreBoardProp, ScoreBoardState> {
    constructor(props: Readonly<ScoreBoardProp>) {
        super(props);
        this.state = {

        };
    };

    render() {
        const player1Name = this.props.player1.getName();
        const player2Name = this.props.player2.getName();
        const player1Score = this.props.player1.getScore();
        const player2Score = this.props.player2.getScore();
        const _justify = 'center';
        const style = {
            backgroundColor: '#8c9eff',
            width: 'fit-content',
            borderRadius: '25px',
            padding: '0 10px 0 10px'
        };
        return (
            <Grid container={true}>
                <Grid container={true} justify={'center'}>
                    <Grid item={true}>
                        <p style={style}> {player1Name} {player1Score} - {player2Score} {player2Name} </p>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
