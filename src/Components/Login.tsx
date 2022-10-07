import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./Signin";
import axios from "axios";

const Login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(true);
    const navigate = useNavigate();

    const loginClicked = (loginData: LoginData) => {
        console.log("user", loginData.userName, "apss", loginData.passWd);

        axios
            .post("http://localhost:5000/api/auth/login", {
                email: loginData.userName,
                password: loginData.passWd
            })
            .then((response) => {
                console.log("response", response);
                localStorage.setItem(
                    "login",
                    JSON.stringify({
                        userLogin: loginData.userName,
                        token: response.data.access_token,
                    })
                );
                if (loginData.rememberMe) {
                    /*fix security*/
                    localStorage.setItem(
                        "credentials",
                        JSON.stringify({
                            userName: loginData.userName,
                            password: loginData.passWd
                        })
                    );
                }
                setInvalidLogin(false);
                navigate("/dashboard");
            })
            .catch((error) => {
                setError(error.response.data.message);
                setInvalidLogin(true);
            });

    };

    return (
        <>
            <p>Dev note - use login credentials form file users.json</p>
            <SignIn loginClicked={loginClicked} invalidLogin={invalidLogin} />
        </>
    )

}

export interface LoginData {
    userName: string | null,
    passWd: string | null,
    rememberMe: boolean
}

export default Login;