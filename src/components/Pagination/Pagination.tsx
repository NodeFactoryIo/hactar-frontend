import React, {useState} from "react";
import PaginationLib from "react-js-pagination";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

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
            prevPageText={<ChevronLeft />}
            nextPageText={<ChevronRight />}
            firstPageText={<FirstPage />}
            lastPageText={<LastPage />}
        />
    );
};
