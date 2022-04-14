import axios from "axios";
import {Inputs} from "components/Form";
import {UserDataInterface} from "components/UsersPage";

export const createUser = (formData: Inputs) => {
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.POST_USERS, JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchAllUsersByRoles = (role: string): Promise<UserDataInterface[]> => {
    if (role === "") return;
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.GET_USERS_BY_ROLE}/${role}`)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
    });
};
