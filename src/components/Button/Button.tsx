import React from "react";

interface IBaseButtonProps extends React.HTMLProps<HTMLButtonElement> {
    type: string;
}

export const Button = ({type, ...props}: IBaseButtonProps) => (
    <button {...props} className={`button btn-${type}`} />
);
