import React, {ReactElement, useState, useEffect} from "react";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {ILoginFormData} from "./LoginForm";
import {submitUserLogin} from "../Register/UserSlice";
import {BackgroundImage} from "../../components/BackgroundImage";
import {Notification} from "../../components/Notification/Notification";

export const LoginContainer = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    if (userState.token) {
        history.push(Routes.DASHBOARD_ROUTE);
    }

    const handleSignIn = (submitData: ILoginFormData): void => {
        dispatch(submitUserLogin(submitData));
    };

    useEffect(() => {
        if (userState.loginSuccessValue) {
            setTimeout(history.push, 1000, Routes.DASHBOARD_ROUTE);
        }
    }, [userState, history]);

    return (
        <div className="onboarding-container">
            {userState.loginSuccessValue ?
                <Notification type="success" message="Login successful"  /> : null}
            {userState.loginErrorValue ?
                <Notification type="error" message={userState.loginErrorValue} />
                : null}

            <BackgroundImage />

            <h1 className="elevated">
                An analysis tool for your{" "}
                <a href="http://filecoin.io" target="_blank" rel="noopener noreferrer">
                    Filecoin
                </a>{" "}
                mining nodes.
            </h1>

            <div className="flex-column elevated">
                <div className="form-container flex-column">
                    <div className="logo-horizontal self-centered" />

                    <LoginForm onSubmit={handleSignIn} />
                </div>

                <div className="signup-suggestion">
                    Don&apos;t have an account?{" "}
                    <b>
                        <a href={Routes.REGISTER_ROUTE}>Sign Up</a>
                    </b>
                </div>
            </div>
        </div>
    );
};
