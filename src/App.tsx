import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UsersPage from "components/UsersPage";
import Form from "components/Form";
import MenuBar from "components/MenuBar";

const App: React.FC = () => {
    // const myUserData = {
    //     roles: ["administrator", "editor"],
    //     email: "baldakamil@doe.com",
    //     name: "Johdasdsan2 sadd"
    // };

    // useEffect(() => {
    //     console.log("JSON.stringify(myUserData)", JSON.stringify(myUserData));
    //     console.log("myUserData", myUserData);
    //     axios.get("http://localhost/users/role/administrator").then((res) => console.log(res));
    //     axios
    //         .post("http://localhost/users", JSON.stringify(myUserData), {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //         });
    // });

    return (
        <Router>
            <Container maxWidth="sm">
                <Typography variant="h5" component="h5" gutterBottom sx={{my: 4}} align="center">
                    s30 || React + Typescript + MUI app
                </Typography>

                <MenuBar />

                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="users" element={<UsersPage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
