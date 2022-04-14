import React, {useEffect, useState} from "react";
import {userRoles} from "components/UsersPage/userRoles";
import {fetchAllUsers, fetchAllUsersByRole} from "src/api";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
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

    const [showAllUsers, setShowAllUsers] = useState(false);
    const [showRoleUsers, setShowRoleUsers] = useState(false);

    const [activeRole, setActiveRole] = useState("");

    const fetchData = async (role: string | string[]) => {
        if (typeof role === "string") {
            const response = await fetchAllUsersByRole(role);
            setRoleUsersData(response.sort((a, b) => b.id - a.id));
            setShowAllUsers(false);
            setShowRoleUsers(true);
        } else {
            //code over the job scope
            const response = await fetchAllUsers(role);
            const uniqeUsers = response
                .flat()
                .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
                .sort((a, b) => b.id - a.id);

            setAllUsers(uniqeUsers);
            setShowAllUsers(true);
        }
    };

    useEffect(() => {
        fetchData(userRoles);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setActiveRole(event.target.value);
        fetchData(event.target.value);
    };

    const TableContent = () => {
        const data = showRoleUsers ? roleUsersData : allUsers;
        const tableLabel = showAllUsers
            ? "List of all users"
            : `List of users with role: ${activeRole}`;

        if (data.length === 0) {
            return (
                <Typography variant="body1" sx={{fontWeight: "bold"}}>
                    No users to show, please add them on Home page
                </Typography>
            );
        } else {
            return (
                <TableContainer component={Paper}>
                    <Table aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography variant="body1" sx={{fontWeight: "bold"}}>
                                        {tableLabel}
                                    </Typography>
                                    <Typography variant="body2" sx={{fontWeight: "light"}}>
                                        {`from the earliest ones`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user, i) => {
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
            );
        }
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
                {(showAllUsers === true || showRoleUsers === true) && <TableContent />}
            </Grid>
        </>
    );
};

export default UsersPage;
