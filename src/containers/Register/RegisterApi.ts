import axios, {AxiosResponse} from "axios";
import {config} from "../../app/config";

export interface IUser {
    email: string;
    password: string;
}

export async function registerUser(email: string, password: string): Promise<AxiosResponse<IUser[]>> {
    const url = `${config.apiURL}/user/register`;

    try {
        const response = await axios.post<IUser[]>(url, {
            email,
            password,
        });
        return response;
    } catch (err) {
        return err;
        // throw err;
    }
}
