import React, {ReactElement} from "react";

import "../../style/onboarding.scss";
import {Routes} from "../../constants/routes";
import {RegisterForm} from "./RegisterForm";

export const RegisterContainer = (): ReactElement => {
    return (
        <div className="onboarding-container">
            <h1>
                An analysis tool for your <a href="http://filecoin.io" target="_blank" rel="noopener noreferrer">
                Filecoin</a> mining nodes.
            </h1>

            <div className="flex-column">
                <div className="form-container flex-column">
                    <div className="logo-horizontal self-centered" />

                    <RegisterForm />
                </div>

                <div className="signup-suggestion">
                    Already have an account? <b><a href={Routes.LOGIN_ROUTE}>Login</a></b>
                </div>
            </div>
        </div>
    );
}
