import axios, {AxiosResponse} from "axios";
import {config} from "../../app/config";

export async function getNodes(userIdToken: string | null) {
    const url = `${config.apiURL}/user/node`; 

    try {
        const response = await axios.get(url, {
            headers: {
                authorization: userIdToken
            }
        });
        return response;
    } catch (err) {
        return err;
    }
}