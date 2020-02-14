import axios from "axios";
import {config} from "../../app/config";

export async function getNodes(auth: string | null) {
    const url = `${config.apiURL}/user/node`; 

    try {
        const response = await axios.get(url, {
            headers: {
                authorization: auth
            }
        });
        return response;
    } catch (err) {
        return err;
    }
}