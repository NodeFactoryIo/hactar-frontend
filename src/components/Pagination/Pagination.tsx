import React, {useState} from "react";
import PaginationLib from "react-js-pagination";

interface IPaginationProps {
    numberOfRecords: number;
    pageRecordsLimit: number;
    onPageChange: (page: number) => void;
}

export const Pagination = (props: IPaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const {numberOfRecords, pageRecordsLimit} = props;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        props.onPageChange(page);
    };

    return (
        <PaginationLib
            activePage={currentPage}
            itemsCountPerPage={pageRecordsLimit}
            totalItemsCount={numberOfRecords}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText={<i className="material-icons">chevron_left</i>}
            nextPageText={<i className="material-icons">chevron_right</i>}
            firstPageText={<i className="material-icons">first_page</i>}
            lastPageText={<i className="material-icons">last_page</i>}
        />
    );
};
