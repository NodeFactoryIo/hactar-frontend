import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import {Routes} from "../constants/routes";
import {RootState} from "./rootReducer";

export interface IAuthenticatedRouteProps {
    path: string;
    component: any;
}

export const AuthenticatedRoute = ({component: Component, ...rest}: IAuthenticatedRouteProps) => {
    const state = useSelector((state: RootState) => state);
    const token = state.user.token;

    return (
        <Route
            {...rest}
            render={props =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: Routes.LOGIN_ROUTE, state: {from: props.location}}} />
                )
            }
        />
    );
};
