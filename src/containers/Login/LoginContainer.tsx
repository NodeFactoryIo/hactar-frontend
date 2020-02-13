import React, {ReactElement} from "react";
import BackgroundImage4096 from "../../assets/images/background-photo4096.png";
import BackgroundImage2048 from "../../assets/images/background-photo2048.png";
import BackgroundImage1024 from "../../assets/images/background-photo1024.png";
import BackgroundImage768 from "../../assets/images/background-photo768.png";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";

export const LoginContainer = (): ReactElement => {
    return (
        <div className="onboarding-container">
            <img 
                className="background-image" 
                src={BackgroundImage1024} 
                srcSet={`
                    ${BackgroundImage768} 768w, 
                    ${BackgroundImage1024} 1024w, 
                    ${BackgroundImage2048} 2048w, 
                    ${BackgroundImage4096} 4096w
                `}
            />

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
