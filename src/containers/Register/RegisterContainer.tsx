import React, {ReactElement, useEffect} from "react";
import BackgroundImage from "../../assets/images/background.svg";
import {Routes} from "../../constants/routes";
import {RegisterForm, IRegisterFormData} from "./RegisterForm";
import {submitUserRegistration} from "./RegisterSlice";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

export const RegisterContainer = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    const registerState = useSelector((state: RootState) => state.register);

    const handleSignUp = (submitData: IRegisterFormData): void => {
        dispatch(
            submitUserRegistration({
                email: submitData.email,
                password: submitData.password,
            }),
        );
        console.log(submitData);
    };

    useEffect(() => {
        if (registerState.success) history.push(Routes.LOGIN_ROUTE);
    }, [registerState.success]);

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
