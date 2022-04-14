import React, {useState, useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import {createUser} from "src/api";
import {useNavigate} from "react-router-dom";
import {userRoles} from "components/UsersPage/userRoles";

export type Inputs = {
    email: string;
    roles: string[];
    name: string;
};
//     axios.get("http://localhost/users/role/administrator").then((res) => console.log(res));

const schema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().trim().required()
});

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({resolver: yupResolver(schema)});

    const [checkedRoles, setCheckedRoles] = useState([]);
    const [rolesError, setRolesError] = useState(false);
    const [formSubmitError, setFormSubmitError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userCreationSuccessInfo, setUserCreationSuccessInfo] = useState(false);

    useEffect(() => {
        checkedRoles.length >= 1 && setRolesError(false);
    }, [checkedRoles]);

    const navigate = useNavigate();

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.checked) {
            setCheckedRoles([...checkedRoles, e.target.value]);
        } else {
            const acc = checkedRoles.filter((role) => {
                if (role === e.target.value) return false;
                return true;
            });
            setCheckedRoles([...acc]);
        }
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        if (checkedRoles.length === 0) {
            setRolesError(true);
            return;
        }

        const formData = {
            ...data,
            roles: checkedRoles
        };

        createUser(formData).then((response: {status: number}) => {
            if (response.status === 200) {
                setFormSubmitError(false);
                setLoading(false);
                setUserCreationSuccessInfo(true);
                setTimeout(() => {
                    navigate(`/users`);
                }, 3000);
            } else {
                setFormSubmitError(true);
                setLoading(false);
            }
        });
    };

    let helperTextEmail: string;

    switch (errors.email?.type) {
        case "required":
            helperTextEmail = "Email address is required";
            break;
        case "email":
            helperTextEmail = "Email address must be valid";
            break;
        default:
            helperTextEmail = "";
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
                {...register("email")}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Adress"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email && helperTextEmail}
            />
            <TextField
                {...register("name")}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full name"
                name="name"
                autoComplete="name"
                error={Boolean(errors.name)}
                helperText={errors.name && "Full name field is required"}
            />

            <Typography paragraph={true} margin="normal" sx={{mt: 1, mb: 0}}>
                Pick user roles:
            </Typography>

            <FormGroup>
                {userRoles.map((role, i) => {
                    return (
                        <FormControlLabel
                            control={<Checkbox value={role} onChange={handleChecked} />}
                            label={role}
                            key={`${role}_${i}`}
                        />
                    );
                })}
                {rolesError && (
                    <FormHelperText style={{color: "red"}}>
                        You need to pick at least one user role
                    </FormHelperText>
                )}
            </FormGroup>

            <Button
                disabled={loading}
                type="submit"
                variant="outlined"
                sx={{width: "100%", py: 1, my: 2}}
            >
                <Typography component="span" align="center" sx={{fontWeight: "bold"}}>
                    {loading ? "Submitting..." : "Submit"}
                </Typography>
            </Button>
            {formSubmitError && (
                <Typography
                    paragraph={true}
                    margin="normal"
                    sx={{mt: 1, mb: 0}}
                    style={{color: "red"}}
                >
                    Error ocured, please try again later
                </Typography>
            )}
            {userCreationSuccessInfo && (
                <Typography
                    paragraph={true}
                    margin="normal"
                    sx={{mt: 1, mb: 0}}
                    style={{color: "green"}}
                >
                    User successfully created, redirection in 3 seconds...
                </Typography>
            )}
        </form>
    );
};

export default Form;
