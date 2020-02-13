import React, {ReactElement, useState, useEffect} from "react";
import BackgroundImage from "../../assets/images/background.svg";
import {LoginForm} from "./LoginForm";
import {Routes} from "../../constants/routes";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {ILoginFormData} from "./LoginForm";
import {submitUserLogin} from "./LoginSlice";

export const LoginContainer = (): ReactElement => {
    const [notificationStatus, setNotificationStatus] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login);

    const handleSignIn = (submitData: ILoginFormData): void => {
        dispatch(submitUserLogin(submitData));
    };
    useEffect(() => {
        if (loginState.success) {
            setNotificationStatus(true);
            setTimeout(history.push, 1000, Routes.DASHBOARD_ROUTE);
        }
        if (loginState.error) {
            setNotificationStatus(true);
            setTimeout(setNotificationStatus, 4000, false);
        }
    }, [loginState]);
    return (
        <div className="onboarding-container">
            {/* temporary notification */}
            <div className={`temporary-notification ${notificationStatus ? "" : "hidden"}`}>
                {loginState.success ? "Registration successful" : loginState.error}
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

                    <LoginForm onSubmit={handleSignIn} />
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
