import axios from "axios";
import {Inputs} from "components/Form";

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
                reject(error);
            });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchAllUsersByRoles = (roles: string[]): Promise<any[]> => {
    return new Promise((res, rej) => {
        Promise.all(
            roles.map(
                (role) =>
                    new Promise((resolve, reject) => {
                        axios
                            .get(`${process.env.GET_USERS_BY_ROLE}/${role}`)
                            .then(function (response) {
                                const {data} = response;
                                resolve({role, data});
                            })
                            .catch(function (error) {
                                console.log(error);
                                reject(error);
                            });
                    })
            )
        )
            .then(function (resp) {
                res(resp);
            })
            .catch(function (error) {
                console.error("ERROR", error);
                rej(error);
            });
    });
};
