import React, {ReactElement} from "react";

interface IBaseButtonProps extends React.HTMLProps<HTMLButtonElement> {
    type: string;
}

export const Button = ({type, ...props}: IBaseButtonProps): ReactElement => (
    <button {...props} className={`button btn-${type}`} />
);
