import React, {lazy} from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import MinimalLayout from './../layout/MinimalLayout';



const AuthPassword = lazy(() => import('../views/pages/authentication/forgetpassword'));
const AuthRegister = lazy(() => import('../views/pages/authentication/register'));

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                
                '/forget-password',
                '/register'
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/forget-password" component={AuthPassword} />
                    <Route path="/register" component={AuthRegister} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
