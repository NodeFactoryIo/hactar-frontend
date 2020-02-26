import React from "react";
import {TableCellProps} from "react-virtualized";
import CopyToClipboard from "react-copy-to-clipboard";

export interface IClipboardProps {
    copyText: string;
    truncate?: boolean;
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

export const Clipboard = ({copyText, truncate = false}: IClipboardProps): JSX.Element => {
    const text = truncate ? `${copyText.substr(0, 6)}...` : copyText;
    return (
        <CopyToClipboard text={copyText}>
            <div className="clipboard_container">
                <p>{text}</p>
                <button className="copy_icon"></button>
            </div>
        </CopyToClipboard>
    );
};
