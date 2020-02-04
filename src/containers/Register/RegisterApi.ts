import axios from "axios";
import {config} from "../../app/config";

export interface User {
    email: string;
    password: string;
}

export async function registerUser(email: string, password: string): Promise<void> {
    const url = `${config.apiURL}/user/register`;

    try {
        const response = await axios.get<User[]>(url);
        console.log(response);
    } catch (err) {
        throw err;
    }
}
