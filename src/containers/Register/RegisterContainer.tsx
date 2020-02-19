import React, {ReactElement, useState, useEffect} from "react";
import BackgroundImage4096 from "../../assets/images/background-photo4096.png";
import BackgroundImage2048 from "../../assets/images/background-photo2048.png";
import BackgroundImage1024 from "../../assets/images/background-photo1024.png";
import BackgroundImage768 from "../../assets/images/background-photo768.png";
import {Routes} from "../../constants/routes";
import {RegisterForm, IRegisterFormData} from "./RegisterForm";
import {submitUserRegistration} from "./UserSlice";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

export const RegisterContainer = (): ReactElement => {
    const [notificationStatus, setNotificationStatus] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    const handleSignUp = (submitData: IRegisterFormData): void => {
        dispatch(
            submitUserRegistration({
                email: submitData.email,
                password: submitData.password,
            }),
        );
    };

    useEffect(() => {
        if (userState.registerSuccessValue) {
            setNotificationStatus(true);
            setTimeout(history.push, 1000, Routes.LOGIN_ROUTE);
        }
        if (userState.registerErrorValue) {
            setNotificationStatus(true);
            setTimeout(setNotificationStatus, 4000, false);
        }
    }, [userState]);

    return (
        <div className="onboarding-container">
            {/* temporary notification */}
            <div className={`temporary-notification ${notificationStatus ? "" : "hidden"}`}>
                {userState.registerSuccessValue ? "Registration successful" : userState.registerErrorValue}
            </div>
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
