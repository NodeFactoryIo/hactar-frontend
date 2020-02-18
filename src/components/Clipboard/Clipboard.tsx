import React from "react";
import {TableCellProps} from "react-virtualized";
import CopyToClipboard from "react-copy-to-clipboard";

export interface IClipboardProps {
    copyText: string;
}

export const ClipboardTable = ({cellData}: TableCellProps): JSX.Element => {
    return (
        <>
            <CopyToClipboard text={cellData}>
                <span>{cellData}</span>
            </CopyToClipboard>
            <CopyToClipboard text={cellData}>
                <button className="copy_icon"></button>
            </CopyToClipboard>
        </>
    );
};

export const Clipboard = ({copyText}: IClipboardProps): JSX.Element => {
    return (
        <CopyToClipboard text={copyText}>
            <div className="clipboard_container">
                <p>{copyText}</p>
                <button className="copy_icon"></button>
            </div>
        </CopyToClipboard>
    );
};
