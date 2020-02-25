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

export async function getDiskDetails(auth: string | null, nodeIdValue: number) {
    const url = `${config.apiURL}/user/node/diskinformation/${nodeIdValue}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
            params: {
                filter: "year",
            },
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getMinerInfo(auth: string | null, nodeIdValue: number) {
    const url = `${config.apiURL}/user/node/generalminerinfo/${nodeIdValue}`;

    try {
        const response = await axios.get(url, {
            headers: getHeaders(auth),
            params: {
                filter: "year",
            },
        });
        return response;
    } catch (err) {
        return err;
    }
}

export async function getBalance(auth: string | null, nodeIdValue: number) {
    const url = `${config.apiURL}/user/node/balance/${nodeIdValue}`;

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
