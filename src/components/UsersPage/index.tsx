import React, {useEffect, useState} from "react";
import {userRoles} from "components/UsersPage/userRoles";
import {fetchAllUsersByRoles} from "src/api";
import {Button} from "@mui/material";

export interface UserDataInterface {
    role: string;
    data: {
        users: {
            id: number;
            name: string;
            email: string;
        }[];
    };
}

const UsersPage: React.FC = () => {
    const [usersData, setUsersData] = useState<UserDataInterface[]>([]);

    const fetchData = async () => {
        const response = await fetchAllUsersByRoles(userRoles);
        setUsersData(response);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {usersData &&
                usersData.map((item, i) => {
                    return <Button key={i}>{item.role}</Button>;
                })}
        </>
    );
};

export default UsersPage;
