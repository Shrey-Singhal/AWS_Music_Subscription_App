import {Form} from "react-router-dom";
import {useState} from "react";
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    return (
        <div>
            <h1>Register</h1>
            <form>
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
