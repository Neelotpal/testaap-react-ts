import React, {useState} from "react";
import SignIn from "./Signin";
import axios from "axios";

const Login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");

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
              userLogin: true,
              token: response.data.access_token,
            })
          );

        //   history.push("/");
        })
        .catch((error) => setError(error.response.data.message));

    };

    return (
        <>
        <h1>MY Login Page</h1>
        <SignIn loginClicked={loginClicked}/>
        </>
    )

}

export interface LoginData  {
    userName: string | null,
    passWd: string | null
}

export default Login;