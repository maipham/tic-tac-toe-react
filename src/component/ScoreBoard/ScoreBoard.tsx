import * as React from 'react';
import './ScoreBoard.css';
import {Player} from "../../entities/player";
import Grid from '@material-ui/core/Grid';

interface ScoreBoardProp {
    player1: Player;
    player2: Player;

    updateGame: () => void;

}

interface ScoreBoardState {
    width: number;
    height: number;
}

export default class ScoreBoard extends React.Component<ScoreBoardProp, ScoreBoardState> {
    _textDefSize = 40;
    _textRatio = 1/19;
    _textSize = this._textDefSize;
    constructor(props: Readonly<ScoreBoardProp>) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.setSize();
    };
    setSize(): void {
        if (window.innerWidth < 790) {
            this._textSize = window.innerWidth * this._textRatio;
        } else {
            this._textSize = this._textDefSize;
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
        this.setSize();
    }
    render() {
        const player1Name = this.props.player1.getName();
        const player2Name = this.props.player2.getName();
        const player1Score = this.props.player1.getScore();
        const player2Score = this.props.player2.getScore();
        const style = {
            backgroundColor: '#8c9eff',
            width: 'fit-content',
            height: 'fit-content',
            borderRadius: '25px',
            padding: '0 10px 0 10px',
            fontSize: this._textSize + 'px'
        };
        return (
            <Grid container={true} justify={'center'}>
                <Grid item={true} container={true} justify={'center'}>
                    <p style={style}> {player1Name} {player1Score} - {player2Score} {player2Name} </p>
                </Grid>
            </Grid>
        );
    }
}
