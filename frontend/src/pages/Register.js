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
        <div className="flex flex-col mt-20 items-center">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <div className="w-[380px] p-4 border border-white border-opacity-30 rounded-md mt-inner_padding">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Username:</label>
                        <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                            type = "username" value={username} onChange ={(e) => setUsername(e.target.value)} required />
                        <br />
                        <label>Email:</label>
                        <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                            type ="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <br />
                        <label>Password:</label>
                        <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                            type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} required/>
                        <br/>
                    </div>
                    <button type="submit"
                            className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-black bg-custom-color2 hover:brightness-90 w-full mb-1 mt-2"
                    >Submit</button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </div>

        </div>
    )
}
export default Register;
