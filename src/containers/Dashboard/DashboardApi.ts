import axios from "axios";
import {config} from "../../app/config";

const getHeaders = (auth: string | null): object => {
    return {authorization: auth};
};

export async function getNodes(auth: string | null) {
    const url = `${config.apiURL}/user/node`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getDiskDetails(auth: string | null, nodeId: number, interval: string) {
    const url = `${config.apiURL}/user/node/diskinformation/${nodeId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
            params: {
                filter: interval,
            },
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getMinerInfo(auth: string | null, nodeId: number) {
    const url = `${config.apiURL}/user/node/generalminerinfo/${nodeId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getBalance(auth: string | null, nodeId: number) {
    const url = `${config.apiURL}/user/node/balance/${nodeId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getLatestNodeVersion() {
    try {
        const response = await axios.get("https://api.github.com/repos/filecoin-project/lotus/releases");
        return response;
    } catch (err) {
        return err;
    }
}

export async function fetchMiningRewards(auth: string | null, nodeId: number, interval = "week") {
    const url = `${config.apiURL}/user/node/miningrewards/${nodeId}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
            params: {
                filter: interval.toLowerCase(),
            },
        });
        return response;
    } catch (err) {
        return err;
    }
}
