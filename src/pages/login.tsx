import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const base = import.meta.env.VITE_PATH;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [empcode, setEmpcode] = useState<string>('');
    async function handleLogin() {
        dispatch({ type: 'LOGIN' });
        navigate(`${base}/home`);
    }

    return (
        <div>
            <TextField size='small' value={empcode} onChange={(e) => setEmpcode(e.target.value)}></TextField>
            <Button onClick={handleLogin}>login</Button>
        </div>
    )
}

export default Login