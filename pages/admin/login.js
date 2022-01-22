import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { Button, TextField } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/login", { username, password, }, {
                headers: { 'Content-Type': 'application/json' }
            });
            const result = response.data
            console.log(result)
            if (result) {
                router.push("/admin");
            } else {
                setError(true)
                setPassword(null)
                setUsername(null)
            }
        } catch (err) {
            console.error(error)
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                <TextField
                    label="username"
                    color="bg_color"
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "2rem" }}
                />
                <TextField
                    label="password"
                    color="bg_color"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "2rem" }}
                />
                <Button size="large" variant="contained" color="bg_color" onClick={handleClick} >Login </Button>
                {error && <span className={styles.error}>Wrong Credentials!</span>}
            </div>
        </div>
    );
};

export default Login;