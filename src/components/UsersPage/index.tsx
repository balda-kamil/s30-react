/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {userRoles} from "components/UsersPage/userRoles";
import {fetchAllUsersByRoles} from "src/api";
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

export interface UserDataInterface {
    objArr: {
        role: string;
        data: {
            users: {
                id: number;
                name: string;
                email: string;
            }[];
        };
    }[];
}

const UsersPage: React.FC = () => {
    const [usersData, setUsersData] = useState<UserDataInterface[]>([]);

    const fetchData = async (role) => {
        const response = await fetchAllUsersByRoles(role);
        console.log("response", response);
        setUsersData(response);
    };

    useEffect(() => {
        console.log("usersData", usersData);
    }, [usersData]);

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

                {usersData.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table aria-label="users table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody></TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
        </>
    );
};

export default UsersPage;
