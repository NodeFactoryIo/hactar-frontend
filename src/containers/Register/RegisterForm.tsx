import React, {useEffect} from "react";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";

export interface IRegisterFormProps {
    onSubmit: (submitData: IRegisterFormData) => void;
}

export interface IRegisterFormData {
    email: string;
    password: string;
    repeatPassword: string;
}

export const RegisterForm = (props: IRegisterFormProps) => {
    const {register, handleSubmit, errors, control, watch} = useForm<IRegisterFormData>();

    const onSubmit = handleSubmit((submitData: IRegisterFormData) => {
        props.onSubmit(submitData);
    });

    useEffect(() => {
        register(
            {name: "email"},
            {
                required: "Email required!",
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "That's not a valid email adress.",
                },
            },
        );
        register(
            {name: "password"},
            {
                required: "Password required!",
                minLength: {
                    value: 7,
                    message: "Password should at least be 7 characters long.",
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
    }, [register]);
    return (
        <form onSubmit={onSubmit}>
            <Controller
                as={Input}
                control={control}
                name="email"
                type="text"
                placeholder="Email"
                icon="email"
                error={errors.email && errors.email.message}
            />
            <Controller
                as={Input}
                control={control}
                name="password"
                type="password"
                placeholder="Password"
                icon="lock"
                error={errors.password && errors.password.message}
            />
            <Controller
                as={Input}
                control={control}
                name="repeatPassword"
                type="password"
                placeholder="Repeat password"
                icon="lock"
                error={errors.repeatPassword && errors.repeatPassword.message}
            />
            <Button type="primary">Sign up</Button>
        </form>
    );
};
