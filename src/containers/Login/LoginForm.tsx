import React, {useEffect} from "react";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {useForm, Controller} from "react-hook-form";

export interface ILoginFormProps {
    onSubmit: (submitData: ILoginFormData) => void;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

export const LoginForm = (props: ILoginFormProps) => {
    const {register, handleSubmit, errors, control} = useForm<ILoginFormData>();

    const onSubmit = handleSubmit((submitData: ILoginFormData) => {
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
            <Button type="primary">Login</Button>
        </form>
    );
};
