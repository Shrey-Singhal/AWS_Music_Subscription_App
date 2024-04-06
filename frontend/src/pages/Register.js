import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
const Register = () => {
    const [username, setUsername] = useState("");
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
            operation: 'register', // identifier
            email: email,
            user_name: username,
            password: password
        })
            .then(response => {

                if (response.data.statusCode === 400) {
                    setErrorMessage('The email already exists.');
                }
                else {
                    navigate('/');
                }


            })
            .catch(error => {
                // Handle errors such as network issues or if the email doesn't exist
                setErrorMessage('The email already exists.');
                console.error('Registration error:', error);
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type = "username" value={username} onChange ={(e) => setUsername(e.target.value)} required />
                <br />
                <label>Email:</label>
                <input type ="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <br />
                <label>Password:</label>
                <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} required/>
                <br/>
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}
export default Register;
