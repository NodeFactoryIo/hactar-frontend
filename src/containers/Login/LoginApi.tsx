import axios, {AxiosResponse} from "axios";
import {config} from "../../app/config";
import {IUser} from "../Register/RegisterApi";

export async function logInUser(email: string, password: string): Promise<AxiosResponse<IUser[]>> {
    const url = `${config.apiURL}/user/login`;

    try {
        const response = await axios.post<IUser[]>(url, {
            email,
            password,
        });
        return response;
    } catch (err) {
        return err;
    }
}
