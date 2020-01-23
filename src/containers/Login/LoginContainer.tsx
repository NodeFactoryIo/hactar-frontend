import React, {ReactElement} from "react";

import "./login.scss";
import {LoginForm} from "./LoginForm";

export class LoginContainer extends React.Component {
    public render(): ReactElement {
        return (
            <div className="login-container">
                <h1>
                    An analysis tool for your <a href="http://filecoin.io">Filecoin</a> mining nodes.
                </h1>

                <div className="flex-column">
                    <div className="login-form-container flex-column">
                        <div className="logo-horizontal self-centered" />

                        <LoginForm />
                    </div>

                    <div className="signup-suggestion">
                        Don't have an account? <b><a href="/register">Sign Up</a></b>
                    </div>
                </div>
            </div>
        );
    }
}
