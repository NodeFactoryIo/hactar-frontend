import axios from "axios";
import {config} from "../../app/config";

export async function getNodes(auth: string | null) {
    const url = `${config.apiURL}/user/node`;

    try {
        const response = await axios.get(url, {
            headers: {
                authorization: auth,
            },
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
            headers: {
                authorization: auth,
            },
            params: {
                nodeId: nodeIdValue,
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
            headers: {
                authorization: auth,
            },
            params: {
                nodeId: nodeIdValue,
            },
        });
        return response;
    } catch (err) {
        return err;
    }
}
