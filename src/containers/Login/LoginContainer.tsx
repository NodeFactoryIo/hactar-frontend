import React, {ReactElement} from "react";

import "../../style/onboarding.scss";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";

export const LoginContainer = (): ReactElement => {
    return (
        <div className="onboarding-container">
            <h1>
                An analysis tool for your{" "}
                <a href="http://filecoin.io" target="_blank" rel="noopener noreferrer">
                    Filecoin
                </a>{" "}
                mining nodes.
            </h1>

            <div className="flex-column">
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
