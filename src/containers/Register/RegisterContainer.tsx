import React, {ReactElement, useState, useEffect} from "react";
import {Routes} from "../../constants/routes";
import {RegisterForm, IRegisterFormData} from "./RegisterForm";
import {submitUserRegistration} from "./UserSlice";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {BackgroundImage} from "../../components/BackgroundImage";
import {Notification} from "../../components/Notification/Notification";

export const RegisterContainer = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    const handleSignUp = (submitData: IRegisterFormData): void => {
        dispatch(
            submitUserRegistration({
                email: submitData.email,
                password: submitData.password,
            }),
        );
    };

    useEffect(() => {
        if (userState.registerSuccessValue) {
            setTimeout(history.push, 1000, Routes.LOGIN_ROUTE);
        }
    }, [userState, history]);

    return (
        <div className="onboarding-container">
            {userState.registerSuccessValue ?
                <Notification type="success" message="Registration successful"  />
                : null}
            {userState.registerErrorValue ?
                <Notification type="error" message={userState.registerErrorValue} />
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

                    <RegisterForm onSubmit={handleSignUp} />
                </div>

                <div className="signup-suggestion">
                    Already have an account?{" "}
                    <b>
                        <a href={Routes.LOGIN_ROUTE}>Login</a>
                    </b>
                </div>
            </div>
        </div>
    );
};
