import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginNavigate = ({route}) => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate(route);

    }, []);
}

export default LoginNavigate
