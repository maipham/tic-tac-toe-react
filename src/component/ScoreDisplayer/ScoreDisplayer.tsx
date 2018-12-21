import * as React from 'react';
import './ScoreDisplayer.css';
import {Player} from "../../entities/player";
import Grid from '@material-ui/core/Grid';

interface ScoreProp {
    player1: Player;
    player2: Player;
    updateGame: () => void;
}

interface ScoreState {
    width: number;
    height: number;
}

export default class ScoreDisplayer extends React.Component<ScoreProp, ScoreState> {
    _textDefSize = 35;
    _textRatio = 1 / 20;
    _textSize = this._textDefSize;
    _containerSize = this._textDefSize * 3;

    constructor(props: Readonly<ScoreProp>) {
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
        this._containerSize = this._textSize * 3;
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
            fontSize: this._textSize + 'px',
            padding: '0',
            margin: '0',
        };
        return (
            <div style={{alignItems: 'center'}}>
                <Grid item={true} xs={12} container={true} justify={'center'}>
                    <Grid item={true}>
                        <p style={style}>
                            <strong>{player1Name}</strong> - {player1Score}
                        </p>
                    </Grid>
                    <Grid item={true} style={{width: '100px'}}/>
                    <Grid item={true} style={{padding: '0'}}>
                        <p style={style}>
                            <strong>{player2Name}</strong> - {player2Score}
                        </p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
