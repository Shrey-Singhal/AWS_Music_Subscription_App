import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
                    console.log('Login successful', response.data);
                    navigate('/mainpage')
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
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default Login;