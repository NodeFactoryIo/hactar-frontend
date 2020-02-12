import React, {ReactElement} from "react";
import BackgroundImage from "../../assets/images/background.svg";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {ILoginFormData} from "./LoginForm";
import {submitUserLogin} from "./LoginSlice";

export const LoginContainer = (): ReactElement => {
    const history = useHistory();    
    const dispatch = useDispatch();
    // const loginState = useSelector((state: RootState) => state.login);

    const handleSignIn = (submitData: ILoginFormData): void => {
        console.log(submitData);
        dispatch(
            submitUserLogin(submitData)
        )

    };

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

                    <LoginForm onSubmit={handleSignIn}/>
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
