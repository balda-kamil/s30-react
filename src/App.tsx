import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UsersPage from "components/UsersPage";
import Form from "components/Form";
import MenuBar from "components/MenuBar";

const App: React.FC = () => {
    return (
        <Router>
            <Container maxWidth="sm">
                <Typography variant="h5" component="h5" gutterBottom sx={{my: 4}} align="center">
                    React + Typescript + MUI
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
