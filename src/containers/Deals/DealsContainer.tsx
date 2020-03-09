import React, {ReactElement, useEffect, useState} from "react";
import {TableCellProps} from "react-virtualized";
import {Table} from "../../components/Table/Table";
import {ClipboardTable} from "../../components/Clipboard/Clipboard";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getDeals} from "./DealsSlice";
import {DealStatus} from "../../app/constants";
import {Pagination} from "../../components/Pagination/Pagination";

export const DealsContainer = (): ReactElement => {
    const dispatch = useDispatch();
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    const deals = useSelector((state: RootState) => state.node.deals);
    const pageRecordsLimit = 6;
    const [fromRecords, setFromRecords] = useState(0);
    const [toRecords, setToRecords] = useState(pageRecordsLimit);

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getDeals(selectedNodeId, fromRecords, toRecords));
        }
    }, [selectedNodeId, fromRecords, toRecords, dispatch]);

    const onPageChange = (page: number): void => {
        const lastToBeRecord = page * pageRecordsLimit;
        setFromRecords(lastToBeRecord - pageRecordsLimit + 1);
        setToRecords(lastToBeRecord);
    };

    if (deals.isLoading) {
        return <div>Loading</div>;
    }

    const stateCellRenderer = ({cellData}: TableCellProps): ReactElement => {
        const textualState = DealStatus[cellData];
        return <span className={textualState}>{textualState}</span>;
    };

    const columns = [
        {key: "cid", label: "CID", renderer: ClipboardTable},
        {key: "state", renderer: stateCellRenderer},
        {key: "provider"},
        {key: "size"},
        {key: "price", label: "Total price (FIL)"},
        {key: "duration", label: "Duration (blocks)"},
    ];

    return (
        <div className="container flex-column stretch">
            <div className="upper">
                <label>Deals</label>
            </div>

            <Table data={deals.data} columns={columns} />
            <Pagination numberOfRecords={deals.count} pageRecordsLimit={pageRecordsLimit} onPageChange={onPageChange} />
        </div>
    );
};
