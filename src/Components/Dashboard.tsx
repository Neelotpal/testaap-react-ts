import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 190
        }, {
            field: 'email',
            headerName: 'Email',
            width: 200
        }, {
            field: 'access_token',
            headerName: 'Token',
            width: 400
        }

    ];

    useEffect(() => {
        const login = localStorage.getItem("login");
        const fromLocalStorage = JSON.parse(login || '{}');
        const token = fromLocalStorage.token;
        const email = fromLocalStorage.userLogin;

        console.log("dashboard loaded")
        fetchUsers(email, token);
    }, []);

    const fetchUsers = (email: string, token: string) => {
        axios
            .post("http://localhost:5000/api/auth/users", {
                email: email,
                token: token
            })
            .then((response) => {
                console.log("response", response);
                setUsers(response.data.users);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div style={{ height: 300, width: '100%' }}>
            <h1>Users Dashboard</h1>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>

    )


}


export default Dashboard;