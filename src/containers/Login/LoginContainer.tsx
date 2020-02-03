import React, {ReactElement} from "react";

import BackgroundImage from "../../assets/images/background.svg";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";

export const LoginContainer = (): ReactElement => {
    return (
        <div className="onboarding-container">
            <img src={BackgroundImage} className="background-image" />

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

                    <LoginForm />
                </div>

                <div className="signup-suggestion">
                    Don't have an account?{" "}
                    <b>
                        <a href={Routes.REGISTER_ROUTE}>Sign Up</a>
                    </b>
                </div>
            </div>
        </div>
    );
};
