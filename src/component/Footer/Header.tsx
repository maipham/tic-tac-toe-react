import * as React from 'react';
import './Header.css';
import Grid from '@material-ui/core/Grid'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

interface HeaderProp {
}

interface HeaderState {
}

export default class Header extends React.Component<HeaderProp, HeaderState> {
    constructor(props: Readonly<HeaderProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Grid container={true}
                  justify={'flex-end'}>
                <Grid item={true}
                      style={{display: 'inline-flex'}}>
                    <p style={{margin: '5px'}}>
                        <a href={'https://github.com/maipham/tic-tac-toe-react/'}
                           style={{textDecoration: 'None'}}
                            target={'_blank'}>
                        Made by Mai  <FontAwesomeIcon style={{color: '#f50057', fontSize: '25px'}} icon={faGithubAlt}/>
                    </a>
                    </p>
                </Grid>
            </Grid>
        );
    }
}
