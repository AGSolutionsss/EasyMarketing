import React from 'react';
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import logo from './../../../assets/images/em.jpg';

const LogoSection = () => {

    return (
        <React.Fragment>
            <Link component={RouterLink} to="dashboard">
                <img src={logo} alt="Berry" width="45" height="45" />
            </Link>
        </React.Fragment>
    );
};

export default LogoSection;
