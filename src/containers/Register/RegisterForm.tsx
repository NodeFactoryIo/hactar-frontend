import React, {useEffect} from "react";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";
import {EmailRegex} from "../../app/constants";
import Email from "@material-ui/icons/NotificationsNone";
import Lock from "@material-ui/icons/Lock";

export interface IRegisterFormProps {
    onSubmit: (submitData: IRegisterFormData) => void;
}

export interface IRegisterFormData {
    email: string;
    password: string;
    repeatPassword: string;
}

export const RegisterForm = (props: IRegisterFormProps): React.ReactElement => {
    const {register, handleSubmit, errors, control, watch} = useForm<IRegisterFormData>();

    const onSubmit = handleSubmit((submitData: IRegisterFormData) => {
        props.onSubmit(submitData);
    });

    useEffect(() => {
        register(
            {name: "email"},
            {
                required: "Email required.",
                pattern: {
                    value: EmailRegex,
                    message: "That's not a valid email address.",
                },
            },
        );
        register(
            {name: "password"},
            {
                required: "Password required.",
                minLength: {
                    value: 7,
                    message: "Password should be at least 7 characters long.",
                },
            },
        );
        register(
            {name: "repeatPassword"},
            {
                required: "Repeat password required!",
                validate: value => value === watch("password") || "Passwords don't match.",
            },
        );
    }, [register, watch]);
    return (
        <form onSubmit={onSubmit}>
            <Controller
                as={Input}
                control={control}
                name="email"
                type="text"
                placeholder="Email"
                icon={<Email />}
                error={errors.email && errors.email.message}
            />
            <Controller
                as={Input}
                control={control}
                name="password"
                type="password"
                placeholder="Password"
                icon={<Lock />}
                error={errors.password && errors.password.message}
            />
            <Controller
                as={Input}
                control={control}
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                icon={<Lock />}
                error={errors.repeatPassword && errors.repeatPassword.message}
            />
            <Button type="primary">Sign up</Button>
        </form>
    );
};
