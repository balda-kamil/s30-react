import React, {useEffect, useState} from "react";
import {userRoles} from "components/UsersPage/userRoles";
import {fetchAllUsers, fetchAllUsersByRole} from "src/api";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
export interface UsersDataInterface {
    id: number;
    name: string;
    email: string;
}

const UsersPage: React.FC = () => {
    const [roleUsersData, setRoleUsersData] = useState<UsersDataInterface[]>([]);
    const [allUsers, setAllUsers] = useState<UsersDataInterface[]>([]);

    const fetchData = async (role: string | string[]) => {
        if (typeof role === "string") {
            const response = await fetchAllUsersByRole(role);
            setRoleUsersData(response);
        } else {
            const response = await fetchAllUsers(role);
            const uniqeUsers = response
                .flat()
                .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                .sort((a, b) => b.id - a.id);

            setAllUsers(uniqeUsers);
        }
    };

    useEffect(() => {
        fetchData(userRoles);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        fetchData(event.target.value);
    };

    return (
        <>
            <Grid container sx={{mb: 4}}>
                <FormControl fullWidth sx={{mb: 3}}>
                    <InputLabel id="users-sole-select">Roles</InputLabel>

                    <Select
                        id="users-sole-select"
                        label="Roles"
                        onChange={handleChange}
                        defaultValue=""
                    >
                        {userRoles.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                {allUsers.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table aria-label="users table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsers.map((user, i) => {
                                    return (
                                        <TableRow key={`${user}_${i}`}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.name}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {roleUsersData.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table aria-label="users table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roleUsersData.map((user, i) => {
                                    return (
                                        <TableRow key={`${user}_${i}`}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.name}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
        </>
    );
};

export default UsersPage;
