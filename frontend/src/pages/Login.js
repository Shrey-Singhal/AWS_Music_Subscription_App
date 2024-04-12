import React, {useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        // API endpoint where the Lambda function is triggered via API Gateway
        const apiEndpoint = 'https://ci7qilynd0.execute-api.us-east-1.amazonaws.com/Production/login_table_lambda_function';

        // Sending a POST request to the Lambda function
        axios.post(apiEndpoint, {
            operation: 'get', // identifier
            email: email
        })
            .then(response => {

                console.log('Response data:', response.data);

                const responseBody = JSON.parse(response.data.body);

                if (responseBody.password === password) {
                    // Handle successful login
                    login({ email, name: responseBody.user_name }); // Call login function with user data
                    navigate('/mainpage');
                } else {
                    // Incorrect password
                    setErrorMessage('Incorrect email or password.');
                }
            })
            .catch(error => {
                // Handle errors such as network issues or if the email doesn't exist
                setErrorMessage('An error occurred during login.');
                console.error('Login error:', error);
            });
    };

    const navigateToRegister = () => {
        navigate('/register')
    }
    return (
        <div className="flex flex-col mt-20 items-center">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <div className="w-[380px] p-4 border border-white border-opacity-30 rounded-md mt-inner_padding">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Email:</label>
                        <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <br />
                        <label>Password:</label>
                        <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <br />
                    </div>

                    <button type="submit"
                            className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-black bg-custom-color2 hover:brightness-90 w-full mb-1 mt-2">Login</button>
                </form>
                <div className="flex justify-between text-white mt-1 text-sm">
                    Don't have an account?
                    <button
                        type ="register"
                        onClick={navigateToRegister}
                        className="font-bold bg-transparent border-none text-white cursor-pointer">
                        Register
                    </button>
                </div>

            </div>



            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}


        </div>


    )
}

export default Login;