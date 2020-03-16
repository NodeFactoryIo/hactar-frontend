import React, {ReactElement} from "react";
import Search from "@material-ui/icons/Search";

interface IEmptyListProps {
    message: string;
    padding: "diskSpace" | "miningRewards" | "nodeList";
}

export const EmptyList = ({message, padding}: IEmptyListProps): ReactElement => {
    return (
        <div className={`empty-list flex-column centered ${padding}`}>
            <Search />
            <h2>{message}</h2>
        </div>
    );
};
