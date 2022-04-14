import axios from "axios";
import {Inputs} from "components/Form";
import {UsersDataInterface} from "components/UsersPage";

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

export const fetchAllUsersByRole = (role: string): Promise<UsersDataInterface[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${process.env.GET_USERS_BY_ROLE}/${role}`)
            .then(function (response) {
                const {users} = response.data;
                resolve(users);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
    });
};

//code over the job scope
export const fetchAllUsers = (roles: string[]): Promise<UsersDataInterface[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any[]>((res, rej) => {
        Promise.all(
            roles.map(
                (role) =>
                    new Promise((resolve, reject) => {
                        axios
                            .get(`${process.env.GET_USERS_BY_ROLE}/${role}`)
                            .then(function (response) {
                                resolve(response.data.users);
                            })
                            .catch(function (error) {
                                console.log(error);
                                reject(error);
                            });
                    })
            )
        )
            .then(function (resp) {
                console.log(resp);
                res(resp);
            })
            .catch(function (error) {
                console.error("ERROR", error);
                rej(error);
            });
    });
};
