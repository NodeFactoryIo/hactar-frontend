import React, {ReactElement} from "react";
import Search from "@material-ui/icons/Search";

interface IEmptyListProps {
    message: string;
}

export const EmptyList = ({message}: IEmptyListProps): ReactElement => {
    return (
        <div className="empty-list flex-column centered">
            <Search />
            <h2>{message}</h2>
        </div>
    );
};
