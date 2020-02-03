import React, {ReactElement} from "react";

import BackgroundImage from "../../assets/images/background.svg";
import {Routes} from "../../constants/routes";
import {RegisterForm} from "./RegisterForm";

export const RegisterContainer = (): ReactElement => {
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

                    <RegisterForm />
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
