import React, {ReactElement, useState, useEffect} from "react";
import BackgroundImage from "../../assets/images/background.svg";
import {Routes} from "../../constants/routes";
import {RegisterForm, IRegisterFormData} from "./RegisterForm";
import {submitUserRegistration} from "./RegisterSlice";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

export const RegisterContainer = (): ReactElement => {
    const [notificationStatus, setNotificationStatus] = useState<boolean>(false);
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
    };

    useEffect(() => {
        if (registerState.success) {
            setNotificationStatus(true);
            setTimeout(history.push, 1000, Routes.LOGIN_ROUTE);
        } 
        if (registerState.error) {
            setNotificationStatus(true);
            setTimeout(setNotificationStatus, 4000, false);
        }
    }, [registerState.success, registerState.error]);

    return (
        <div className="onboarding-container">
            {/* temporary notification */}
            <div className={`temporary-notification ${notificationStatus ? "" : "hidden"}`}>
            {registerState.success ? "Registration successful" : registerState.error}
            </div>
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
