import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {Routes} from "../constants/routes";
import {useSelector} from "react-redux";
import {RootState} from "../app/rootReducer";

export interface IPrivateRouteProps {
    component: any
} 

export const PrivateRoute = ({component: Component, ...rest}: IPrivateRouteProps) => {
    const state = useSelector((state: RootState) => state);
    const token = state.user.token;


    return (
        <Route 
            {...rest}
            render={(props) => token
                ? <Component {...props} />
                : <Redirect to={{pathname: Routes.LOGIN_ROUTE, state: {from: props.location}}} />
            }
        />
    );
};