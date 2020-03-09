import axios from "axios";
import {config} from "./config";

const getHeaders = (auth: string | null): object => {
    return {authorization: auth};
};

async function makeGetRequest(token: string | null, url: string, params = {}) {
    try {
        return await axios.get(url, {
            headers: getHeaders(token),
            params,
        });
    } catch (e) {
        console.error("Error while fetching resource... ", e.message);
        // TODO: better error handling
        if (e.response && e.response.status === 400) {
            throw new Error(e.response.data.errors[0].message);
        } else {
            throw e;
        }
    }
}

export async function getNodes(auth: string | null) {
    const url = `${config.apiURL}/user/node`;
    return makeGetRequest(auth, url);
}

export async function getDiskDetails(auth: string | null, nodeId: number, filter: string) {
    const url = `${config.apiURL}/user/node/diskinformation/${nodeId}`;
    return makeGetRequest(auth, url, {filter});
}

export async function getMinerInfo(auth: string | null, nodeId: number) {
    const url = `${config.apiURL}/user/node/generalminerinfo/${nodeId}`;
    return makeGetRequest(auth, url);
}

export async function getBalance(auth: string | null, nodeId: number) {
    const url = `${config.apiURL}/user/node/balance/${nodeId}`;
    return makeGetRequest(auth, url);
}

export async function getLatestNodeVersion() {
    try {
        return await axios.get("https://api.github.com/repos/filecoin-project/lotus/releases");
    } catch (err) {
        return err;
    }
}

export async function fetchMiningRewards(auth: string | null, nodeId: number, interval = "week") {
    const url = `${config.apiURL}/user/node/miningrewards/${nodeId}`;
    return makeGetRequest(auth, url, {filter: interval.toLowerCase()});
}

export async function fetchPastDealsCount(auth: string | null, nodeId: number) {
    const url = `${config.apiURL}/user/node/pastdeals/${nodeId}/count`;
    return makeGetRequest(auth, url);
}

export async function fetchPastDeals(auth: string | null, nodeId: number, from = 0, to = 20) {
    const url = `${config.apiURL}/user/node/pastdeals/${nodeId}`;
    return makeGetRequest(auth, url, {
        from,
        to,
        orderBy: "ASC",
    });
}

export async function fetchUptime(auth: string | null, nodeId: number, interval = "week") {
    const url = `${config.apiURL}/user/node/uptime/${nodeId}`;
    return makeGetRequest(auth, url, {filter: interval.toLowerCase()});
}

export async function makePutRequest(token: string | null, nodeId: number, params = {}) {
    const url = `${config.apiURL}/user/node/${nodeId}`;

    try {
        return await axios.put(url, params, {headers: getHeaders(token)});
    } catch (e) {
        console.error("Error while fetching resource... ", e.message);
        return e;
    }
}
