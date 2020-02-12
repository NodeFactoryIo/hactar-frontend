import React, {ReactElement} from "react";
import BackgroundImage4096 from "../../assets/images/background-photo4096.png";
import BackgroundImage2048 from "../../assets/images/background-photo2048.png";
import BackgroundImage1024 from "../../assets/images/background-photo1024.png";
import {Routes} from "../../constants/routes";
import {RegisterForm} from "./RegisterForm";

export const RegisterContainer = (): ReactElement => {
    return (
        <div className="onboarding-container">
            <img 
                className="background-image" 
                src={BackgroundImage1024} 
                srcSet={`${BackgroundImage1024} 1024w, ${BackgroundImage2048} 2048w, ${BackgroundImage4096} 4096w`}
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
