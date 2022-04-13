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
