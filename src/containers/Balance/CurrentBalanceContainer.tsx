import React, {ReactElement, useEffect} from "react";
import BigNumber from "bignumber.js";
import {useDispatch, useSelector} from "react-redux";
import {getBalanceInfo} from "./BalanceSlice";
import {RootState} from "../../app/rootReducer";
import {Loading} from "../../components/Loading/Loading";

export const CurrentBalanceContainer: React.FC = (): ReactElement => {
    const dispatch = useDispatch();
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    const balance = useSelector((state: RootState) => state.node.balance);

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getBalanceInfo(selectedNodeId));
        }
    }, [selectedNodeId, dispatch]);

    const formatBalance = (balance: string): string => {
        return new BigNumber(balance).toFormat(2);
    };

    if (balance.isLoading) {
        return (
            <div className="container flex-column">
                <div className="upper">
                    <label>
                        <Loading />
                    </label>
                </div>
            </div>
        );
    }

    return (
        <div className="container flex-column">
            <div className="upper">
                <label>Current balance</label>
            </div>

            <div className="lower balance">
                <h2>{formatBalance(balance.data.currentBalance)} FIL</h2>
                <p className="yellow">
                    {formatBalance(balance.data.balanceChange)} FIL ({balance.data.balanceChangePerc})
                </p>
            </div>
        </div>
    );
};
