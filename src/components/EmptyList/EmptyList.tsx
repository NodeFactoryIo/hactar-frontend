import React, {ReactElement} from "react";

interface IEmptyListProps {
    message: string;
}

export const EmptyList = ({message}: IEmptyListProps): ReactElement => {
    return (
        <div className="empty-list flex-column centered">
            <i className="material-icons">search</i>
            <h2>{message}</h2>
        </div>
    );
};
